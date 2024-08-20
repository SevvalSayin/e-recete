import React from 'react';
import { Button } from '@material-tailwind/react';
import * as XLSX from 'xlsx';
import { insertManyDocuments, sendRawDataToApiService } from '@/services/apiService';

const atcFieldMapping = {
  __EMPTY: 'Drug Name',
  __EMPTY_1: 'Barcode',
  __EMPTY_2: 'ATC Code',
  __EMPTY_3: 'ATC Name',
  __EMPTY_4: 'Company Name',
  __EMPTY_5: 'Prescription Type',
  __EMPTY_6: 'Status'
};

const icdFieldMapping = {
  'Adı': 'Name',
  'Kodu': 'Code',
  'Üst Kodu': 'Upper Code',
  'Seviye': 'Level',
  'Yüksek Riskli Gebelik': 'High Risk'
};





// Updated mapFields function
function mapFields(data, fieldMapping) {
  return data.map(row => {
    const newRow = {};
    let isEmpty = true; // Track if row is empty

    Object.keys(row).forEach(key => {
      const mappedKey = fieldMapping[key];
      if (mappedKey && row[key] !== undefined && row[key] !== null && row[key] !== '') {
        newRow[mappedKey] = row[key];
        isEmpty = false; // Set to false if any valid data is found
      }
    });

    // Only return rows that have mapped data
    return isEmpty ? null : newRow;
  }).filter(row => row !== null); // Remove empty rows
}
async function fetchAndProcessFile(fileUrl, isAtc = false) {
  try {
    console.log('Fetching file from URL:', fileUrl);
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Log the first few rows of raw data and their keys
    if (data.length > 0) {
      console.log('Raw Excel Data (First 5 Rows):', data.slice(0, 5)); // Log first 5 rows of raw data
      console.log('Keys in the First Row:', Object.keys(data[0]));     // Log the keys in the first row
    } else {
      console.error('Excel data is empty.');
      return;
    }

    // Map the data using appropriate field mapping (ATC or ICD)
    const mappedData = isAtc ? mapFields(data, atcFieldMapping) : mapFields(data, icdFieldMapping);

    if (Array.isArray(mappedData) && mappedData.length > 0) {
      console.log('Mapped Data:', mappedData);
      if (isAtc) {
        await insertManyDocuments(mappedData);
      } else {
        await sendRawDataToApiService(mappedData);
      }
    } else {
      console.error('Mapped data is empty or invalid:', mappedData);
    }

  } catch (error) {
    console.error('Error fetching or processing file:', error.message);
  }
}


function Assay() {
  const handleATCClick = () => {
    fetchAndProcessFile('/data/atc.xlsx', true);
  };

  const handleICDClick = () => {
    fetchAndProcessFile('/data/ıcd.xlsx'); // Ensure the file name is correct
  };

  return (
    <div>
      <Button color='red' onClick={handleATCClick}>ATC Excel</Button>
      <hr />
      <Button color='red' onClick={handleICDClick}>ICD Excel</Button>
    </div>
  );
}

export default Assay;

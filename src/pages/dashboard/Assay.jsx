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
  __EMPTY: 'Name',
  __EMPTY_1: 'Code',
  __EMPTY_2: 'Upper Code',
  __EMPTY_3: 'Level',
  __EMPTY_4: 'High Risk',
  __EMPTY_5: 'Pregnancy Status'
};

function mapFields(data, fieldMapping) {
  return data.map(row => {
    const newRow = {};
    Object.keys(row).forEach(key => {
      const mappedKey = fieldMapping[key];
      if (mappedKey) {
        newRow[mappedKey] = row[key];
      }
    });
    return newRow;
  });
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

    console.log('Raw Excel Data:', data);

    const mappedData = isAtc ? mapFields(data, atcFieldMapping) : mapFields(data, icdFieldMapping);

    if (Array.isArray(mappedData) && mappedData.length > 0) {
      console.log('Mapped Data:', mappedData); // Mapped verileri kontrol edin
      if (isAtc) {
        await insertManyDocuments(mappedData);
      } else {
        await sendRawDataToApiService(mappedData);
      }
    } else {
      console.error('Mapped data is not an array or is empty:', mappedData);
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

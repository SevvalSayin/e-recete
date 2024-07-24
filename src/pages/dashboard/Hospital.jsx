import React, { useState, useEffect } from 'react';
import { useHospitalData } from '@/context/HospitalContext';
import MapComponent from '@/components/MapComponent';
import FilterComponent from '@/components/FilterComponent';

function Hospital() {
  const { hospitalData, setHospitalData } = useHospitalData();
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    setFilteredHospitals(hospitalData);
  }, [hospitalData]);

  const provinces = [...new Set(hospitalData.map(hospital => hospital.province))];
  const districts = [...new Set(hospitalData.map(hospital => hospital.district))];

  const handleFilter = (province, district) => {
    let filtered = hospitalData;
    if (province) {
      filtered = filtered.filter(hospital => hospital.province === province);
    }
    if (district) {
      filtered = filtered.filter(hospital => hospital.district === district);
    }
    setFilteredHospitals(filtered.sort((a, b) => new Date(b.lastVisitDate) - new Date(a.lastVisitDate)));
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex flex-row space-x-4">
        <div className="flex-none w-72">
          <FilterComponent
            provinces={provinces}
            districts={districts}
            onFilter={handleFilter}
          />
        </div>

        <div className="flex-grow relative">
          <div className="w-full h-96 border border-gray-700 rounded-md bg-white shadow-md">
            <MapComponent hospitals={filteredHospitals} />
          </div>
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold">Additional Information</h2>
            <p className="mt-2 text-sm">
              Here you can add additional information about the hospitals or any other relevant details.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 gap-4 mt-4">
        {filteredHospitals.map((record, index) => (
          <div key={index} className="w-full h-60 border border-gray-700 rounded-md p-4 flex flex-col bg-white shadow-md">
            <h1 className="text-base font-semibold">Hospital Name</h1>
            <p className="mt-1 text-sm">{record.hospitalName}</p>
            <h1 className="text-base font-semibold">Clinic Name</h1>
            <p className="mt-1 text-sm">{record.clinicName}</p>
            <h1 className="text-base font-semibold">Physician Name</h1>
            <p className="mt-1 text-sm">{record.physicianName}</p>
            <h1 className="text-base font-semibold">Last Visit Date</h1>
            <p className="mt-1 text-sm">{record.lastVisitDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hospital;

import React, { useState, useEffect } from 'react';
import { useMap } from '@/context/MapContext';
import MapComponent from '@/components/MapComponent';
import FilterComponent from '@/components/FilterComponent';

function Hospital() {
  const hospitalData = useMap();
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

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
    setIsFiltered(province || district);
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-none w-full md:w-72">
          <FilterComponent
            provinces={provinces}
            districts={districts}
            onFilter={handleFilter}
          />
        </div>

        <div className="flex-grow">
          <div className="map-container border border-red-500 rounded-md bg-white shadow-md">
            <MapComponent hospitals={filteredHospitals} />
          </div>
        </div>
      </div>

      {isFiltered && filteredHospitals.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 border border-red-500 rounded-md">
          <h2 className="text-lg font-semibold">Size En Yakın Hastane</h2>
          <p className="mt-1 text-sm">{filteredHospitals[0].hospitalName}</p>
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-100 border border-red-500 rounded-md">
        <h2 className="text-lg font-semibold">Geçmiş Randevularım:</h2>
        {hospitalData.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 border border-red-500 rounded-md">
            <h1 className="text-base font-semibold mb-6">{hospitalData[0].hospitalName}</h1>
            <p className="mt-1 text-sm text-gray-600">Klinik Adı</p>
            <p className="mt-1 text-sm text-gray-600">{hospitalData[0].clinicName}</p>
            <p className="text-base font-semibold text-gray-600">Hekim Adı</p>
            <p className="mt-1 text-sm text-gray-600">{hospitalData[0].physicianName}</p>
            <p className="text-base font-semibold text-gray-600">Son Ziyaret Tarihi</p>
            <p className="mt-1 text-sm text-gray-600">{hospitalData[0].lastVisitDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hospital;

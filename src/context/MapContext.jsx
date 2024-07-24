import React, { createContext, useContext } from 'react';


const MapContext = createContext();


export const MapProvider = ({ children }) => {
    const hospitalData = [
        {
          hospitalName: 'Acıbadem Maslak Hospital',
          clinicName: 'Cardiology Clinic',
          physicianName: 'Dr. Ahmet Yılmaz',
          lastVisitDate: '2024-07-01',
          province: 'Istanbul',
          district: 'Sarıyer',
          lat: 41.1112,
          lon: 29.0247
        },
        {
          hospitalName: 'American Hospital',
          clinicName: 'Neurology Clinic',
          physicianName: 'Dr. Canan Karatay',
          lastVisitDate: '2024-07-02',
          province: 'Istanbul',
          district: 'Şişli',
          lat: 41.0502,
          lon: 28.9871
        },
        {
          hospitalName: 'Medipol Mega University Hospital',
          clinicName: 'Oncology Clinic',
          physicianName: 'Dr. Mehmet Öz',
          lastVisitDate: '2024-07-03',
          province: 'Istanbul',
          district: 'Bağcılar',
          lat: 41.0778,
          lon: 28.8260
        },
        {
          hospitalName: 'Memorial Şişli Hospital',
          clinicName: 'Orthopedics Clinic',
          physicianName: 'Dr. Ayşe Yıldız',
          lastVisitDate: '2024-07-04',
          province: 'Istanbul',
          district: 'Şişli',
          lat: 41.0660,
          lon: 28.9871
        },
        {
          hospitalName: 'Florence Nightingale Hospital',
          clinicName: 'Pediatrics Clinic',
          physicianName: 'Dr. Ali Vural',
          lastVisitDate: '2024-07-05',
          province: 'Istanbul',
          district: 'Beşiktaş',
          lat: 41.0417,
          lon: 29.0092
        },
        {
          hospitalName: 'Koç University Hospital',
          clinicName: 'Gastroenterology Clinic',
          physicianName: 'Dr. Elif Aksoy',
          lastVisitDate: '2024-07-06',
          province: 'Istanbul',
          district: 'Beyoğlu',
          lat: 41.0297,
          lon: 28.9501
        }
      ];
      

  return (
    <MapContext.Provider value={hospitalData}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  return useContext(MapContext);
};

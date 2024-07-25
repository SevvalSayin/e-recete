import React, { createContext, useContext, useState, useEffect } from 'react';

const HospitalContext = createContext();

export const useHospitalData = () => useContext(HospitalContext);

export const HospitalDataProvider = ({ children }) => {
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    const fetchHospitalData = async () => {
      const data = [
        {
          hospitalName: 'Acıbadem Maslak Hospital',
          clinicName: 'Cardiology Clinic',
          physicianName: 'Dr. Ahmet Yılmaz',
          lastVisitDate: '2024-07-01',
          province: 'Istanbul',
          district: 'Maslak',
          latitude: 41.1081,
          longitude: 29.0220,
        },
        {
          hospitalName: 'Another Hospital',
          clinicName: 'Another Clinic',
          physicianName: 'Dr. Jane Doe',
          lastVisitDate: '2024-06-15',
          province: 'Istanbul',
          district: 'Besiktas',
          latitude: 41.0420,
          longitude: 29.0093,
        },
      ];
      setHospitalData(data.sort((a, b) => new Date(b.lastVisitDate) - new Date(a.lastVisitDate)));
    };

    fetchHospitalData();
  }, []);

  return (
    <HospitalContext.Provider value={{ hospitalData, setHospitalData }}>
      {children}
    </HospitalContext.Provider>
  );
};

import React, { createContext, useContext } from 'react';


const MapContext = createContext();


export const MapProvider = ({ children }) => {
    const hospitalData = [
      {
        hospitalName: 'Bahçelievler Hospital',
        clinicName: 'Gastroenterology Clinic',
        physicianName: 'Dr. Kayhan Aksoy',
        lastVisitDate: '2024-07-06',
        province: 'Istanbul',
        district: 'Bahçelievler',
        lat: 40.993590,
        lon: 28.838490
      },
      {
        hospitalName: 'Adalar Hospital',
        clinicName: 'General Clinic',
        physicianName: 'Dr. Mehmet Can',
        lastVisitDate: '2024-07-07',
        province: 'Istanbul',
        district: 'Adalar',
        lat: 40.873156,
        lon: 29.122199
      },
      {
        hospitalName: 'Arnavutköy Hospital',
        clinicName: 'Pediatrics Clinic',
        physicianName: 'Dr. Ayşe Demir',
        lastVisitDate: '2024-07-08',
        province: 'Istanbul',
        district: 'Arnavutköy',
        lat: 41.186431,
        lon: 28.740144
      },
      {
        hospitalName: 'Ataşehir Hospital',
        clinicName: 'Cardiology Clinic',
        physicianName: 'Dr. Hasan Yılmaz',
        lastVisitDate: '2024-07-09',
        province: 'Istanbul',
        district: 'Ataşehir',
        lat: 40.987671,
        lon: 29.127636
      },
      {
        hospitalName: 'Avcılar Hospital',
        clinicName: 'Neurology Clinic',
        physicianName: 'Dr. Elif Kaya',
        lastVisitDate: '2024-07-10',
        province: 'Istanbul',
        district: 'Avcılar',
        lat: 40.982985,
        lon: 28.725558
      },
      {
        hospitalName: 'Bağcılar Hospital',
        clinicName: 'Orthopedics Clinic',
        physicianName: 'Dr. Ahmet Polat',
        lastVisitDate: '2024-07-11',
        province: 'Istanbul',
        district: 'Bağcılar',
        lat: 41.039050,
        lon: 28.856680
      },
      {
        hospitalName: 'Bahçelievler Hospital',
        clinicName: 'Gastroenterology Clinic',
        physicianName: 'Dr. Kayhan Aksoy',
        lastVisitDate: '2024-07-12',
        province: 'Istanbul',
        district: 'Bahçelievler',
        lat: 40.993590,
        lon: 28.838490
      },
      {
        hospitalName: 'Bakırköy Hospital',
        clinicName: 'Dermatology Clinic',
        physicianName: 'Dr. Selin Topal',
        lastVisitDate: '2024-07-13',
        province: 'Istanbul',
        district: 'Bakırköy',
        lat: 40.971939,
        lon: 28.868303
      },
      {
        hospitalName: 'Başakşehir Hospital',
        clinicName: 'Psychiatry Clinic',
        physicianName: 'Dr. Can Yılmaz',
        lastVisitDate: '2024-07-14',
        province: 'Istanbul',
        district: 'Başakşehir',
        lat: 41.086096,
        lon: 28.804006
      },
      {
        hospitalName: 'Bayrampaşa Hospital',
        clinicName: 'Urology Clinic',
        physicianName: 'Dr. Fatih Erdem',
        lastVisitDate: '2024-07-15',
        province: 'Istanbul',
        district: 'Bayrampaşa',
        lat: 41.043030,
        lon: 28.903336
      },
      {
        hospitalName: 'Beşiktaş Hospital',
        clinicName: 'Oncology Clinic',
        physicianName: 'Dr. Gülşah Demir',
        lastVisitDate: '2024-07-16',
        province: 'Istanbul',
        district: 'Beşiktaş',
        lat: 41.071430,
        lon: 29.005020
      },
      {
        hospitalName: 'Beykoz Hospital',
        clinicName: 'ENT Clinic',
        physicianName: 'Dr. Ebru Şahin',
        lastVisitDate: '2024-07-17',
        province: 'Istanbul',
        district: 'Beykoz',
        lat: 41.125940,
        lon: 29.084900
      },
      {
        hospitalName: 'Beylikdüzü Hospital',
        clinicName: 'Ophthalmology Clinic',
        physicianName: 'Dr. Murat Kaya',
        lastVisitDate: '2024-07-18',
        province: 'Istanbul',
        district: 'Beylikdüzü',
        lat: 40.982907,
        lon: 28.639971
      },
      {
        hospitalName: 'Beyoğlu Hospital',
        clinicName: 'Neurology Clinic',
        physicianName: 'Dr. Hakan Karaca',
        lastVisitDate: '2024-07-19',
        province: 'Istanbul',
        district: 'Beyoğlu',
        lat: 41.038028,
        lon: 28.975097
      },
      {
        hospitalName: 'Büyükçekmece Hospital',
        clinicName: 'Cardiology Clinic',
        physicianName: 'Dr. Aylin Öztürk',
        lastVisitDate: '2024-07-20',
        province: 'Istanbul',
        district: 'Büyükçekmece',
        lat: 41.020053,
        lon: 28.585032
      },
      {
        hospitalName: 'Çatalca Hospital',
        clinicName: 'Dermatology Clinic',
        physicianName: 'Dr. Barış Tunç',
        lastVisitDate: '2024-07-21',
        province: 'Istanbul',
        district: 'Çatalca',
        lat: 41.145401,
        lon: 28.461344
      },
      {
        hospitalName: 'Çekmeköy Hospital',
        clinicName: 'Pediatrics Clinic',
        physicianName: 'Dr. Cemile Arslan',
        lastVisitDate: '2024-07-22',
        province: 'Istanbul',
        district: 'Çekmeköy',
        lat: 41.030927,
        lon: 29.189503
      },
      {
        hospitalName: 'Esenler Hospital',
        clinicName: 'Psychiatry Clinic',
        physicianName: 'Dr. Deniz Kılıç',
        lastVisitDate: '2024-07-23',
        province: 'Istanbul',
        district: 'Esenler',
        lat: 41.046189,
        lon: 28.857410
      },
      {
        hospitalName: 'Esenyurt Hospital',
        clinicName: 'Gastroenterology Clinic',
        physicianName: 'Dr. Emre Güneş',
        lastVisitDate: '2024-07-24',
        province: 'Istanbul',
        district: 'Esenyurt',
        lat: 41.033438,
        lon: 28.675844
      },
      {
        hospitalName: 'Eyüpsultan Hospital',
        clinicName: 'Orthopedics Clinic',
        physicianName: 'Dr. Figen Akın',
        lastVisitDate: '2024-07-25',
        province: 'Istanbul',
        district: 'Eyüpsultan',
        lat: 41.096485,
        lon: 28.947264
      },
      {
        hospitalName: 'Fatih Hospital',
        clinicName: 'Neurology Clinic',
        physicianName: 'Dr. Gökhan Yılmaz',
        lastVisitDate: '2024-07-26',
        province: 'Istanbul',
        district: 'Fatih',
        lat: 41.016770,
        lon: 28.949660
      },
      {
        hospitalName: 'Gaziosmanpaşa Hospital',
        clinicName: 'Cardiology Clinic',
        physicianName: 'Dr. Hande Demir',
        lastVisitDate: '2024-07-27',
        province: 'Istanbul',
        district: 'Gaziosmanpaşa',
        lat: 41.075670,
        lon: 28.912190
      },
      {
        hospitalName: 'Güngören Hospital',
        clinicName: 'Urology Clinic',
        physicianName: 'Dr. İrem Yalçın',
        lastVisitDate: '2024-07-28',
        province: 'Istanbul',
        district: 'Güngören',
        lat: 41.020586,
        lon: 28.867165
      },
      {
        hospitalName: 'Kadıköy Hospital',
        clinicName: 'Orthopedics Clinic',
        physicianName: 'Dr. Cenk Demir',
        lastVisitDate: '2024-07-29',
        province: 'Istanbul',
        district: 'Kadıköy',
        lat: 40.992890,
        lon: 29.026560
      },
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

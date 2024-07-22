

import React from 'react';
import { useParams } from 'react-router-dom';
import visits from '@/data/ziyaret-data'; 

function HospitalDetails() {
  const { userId } = useParams();


  const visit = visits.find((v) => v.userId === parseInt(userId, 10));

  if (!visit) {
    return <div>Ziyaret bulunamadı</div>;
  }

  return (
    <div>
      <h2>Hastane Detayları</h2>
      <p>İsim: {visit.isim} {visit.soyisim}</p>
      <p>Hastane: {visit.hospital}</p>
      <p>Klinik: {visit.clinic}</p>
      <p>Doktor: {visit.doctor}</p>
      <p>Tarih: {visit.date}</p>
    </div>
  );
}

export default HospitalDetails;

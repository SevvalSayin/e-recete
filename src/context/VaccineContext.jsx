
import React, { createContext, useState } from 'react';

const VaccineContext = createContext();

const VaccineProvider = ({ children }) => {
  const [data, setData] = useState([
    {
      ageGroup: '19-21 Yaş',
      influenza: 'Her yıl 1 doz',
      tdTdap: 'İlk seferinde Td yerine Tdap, sonra her 10 yılda bir Td rapeli',
      varicella: '',
      hpvWomen: '2 doz',
      hpvMen: '3 doz',
      zoster: '',
      mmr: '1 veya 2 doz (endikasyona bağlı)',
      pcv13: '',
      ppsv23: '',
      hepA: '2 veya 3 doz (aşıya bağlı)',
      hepB: '',
      menACWY: '',
      menB: '',
      hib: '',
    },
    {
        ageGroup: '22-26 Yaş',
        influenza: 'Her yıl 1 doz',
        tdTdap: 'İlk seferinde Td yerine Tdap, sonra her 10 yılda bir Td rapeli',
        varicella: '',
        hpvWomen: '2 doz',
        hpvMen: '3 doz',
        zoster: '',
        mmr: '1 veya 2 doz (endikasyona bağlı)',
        pcv13: '',
        ppsv23: '',
        hepA: '2 veya 3 doz (aşıya bağlı)',
        hepB: '',
        menACWY: '',
        menB: '',
        hib: '',
      },
      {
        ageGroup: '27-49 Yaş',
        influenza: 'Her yıl 1 doz',
        tdTdap: 'İlk seferinde Td yerine Tdap, sonra her 10 yılda bir Td rapeli',
        varicella: '',
        hpvWomen: '2 doz',
        hpvMen: '3 doz',
        zoster: '',
        mmr: '1 veya 2 doz (endikasyona bağlı)',
        pcv13: '',
        ppsv23: '',
        hepA: '2 veya 3 doz (aşıya bağlı)',
        hepB: '',
        menACWY: '',
        menB: '',
        hib: '',
      },
      {
        ageGroup: '50-59 Yaş',
        influenza: 'Her yıl 1 doz',
        tdTdap: 'İlk seferinde Td yerine Tdap, sonra her 10 yılda bir Td rapeli',
        varicella: '',
        hpvWomen: '2 doz',
        hpvMen: '3 doz',
        zoster: '',
        mmr: '1 veya 2 doz (endikasyona bağlı)',
        pcv13: '',
        ppsv23: '',
        hepA: '2 veya 3 doz (aşıya bağlı)',
        hepB: '',
        menACWY: '',
        menB: '',
        hib: '',
      },
      {
        ageGroup: '60-64 Yaş',
        influenza: 'Her yıl 1 doz',
        tdTdap: 'İlk seferinde Td yerine Tdap, sonra her 10 yılda bir Td rapeli',
        varicella: '',
        hpvWomen: '2 doz',
        hpvMen: '3 doz',
        zoster: '',
        mmr: '1 veya 2 doz (endikasyona bağlı)',
        pcv13: '',
        ppsv23: '',
        hepA: '2 veya 3 doz (aşıya bağlı)',
        hepB: '',
        menACWY: '',
        menB: '',
        hib: '',
      },

  ]);

  return (
    <VaccineContext.Provider value={{ data, setData }}>
      {children}
    </VaccineContext.Provider>
  );
};

export { VaccineContext, VaccineProvider };

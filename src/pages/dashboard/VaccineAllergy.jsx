import React, { useContext } from 'react';
import { useTable } from 'react-table';
import { VaccineContext } from '@/context/VaccineContext';

const columns = [
  { Header: 'Yaş Grubu', accessor: 'ageGroup' },
  { Header: 'Influenza', accessor: 'influenza' },
  { Header: 'Td/Tdap', accessor: 'tdTdap' },
  { Header: 'Varisella', accessor: 'varicella' },
  { Header: 'HPV (Kadın)', accessor: 'hpvWomen' },
  { Header: 'HPV (Erkek)', accessor: 'hpvMen' },
  { Header: 'Zoster', accessor: 'zoster' },
  { Header: 'MMR', accessor: 'mmr' },
  { Header: 'PCV13', accessor: 'pcv13' },
  { Header: 'PPSV23', accessor: 'ppsv23' },
  { Header: 'Hep A', accessor: 'hepA' },
  { Header: 'Hep B', accessor: 'hepB' },
  { Header: 'MenACWY', accessor: 'menACWY' },
  { Header: 'MenB', accessor: 'menB' },
  { Header: 'Hib', accessor: 'hib' },
];

function VaccineAllergy() {
  const { data } = useContext(VaccineContext);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8 space-y-12">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-3xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-red-500">
          Aşı Takvimi ve Alerjiler
        </h1>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full bg-white rounded-lg">
            <thead className="bg-red-500 text-white text-xs sm:text-sm">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="text-left px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3 font-semibold"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-xs sm:text-sm text-gray-700">
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-t hover:bg-gray-200">
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-2 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-3 whitespace-nowrap"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VaccineAllergy;

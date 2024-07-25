import React, { useState } from 'react';

const FilterComponent = ({ provinces, districts, onFilter }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('');
    onFilter(e.target.value, '');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    onFilter(selectedProvince, e.target.value);
  };

  return (
    <div className="p-4 border border-red-500 rounded-md shadow-md">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="p-2 border-b border-gray-300">
              <label className="block text-sm font-medium text-gray-700">İl</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Seç</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </td>
            <td className="p-2 border-b border-gray-300">
              <label className="block text-sm font-medium text-gray-700">İlçe</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Seç</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FilterComponent;

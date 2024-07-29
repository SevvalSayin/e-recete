import React, { useState } from 'react';
import radiologicalData from '@/data/radiologicalData';

const Radiological = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }
    if (Array.isArray(content)) {
      return (
        <div className="flex flex-wrap gap-2 justify-center">
          {content.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Radiological Image ${index + 1}`}
              className="max-w-xs max-h-48 rounded-md shadow-md"
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Tarih</th>
              <th className="py-2 px-4 text-left">Önizleme</th>
              <th className="py-2 px-4 text-left">Hastane Adı</th>
              <th className="py-2 px-4 text-left">Açıklama</th>
              <th className="py-2 px-4 text-left">Rapor</th>
              <th className="py-2 px-4 text-left">Radyolojik Görseller</th>
            </tr>
          </thead>
          <tbody>
            {radiologicalData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.preview}</td>
                <td className="py-2 px-4">{item.hospitalName}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
                    onClick={() => handleModal(item.report)}
                  >
                    Raporu Görüntüle
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
                    onClick={() => handleModal(item.images)}
                  >
                    Görselleri Görüntüle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-full sm:max-w-lg lg:max-w-3xl w-full mx-2">
            <div className="mb-4 overflow-auto max-h-96">
              {renderContent(modalContent)}
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => setShowModal(false)}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Radiological;

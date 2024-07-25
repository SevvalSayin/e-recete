import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent({ hospitals }) {
  return (
    <MapContainer center={[41.0082, 28.9784]} zoom={10} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hospitals.map((hospital, index) => (
        <Marker 
          key={index} 
          position={[hospital.latitude, hospital.longitude]} 
        >
          <Popup>
            <b>{hospital.hospitalName}</b><br />
            {hospital.clinicName}<br />
            {hospital.physicianName}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;

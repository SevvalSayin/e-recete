import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ hospitals }) => {
  return (
    <MapContainer center={[41.015137, 28.979530]} zoom={10} style={{ height: '100%', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
    />
    {hospitals.map((hospital, index) => (
      <Marker key={index} position={[hospital.lat, hospital.lon]}>
        <Popup>
          <strong>{hospital.hospitalName}</strong><br />
          {hospital.clinicName}<br />
          {hospital.physicianName}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
  );
};

export default MapComponent;

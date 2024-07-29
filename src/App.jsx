// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '@/context/UserContext';
import { VaccineProvider } from '@/context/VaccineContext';
import { MapProvider } from '@/context/MapContext';
import { HospitalDataProvider } from '@/context/HospitalContext';
import { Dashboard } from '@/layouts';
import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/sign-up';
import Register from '@/pages/auth/Register'; 
import SignUpdate from '@/pages/auth/sign-update';
import Profile from '@/pages/dashboard/profile';
import { useUser } from '@/context/UserContext';
import Results from '@/pages/dashboard/Results';
import VaccineAllergy from '@/pages/dashboard/VaccineAllergy';
import Assay from '@/pages/dashboard/Assay';
import Radiological from '@/pages/dashboard/Radiological';
import Prescriptions from '@/pages/dashboard/Prescriptions';
import Hospital from '@/pages/dashboard/Hospital';
import './styles.css';
function App() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/radiological" element={user ? <Radiological /> : <Navigate to="/dashboard/home" />} />
      <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/auth/sign-in" element={!user ? <SignIn /> : <Navigate to="/dashboard/home" />} />
      <Route path="/auth/sign-up" element={!user ? <SignUp /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/auth/sign-update" element={<SignUpdate />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/vaccineAllergy" element={user ? <VaccineAllergy /> : <Navigate to="/dashboard/home" />} />
      <Route path="/results" element={user ? <Results /> : <Navigate to="/dashboard/home" />} />
      <Route path="/hospital" element={user ? <Hospital /> : <Navigate to="/dashboard/home" />} />
      <Route path="/prescriptions" element={user ? <Prescriptions /> : <Navigate to="/dashboard/home" />} />
      <Route path="/assay" element={user ? <Assay /> : <Navigate to="/dashboard/home" />} />
      <Route path="/" element={<Navigate to="/auth/sign-in" />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <VaccineProvider>
        <MapProvider>
          <HospitalDataProvider>
            <App />
          </HospitalDataProvider>
        </MapProvider>
      </VaccineProvider>
    </UserProvider>
  );
}

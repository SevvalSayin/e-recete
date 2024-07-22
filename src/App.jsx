import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '@/context/UserContext';
import { Dashboard } from '@/layouts';
import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/sign-up';
import SignUpdate from '@/pages/auth/sign-update';
import Profile from '@/pages/dashboard/profile';
import AsiRandevusu from '@/pages/dashboard/AsiRandevusu';
import AileHekimiRandevusu from '@/pages/dashboard/AileHekimiRandevusu';
import HastaneRandevusu from '@/pages/dashboard/HastaneRandevusu';
import Notifications from '@/pages/dashboard/notifications';
import HospitalDetails from '@/pages/dashboard/HospitalDetails';
import { useUser } from '@/context/UserContext'; 


function App() {
  const { user } = useUser();  

  return (
    <Routes>
      <Route path="/hospital-details/:userId" element={<HospitalDetails />} />
      <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/auth/sign-in" element={!user ? <SignIn /> : <Navigate to="/dashboard/home" />} />
      <Route path="/auth/sign-up" element={!user ? <SignUp /> : <Navigate to="/dashboard/home" />} />
      <Route path="/auth/sign-update" element={user ? <SignUpdate /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/asi-randevusu" element={user ? <AsiRandevusu /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/aile-hekimi-randevusu" element={user ? <AileHekimiRandevusu /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/hastane-randevusu" element={user ? <HastaneRandevusu /> : <Navigate to="/auth/sign-in" />} />
      <Route path="/" element={<Navigate to="/auth/sign-in" />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

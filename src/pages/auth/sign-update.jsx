// src/pages/SignUpdate.jsx
import React, { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function SignUpdate() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor. Lütfen tekrar deneyiniz.");
      return;
    }

    alert("Şifre başarıyla güncellendi!");
    navigate('/auth/sign-in');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="m-8 flex items-center">
        <div className="w-2/5 h-full hidden lg:block relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhZ1im9J2mvE9SdPSb296n3fQr5VEtpDgaA&s"
            className="h-full w-full object-cover rounded-3xl transition-transform duration-300 transform hover:scale-110"
            alt="Kurumsal Kimlik"
          />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Card color="transparent" shadow={false} className="text-center p-6 bg-white rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
              <Typography variant="h5" color="red" className="font-bold mb-4 italic text-2xl">
                e-Reçete
              </Typography>
              <Typography variant="paragraph" color="red" className="text-lg font-normal italic">
                Kişisel İlaç Sistemi
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                  <Typography variant="small" color="gray" className="-mb-3 font-medium">
                    Yeni Şifre
                  </Typography>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="Yeni şifreyi girin"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col gap-6">
                  <Typography variant="small" color="gray" className="-mb-3 font-medium">
                    Yeni Şifre (Tekrar)
                  </Typography>
                  <Input
                    size="lg"
                    type="password"
                    placeholder="Yeni şifreyi tekrar girin"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  className="transform translate-y-5 mb-2 w-80 max-w-screen-lg sm:w-96 bg-red-500 text-white hover:bg-red-600"
                  fullWidth
                  type="submit"
                >
                  Şifre Güncelle
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpdate;

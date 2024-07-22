import React, { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function SignUpdate() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

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
    <div className="flex justify-center items-center h-screen">
      <div className="m-8 flex items-center">
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="https://lh3.googleusercontent.com/proxy/sQc5gQtcgznkJGuQP53nIAJIWVOOY9U7XZOTGHE9HdOpq3seTPrF3G7vS1ar-S45JMwkwIim1iRIIfRliDQnXPFYmOzLgMO--cj6AXZ3sS4vdSI7ml9dKxBGIdChTtY-Ncr_tTQJWJAqZFn9nn5DSgUh68Ij1RROb7Q"
            className="h-full w-full object-cover rounded-3xl"
            alt="Kurumsal Kimlik"
          />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Card color="transparent" shadow={false}>
              <Typography variant="h2" color="red" className="font-bold mb-4 italic">
                e-Reçete
              </Typography>
              <Typography variant="paragraph" color="red" className="text-lg font-normal italic">
                Kişisel İlaç Sistemi - Şifre Güncelleme
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
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
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
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
                  className="transform translate-y-5 mb-2 w-80 max-w-screen-lg sm:w-96"
                  color="white"
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

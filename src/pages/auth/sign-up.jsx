// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import fakeData from '@/data/fake-data';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while checking

    const user = fakeData.find((user) => user.mail === email);
    if (user) {
      setMessage('Onay maili gönderildi. Lütfen emailinizi kontrol edin.');
      // Simulate sending email confirmation and redirect after 3 seconds
      setTimeout(() => navigate('/auth/sign-update'), 3000);
    } else {
      setMessage('Email bulunamadı. Lütfen geçerli bir email girin.');
    }

    setLoading(false); // Reset loading state
  };

  const handleEdevletLogin = () => {
    window.location.href = 'https://giris.turkiye.gov.tr/Giris/';
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
                  <Input
                    size="lg"
                    placeholder="@gmail.com"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                </div>
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center justify-start font-medium"
                    >
                      Katılıyorum&nbsp;
                      <a
                        href="#"
                        className="font-normal text-gray-600 transition-colors hover:text-gray-900 underline"
                      >
                        Şartlar ve Koşullar
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                  required
                />
                <Button
                  className="transform translate-y-5 mb-2 w-80 max-w-screen-lg sm:w-96 bg-red-500 text-white hover:bg-red-600"
                  fullWidth
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Gönderiliyor...' : 'Onayla'}
                </Button>
                <div className="space-y-4 mt-8">
                  <Button
                    size="lg"
                    className="flex items-center gap-2 justify-center shadow-md bg-red-500 text-white hover:bg-red-600"
                    fullWidth
                    onClick={handleEdevletLogin}
                  >
                    <span>E-Devlet Üzerinden Giriş</span>
                  </Button>
                </div>
                <Typography
                  variant="paragraph"
                  className="text-center text-gray-500 font-medium mt-4"
                >
                  Zaten hesabınız var mı?
                  <Link to="/auth/sign-in" className="text-red-500 hover:text-red-600 ml-1">
                    Oturum aç
                  </Link>
                </Typography>
                {message && (
                  <Typography
                    variant="paragraph"
                    className="text-center mt-4 text-red-500"
                    style={{ overflow: 'hidden' }}
                  >
                    {message}
                  </Typography>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

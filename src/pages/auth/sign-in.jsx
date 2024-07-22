// src/pages/auth/sign-in.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';  // Ensure this is correct
import fakeData from '@/data/fake-data';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function SignIn() {
  const [tc, setTc] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();  // Ensure this matches the export

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = fakeData.find((user) => user.tc === tc && user.sifre === password);
    if (user) {
      setUser(user);
      navigate('/dashboard/home'); // Update the path to the correct route
    } else {
      setErrorMessage('T.C Kimlik numaranızı veya şifrenizi hatalı girdiniz.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="m-8 flex items-center">
        <div className="w-2/5 h-full hidden lg:block">
          {/* Your image */}
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Card color="transparent" shadow={false}>
              <Typography variant="h2" color="red" className="font-bold mb-4 italic">
                e-Reçete
              </Typography>
              <Typography variant="paragraph" color="red" className="text-lg font-normal italic">
                Kişisel İlaç Sistemi
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSignIn}>
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    size="lg"
                    label="T.C. Kimlik Numara"
                    type="text"
                    value={tc}
                    onChange={(e) => setTc(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    size="lg"
                    label="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4 flex flex-col gap-6">
                  <Button className="transform translate-y-5 mb-2 w-80 max-w-screen-lg sm:w-96" color="white" type="submit">
                    Giriş Yap
                  </Button>
                  {errorMessage && (
                    <Typography color="red" className="mt-4 text-center">
                      {errorMessage}
                    </Typography>
                  )}
                  <Typography color="gray" className="mt-4 text-center font-normal">
                    <Link
                      to="/auth/sign-up"
                      className="font-medium text-gray-500 transition-colors hover:text-black"
                    >
                      Şifreni mi unuttun?
                    </Link>
                  </Typography>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

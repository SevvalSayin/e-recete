import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { signInUser } from '@/services/apiService';
import { Input, Button, Typography, Card } from '@material-tailwind/react'; // Added Card import
import { insertDocument } from '@/services/apiService';

function SignIn() {
  const [tc, setTc] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInUser({ tc, password });
      setUser(user);
      navigate('/dashboard/home');
    } catch (error) {
      setErrorMessage(error.message || 'T.C Kimlik numaranızı veya şifrenizi hatalı girdiniz.');
    }
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
          <Card
            color="transparent"
            shadow={false}
            className="text-center p-6 bg-white rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Typography variant="h5" color="red" className="font-bold mb-4 italic text-2xl">
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
                  pattern="\d{11}"
                  title="T.C. Kimlik Numaranız 11 haneli olmalıdır."
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
              <Button
                className="transform translate-y-5 mb-2 w-80 max-w-screen-lg sm:w-96 bg-red-500 text-white hover:bg-red-600"
                type="submit"
              >
                Giriş Yap
              </Button>
              {errorMessage && (
                <Typography color="red" className="mt-4 text-center text-lg">
                  {errorMessage}
                </Typography>
              )}
              <Typography color="gray" className="mt-4 text-center font-normal text-lg">
                <Link
                  to="/auth/register"
                  className="font-thin text-gray-500 transition-colors hover:text-gray-500"
                >
                  Hesabınız yok mu? Kayıt Ol
                </Link>
              </Typography>
              <Typography color="gray" className="mt-4 text-center font-normal text-lg">
                <Link to="/auth/sign-up">
                  <Button
                    className="mt-4 bg-red-500 text-white hover:bg-red-600"
                  >
                    Şifreni mi unuttun?
                  </Button>
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

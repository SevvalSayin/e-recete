import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import {
  Input,
  Button,
  Typography,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formFields, setFormFields] = useState({
    name: '',
    surname: '',
    dob: '',
    pob: '',
    countryOfResidence: '',
    cityOfResidence: '',
    height: '',
    weight: '',
    bloodType: '',
    familyDoctor: false,
    personalDoctor: false,
    degreeOfCloseness: '',
    mobilePhone: ''
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setNotification('Şifreler uyuşmuyor');
      return;
    }
    if (!termsAccepted) {
      setNotification('Şartları ve koşulları kabul etmelisiniz');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setNotification('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/auth/sign-in');
    } catch (error) {
      setNotification(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields({
      ...formFields,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-500">Kayıt Ol</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleRegister}>
          <Input
            size="lg"
            label="Ad"
            type="text"
            name="name"
            value={formFields.name}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Soyad"
            type="text"
            name="surname"
            value={formFields.surname}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Doğum Tarihi"
            type="date"
            name="dob"
            value={formFields.dob}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Doğum Yeri"
            type="text"
            name="pob"
            value={formFields.pob}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Yaşadığınız Ülke"
            type="text"
            name="countryOfResidence"
            value={formFields.countryOfResidence}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Yaşadığınız Şehir"
            type="text"
            name="cityOfResidence"
            value={formFields.cityOfResidence}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Boy"
            type="text"
            name="height"
            value={formFields.height}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Kilo"
            type="text"
            name="weight"
            value={formFields.weight}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Kan Grubu"
            type="text"
            name="bloodType"
            value={formFields.bloodType}
            onChange={handleInputChange}
            required
          />
          <Checkbox
            label="Aile Doktoru"
            name="familyDoctor"
            checked={formFields.familyDoctor}
            onChange={handleInputChange}
          />
          <Checkbox
            label="Kişisel Doktor"
            name="personalDoctor"
            checked={formFields.personalDoctor}
            onChange={handleInputChange}
          />
          <Input
            size="lg"
            label="Yakınlık Derecesi"
            type="text"
            name="degreeOfCloseness"
            value={formFields.degreeOfCloseness}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="Cep Telefonu"
            type="text"
            name="mobilePhone"
            value={formFields.mobilePhone}
            onChange={handleInputChange}
            required
          />
          <Input
            size="lg"
            label="E-posta"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Input
            type="password"
            size="lg"
            label="Şifreyi Onayla"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex items-center gap-2 md:col-span-2 lg:col-span-3">
            <Checkbox
              label="Şartları ve koşulları kabul ediyorum"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <Typography 
              variant="small" 
              color="blue" 
              className="underline cursor-pointer"
              onClick={handleModalToggle}
            >
              Şartlar ve Koşullar
            </Typography>
          </div>
          <Button className="w-full md:col-span-2 lg:col-span-3" color="red" type="submit">
            Kayıt Ol
          </Button>
          {notification && (
            <Typography color="red" className="mt-4 text-center w-full md:col-span-2 lg:col-span-3">
              {notification}
            </Typography>
          )}
        </form>
      </div>
      <Dialog open={modalOpen} handler={handleModalToggle} className="!bg-white max-w-md w-full">
        <div className="p-6">
          <DialogHeader>Şartlar ve Koşullar</DialogHeader>
          <DialogBody>
            <Typography variant="paragraph">
              Lütfen devam etmeden önce şartları ve koşulları okuyup kabul ediniz.
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button onClick={handleModalToggle}>Kapat</Button>
          </DialogFooter>
        </div>
      </Dialog>
    </div>
  );
}

export default Register;

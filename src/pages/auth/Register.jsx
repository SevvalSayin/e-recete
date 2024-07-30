import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [confirmationChecked, setConfirmationChecked] = useState(false);
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
    degreeOfCloseness: '',
    mobilePhone: '',
    tc: ''
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
    if (!/^\d{11}$/.test(formFields.tc)) {
      setNotification('TC kimlik numarası 11 haneli olmalıdır');
      return;
    }
    if (!/^\d{10}$/.test(formFields.mobilePhone)) {
      setNotification('Cep telefonu numarası 10 haneli olmalıdır ve sıfır ile başlamamalıdır');
      return;
    }
    try {
      // Create the document object for MongoDB
      const document = {
        name: formFields.name,
        surname: formFields.surname,
        email,
        password, // Note: In a real application, passwords should be hashed before storage
        dob: formFields.dob,
        pob: formFields.pob,
        countryOfResidence: formFields.countryOfResidence,
        cityOfResidence: formFields.cityOfResidence,
        height: formFields.height,
        weight: formFields.weight,
        bloodType: formFields.bloodType,
        degreeOfCloseness: formFields.degreeOfCloseness,
        mobilePhone: formFields.mobilePhone,
        tc: formFields.tc
      };
      
      // Call the API service to insert the document
      await insertDocument(document);
      setNotification('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/auth/sign-in');
    } catch (error) {
      setNotification(error.message || 'Bir hata oluştu');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleTermsCheckboxChange = () => {
    setModalOpen(true);
  };

  const handleConfirmationChange = (e) => {
    setConfirmationChecked(e.target.checked);
  };

  const handleConfirm = () => {
    if (confirmationChecked) {
      setTermsAccepted(true);
      setModalOpen(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-500">Kayıt Ol</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onSubmit={handleRegister}>
          <Input
            size="lg"
            label="Ad"
            type="text"
            name="name"
            value={formFields.name}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Soyad"
            type="text"
            name="surname"
            value={formFields.surname}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Doğum Tarihi"
            type="date"
            name="dob"
            value={formFields.dob}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Doğum Yeri"
            type="text"
            name="pob"
            value={formFields.pob}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Yaşadığınız Ülke"
            type="text"
            name="countryOfResidence"
            value={formFields.countryOfResidence}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Yaşadığınız Şehir"
            type="text"
            name="cityOfResidence"
            value={formFields.cityOfResidence}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Boy"
            type="text"
            name="height"
            value={formFields.height}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Kilo"
            type="text"
            name="weight"
            value={formFields.weight}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Kan Grubu"
            type="text"
            name="bloodType"
            value={formFields.bloodType}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Yakınlık Derecesi"
            type="text"
            name="degreeOfCloseness"
            value={formFields.degreeOfCloseness}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="Cep Telefonu"
            type="text"
            name="mobilePhone"
            value={formFields.mobilePhone}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="TC Kimlik No"
            type="text"
            name="tc"
            value={formFields.tc}
            onChange={handleInputChange}
            required
            className="text-sm"
          />
          <Input
            size="lg"
            label="E-posta"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-sm"
          />
          <Input
            type="password"
            size="lg"
            label="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-sm"
          />
          <Input
            type="password"
            size="lg"
            label="Şifreyi Onayla"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="text-sm"
          />
          <div className="flex items-center gap-2 md:col-span-2 lg:col-span-3">
            <Checkbox
              label="Şartları ve koşulları kabul ediyorum"
              checked={termsAccepted}
              onChange={handleTermsCheckboxChange}
              className="text-sm"
            />
          </div>
          <Button className="w-full md:col-span-2 lg:col-span-3" color="red" type="submit">
            Kayıt Ol
          </Button>
          {notification && (
            <Typography color="red" className="mt-4 text-center w-full md:col-span-2 lg:col-span-3 text-sm">
              {notification}
            </Typography>
          )}
        </form>
      </div>
      <Dialog open={modalOpen} handler={handleModalToggle} className="!bg-white max-w-md w-full">
        <div className="p-6">
          <DialogHeader>Şartlar ve Koşullar</DialogHeader>
          <DialogBody className="overflow-y-auto max-h-[70vh]">
            <Typography variant="paragraph" className="text-sm">
              T.C. SAĞLIK BAKANLIĞI e-REÇETE AYDINLATMA METNİ
              Aydınlatma Metni

              Bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVK Kanunu”) “Veri Sorumlusunun Aydınlatma Yükümlülüğü” kenar başlıklı 10’uncu maddesi uyarınca ve KVK Kanunu kapsamında veri sorumlusu olan T.C. Sağlık Bakanlığı (Bakanlık) tarafından, e-Reçete Kişisel Sağlık Kaydı Sistemi (e-Reçete) kullanıcılarına, kullanıcılara ait kişisel veriler hususunda bilgilendirme yapmak amacıyla hazırlanmıştır. KVK Kanunu uyarınca veri sorumlusunun merkez adresi “Bilkent Yerleşkesi, Üniversiteler Mah. Dumlupınar Bulvarı 6001. Cad. No: 8 06800 Çankaya / Ankara” adresidir. Şahsen başvurulabilir.
              <br />
              <br />
              Kişisel Verilerin İşlenme Amaçları
              Kişisel verileriniz, sizinle yürütülecek tüm süreçler, e-Reçete sisteminin işletilmesi, e-Reçete ile ilgili raporlamaların yapılması, ve sağlık bilgilerinizin paylaşımı gibi konularda kullanılacaktır.
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="red"
              onClick={handleConfirm}
            >
              Onayla
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </div>
  );
}

export default Register;

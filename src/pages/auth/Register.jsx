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
      await axios.post('http://localhost:5000/register', {
        name: formFields.name,
        surname: formFields.surname,
        email: email,
        password: password,
        ...formFields
      });
      setNotification('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/auth/sign-in');
    } catch (error) {
      setNotification(error.response?.data?.error || 'Bir hata oluştu');
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

Bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVK Kanunu”) “Veri Sorumlusunun Aydınlatma Yükümlülüğü” kenar başlıklı 10’uncu maddesi uyarınca ve KVK Kanunu kapsamında veri sorumlusu olan T.C. Sağlık Bakanlığı (Bakanlık) tarafından, e-Reçete Kişisel Sağlık Kaydı Sistemi (e-Reçete) kullanıcılarına, kullanıcılara ait kişisel veriler hususunda bilgilendirme yapmak amacıyla hazırlanmıştır. KVK Kanunu uyarınca veri sorumlusu sıfatını haiz Bakanlığın merkez adresi “Bilkent Yerleşkesi, Üniversiteler Mah. Dumlupınar Bulvarı 6001. Cad. No:9 Çankaya/Ankara 06800”dir.

Veri Sorumlusunun Kimliği

e-Reçete’da işlenen kişisel verileriniz bakımından veri sorumlusu T.C. Sağlık Bakanlığı’dır.

Kişisel Verilerin İşlenme Amaçları

Bu sistemde aşağıda yer alan kişisel verileriniz şu amaçlarla işlenebilmektedir:

- Kimlik verisi: İsim, soyisim, anne ve baba adı, T.C. Kimlik ve Yabancı Kimlik Numarası, anne ve baba T.C. Kimlik Numarası, doğum tarihi, medeni hal, evlilik yaşı, uyruk, cinsiyet, pasaport ve Yurt Dışı Provizyon Aktivasyon Sağlık Sistemi (YUPASS) numarası bilgileri kimliğinizin doğrulanması, sağlık hizmeti süreçlerinin yürütülmesi/denetimi/analizi/izlemi amacıyla işlenebilmektedir.

- İletişim verisi: Telefon numarası, adres, ebeveyn telefon numarası, e-posta adresi, acil durumlarda iletişim kurulacak kişinin iletişim numarası, acil durum yönetimi süreçlerinin yürütülmesi, iletişim faaliyetlerinin yürütülmesi, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmeti süreçlerinin yürütülmesi/denetimi/analizi/izlemi amacıyla işlenebilmektedir.

- Ceza mahkumiyeti ve güvenlik tedbirleri verisi: Cezaevi öyküsü bilgisi var ise bu bilgileri tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmetlerinin planlanması/yönetilmesi, sağlık hizmeti süreçlerinin yürütülmesi/denetimi/analizi/raporlanması/izlemi amacıyla işlenebilmektedir.

- İşlem güvenliği verisi: İşlem güvenliği bilgileri bilgi güvenliği süreçlerinin yürütülmesi, erişim yetkilerinin yürütülmesi amacıyla işlenebilmektedir.

- Özlük verisi: İş, öğrenim, meslek ve sosyal güvence durumu bilgileri acil durum yönetimi süreçlerinin yürütülmesi, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi sağlık hizmeti süreçlerinin yürütülmesi/denetimi/analizi/raporlanması/izlemi amacıyla işlenebilmektedir.

- Finans verisi: Sosyal yardım alma durumu, MEDULA teslim numarası ve fatura bilgileri faaliyetlerin mevzuata uygun yürütülmesi, kamu finansman verimliliğinin artırılması, iş faaliyetlerinin yürütülmesi/denetimi, sağlık hizmeti süreçlerinin yürütülmesi, finans ve muhasebe işlerinin yürütülmesi amacıyla işlenebilmektedir.

- Lokasyon verisi: Konum bilgileri acil durum yönetimi süreçlerinin yürütülmesi, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, iletişim faaliyetlerinin yürütülmesi, sağlık hizmeti süreçlerinin yürütülmesi amacıyla işlenebilmektedir.

- Sağlık verisi: Sağlık bilgileri iş sürekliliğinin sağlanması faaliyetlerinin yürütülmesi/ denetimi/analizi/raporlanması/izlemi, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, kamu finansman verimliliğinin artırılması, sağlık hizmetlerinin yürütülmesi/planlanması/yönetilmesi, sağlık hizmetine yönelik bildirim süreçlerinin (SMS, Push Notification, e-posta vb.) yürütülmesi amacıyla işlenebilmektedir.

- Mesleki deneyim verisi: Meslek bilgileri iş sürekliliğinin sağlanması faaliyetlerinin yürütülmesi, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmeti süreçlerinin yürütülmesi amacıyla işlenebilmektedir.

- Görsel ve işitsel veri: Sağlık problemi ile ilgili fotoğrafınız ve profil içerisinde eklenen fotoğrafınız iş sürekliliğinin sağlanması faaliyetlerinin yürütülmesi, tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmeti süreçlerinin yürütülmesi amacıyla işlenebilmektedir.

- Ülke verisi: Geldiği ülke bilgisi sağlık hizmeti süreçlerinin yürütülmesi amacıyla işlenebilmektedir.

Kişisel Verilerin Aktarımı

Sağlık hizmeti sunan özel sağlık kuruluşlarından hizmet almanız halinde, e-Reçete’daki kişisel verileriniz KVK Kanunu’nun 6’ncı maddesinin üçüncü fıkrası kapsamında mevcut güvenlik tercihleriniz doğrultusunda ilgili hekim(ler)in erişimine sunulabilmektedir. Yoğun bakım veya acil sağlık hizmeti almanız halinde, durumunuzun hayati tehlike arz edebilecek olması sebebiyle e-Reçete hesabınızdaki veriler, ilgili hekimin erişimine sunulabilmektedir. Ayrıca, almış olduğunuz sağlık hizmeti bedelinin Sosyal Güvenlik Kurumu tarafından karşılanacak olması halinde, sağlık hizmeti süreçlerinizin yürütülmesi amacıyla kişisel verileriniz T.C. Sosyal Güvenlik Kurumunun erişimine sunulabilmektedir. KVK Kanunu’nun 28’inci maddesinin ilk fıkrasında yer alan muafiyet halleri saklıdır.

Hasta Takip Ekranları

Sağlık tesislerinde muayene sırasının takip edildiği hasta takip ve poliklinik çağrı ekranlarında adınız ve soyadınızın maskelenerek (Ör: Ay*** Ün***) gösterilmesini talep etmeniz durumunda, e-Reçete profili üzerinde yer alan Profil Düzenleme alanında “Sağlık kuruluşlarındaki hasta takip ve poliklinik çağrı ekranlarında adımın ve soyadımın yıldızlanarak gösterilmesini istiyorum. Adımın ve soyadımın açıkça belirtilmesini istemiyorum.” seçeneğini işaretleme imkânınız bulunmaktadır.

İki Aşamalı Güvenli Giriş

e-Reçete profiline girişiniz esnasında T.C. kimlik numaranız ve e-Reçete şifrenizi girdikten sonra profilinizde yer alan birincil olarak kayıtlı telefon numarasına kısa mesaj (SMS) ile şifre gönderilebilmekte olup bu özelliği e-Reçete profilinizdeki Profil Düzenleme alanında aktifleştirebilme imkanınız bulunmaktadır.

Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi

Kişisel verileriniz e-Reçete Sistemi aracılığı ile otomatik yollarla veya boy, kilo gibi bilgilerin manuel olarak sizin tarafınızdan profilinize eklenmesi suretiyle KVK Kanunu’nun 6’ncı maddesinin ikinci fıkrasındaki “Özel nitelikli kişisel verilerin, ilgilinin açık rızası olmaksızın işlenmesi yasaktır.” hukuki sebebine dayanılarak elde edilebilmektedir/işlenebilmektedir.

Kimlik, iletişim, işlem güvenliği, özlük, finans, lokasyon, mesleki deneyim, ülke verisi, görsel ve işitsel veri kategorisinde bulunan kişisel verileriniz, KVK Kanunu’nun 5’inci maddesinin ikinci fıkrasının (a) bendindeki “Kanunlarda açıkça öngörülmesi”, (ç) bendindeki “Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması” hukuki sebeplerine; sağlık verisi ile ceza mahkumiyeti ve güvenlik tedbirleri veri kategorisinde bulunan kişisel verileriniz ise KVK Kanunu’nun 6’ncı maddesinin üçüncü fıkrasındaki “Kamu sağlığının korunması, koruyucu hekimlik, tıbbî teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, sağlık hizmetleri ile finansmanının planlanması ve yönetimi amacıyla, sır saklama yükümlülüğü altında bulunan kişiler veya yetkili kurum ve kuruluşlar tarafından ilgilinin açık rızası aranmaksızın işlenebilir.” hukuki sebebine dayanılarak işlenebilmektedir.

İlgili Kişilerin Hakları ve Veri Sorumlusuna Başvuru

e-Reçete kullanıcıları KVK Kanunu’nun 11’inci maddesinde düzenlenen haklarını, KVK Kanunu’nun 13’üncü maddesi ve Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ hükümleri çerçevesinde Bakanlığa başvurmak suretiyle kullanabilir. KVK Kanunu’nun 13’üncü maddesi uyarınca yapılacak yazılı başvurular "T.C. Sağlık Bakanlığı, Üniversiteler Mahallesi, 6001. Cadde, No:9, Çankaya, Ankara" adresine; Kayıtlı Elektronik Posta (KEP) ile yapılacak başvurular ise "sb@hs01.kep.tr" adresine iletilmelidir.
</Typography>
            <Checkbox
              label="Şartları ve koşulları okudum ve kabul ediyorum"
              checked={confirmationChecked}
              onChange={handleConfirmationChange}
              className="text-sm mt-4"
            />
          </DialogBody>
          <DialogFooter>
            <Button  onClick={handleConfirm} disabled={!confirmationChecked} className="text-sm">
              Onayla
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </div>
  );
}

export default Register;

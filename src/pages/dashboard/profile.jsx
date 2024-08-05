import React, { useEffect, useState } from 'react';
import { Card, CardBody, Avatar, Typography, Button } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard } from '@/widgets/cards';
import { useUser } from '@/context/UserContext';
import { Dialog } from '@headlessui/react';
import { signUpdateUser } from "@/services/apiService"; // Ensure this import is correct

function Profile() {
    const { user, setUser } = useUser();
    const [profileData, setProfileData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        tc: '',
        email: '',
        phone: '',
        date: '',
        length: '',
        weight: '',
        blood: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setProfileData(user);
            setFormData(user);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let newErrors = {};
        
        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Telefon numarası 10 haneli olmalıdır ve sıfırla başlamamalıdır.";
        }
        if (!/^\d{11}$/.test(formData.tc)) {
            newErrors.tc = "T.C. Kimlik No 11 haneli olmalıdır.";
        }
        if (!formData.length.trim()) {
            newErrors.length = "Boy boş olamaz.";
        } else if (!/^\d+$/.test(formData.length)) {
            newErrors.length = "Boy yalnızca sayı olmalıdır.";
        }
        
        if (!formData.weight.trim()) {
            newErrors.weight = "Kilo boş olamaz.";
        } else if (!/^\d+$/.test(formData.weight)) {
            newErrors.weight = "Kilo yalnızca sayı olmalıdır.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            await signUpdateUser(formData);
            alert("Güncelleme başarılı");
            setUser(formData); // This will update the context and local storage
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error('Update error:', error.message);
            alert("Güncelleme başarısız");
        }
    };

    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('https://media.licdn.com/dms/image/C5616AQFTl_MNNfeevA/profile-displaybackgroundimage-shrink_200_800/0/1553933030954?e=2147483647&v=beta&t=bwvTPuoYlf08xbSLn7GqRvhzPZqditQqdWSiZxl-c9c')] bg-cover bg-center">
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src={profileData.foto || "default-avatar.jpg"}
                                alt={`${formData.name || "İsim"} ${formData.surname || "Soyisim"}`}
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    {`${formData.name || "İsim"} ${formData.surname || "Soyisim"}`}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    {`${profileData.unvan || "Ünvan"}`}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
                            <Button
                                className="flex items-center gap-3"
                                color="red"
                                size="sm"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <PencilIcon className="h-4 w-4" /> Profili Düzenle
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                        <ProfileInfoCard
                            title="Profil Bilgileri"
                            details={{
                                Ad: formData.name,
                                Soyad: formData.surname,
                                Email: formData.email,
                                Telefon: formData.phone,
                                "T.C. Kimlik No": formData.tc,
                                "Doğum Tarihi": formData.date,
                                Boy: formData.length,
                                Kilo: formData.weight,
                                "Kan Grubu": formData.blood,
                            }}
                        />
                    </div>
                </CardBody>
            </Card>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Profili Düzenle
                        </Dialog.Title>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="İsim"
                            />
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Soyisim"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Telefon"
                            />
                            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                            <input
                                type="text"
                                name="tc"
                                value={formData.tc || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="T.C. Kimlik No"
                            />
                            {errors.tc && <p className="text-red-500">{errors.tc}</p>}
                            <input
                                type="date"
                                name="date"
                                value={formData.date || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Doğum Tarihi"
                            />
                            <input
                                type="text"
                                name="length"
                                value={formData.length || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Boy"
                            />
                            {errors.length && <p className="text-red-500">{errors.length}</p>}
                            <input
                                type="text"
                                name="weight"
                                value={formData.weight || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Kilo"
                            />
                            {errors.weight && <p className="text-red-500">{errors.weight}</p>}
                            <select
                                name="blood"
                                value={formData.blood || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                            >
                                <option value="" disabled>Kan Grubu</option>
                                <option value="A Rh+">A Rh+ (A pozitif)</option>
                                <option value="A Rh-">A Rh- (A negatif)</option>
                                <option value="B Rh+">B Rh+ (B pozitif)</option>
                                <option value="B Rh-">B Rh- (B negatif)</option>
                                <option value="AB Rh+">AB Rh+ (AB pozitif)</option>
                                <option value="AB Rh-">AB Rh- (AB negatif)</option>
                                <option value="O Rh+">O Rh+ (O pozitif)</option>
                                <option value="O Rh-">O Rh- (O negatif)</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white "
                                onClick={handleFormSubmit}
                            >
                                Kaydet
                            </button>
                            <button
                                type="button"
                                className="ml-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setIsModalOpen(false)}
                            >
                                İptal
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}

export default Profile;

import React, { useEffect, useState } from 'react';
import { Card, CardBody, Avatar, Typography, Button } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard } from '@/widgets/cards';
import fakeData from '@/data/fake-data';
import { useUser } from '@/context/UserContext';
import { Dialog } from '@headlessui/react';
import { signUpdateUser } from "@/services/apiService"; // Ensure this function is properly imported

function Profile() {
    const { user } = useUser();
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

    useEffect(() => {
        const data = fakeData.find(person => person.tc === user?.tc);
        if (data) {
            setProfileData(data);
            setFormData(data);
        } else {
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log the form data
        try {
            await signUpdateUser(formData);
            alert("Güncelleme başarılı");
            setProfileData(formData); // Update the profile data with the new information
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
                                alt={`${profileData.name || "İsim"} ${profileData.surname || "Soyisim"}`}
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    {`${profileData.name || "İsim"} ${profileData.surname || "Soyisim"}`}
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
                            <input
                                type="text"
                                name="tc"
                                value={formData.tc || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="T.C. Kimlik No"
                            />
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
                            <input
                                type="text"
                                name="weight"
                                value={formData.weight || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Kilo"
                            />
                            <input
                                type="text"
                                name="blood"
                                value={formData.blood || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Kan Grubu"
                            />
                        </div>
                        <div className="mt-4">
                            <Button color="red" onClick={handleFormSubmit} className="mr-2">
                                Kaydet
                            </Button>
                            <Button color="red" onClick={() => setIsModalOpen(false)}>
                                İptal
                            </Button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}

export default Profile;

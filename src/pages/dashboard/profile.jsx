import React, { useEffect, useState } from 'react';
import { Card, CardBody, Avatar, Typography, Button } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard } from '@/widgets/cards';
import fakeData from '@/data/fake-data';
import { useUser } from '@/context/UserContext';
import { Dialog } from '@headlessui/react';

function Profile() {
    const { user } = useUser();
    const [profileData, setProfileData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});

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

    const handleSubmit = () => {
        setProfileData(formData);
        setIsModalOpen(false);
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
                                alt={`${profileData.isim || "İsim"} ${profileData.soyisim || "Soyisim"}`}
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-3">
                                    {`${profileData.isim || "İsim"} ${profileData.soyisim || "Soyisim"}`}
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
                                Ad: profileData.isim,
                                Soyad: profileData.soyisim,
                                Email: profileData.email,
                                Telefon: profileData.telefon,
                                "T.C. Kimlik No": profileData.tc,
                                "Doğum Tarihi": profileData.dogumTarihi,
                                Boy: profileData.boy,
                                Kilo: profileData.kilo,
                                "Kan Grubu": profileData.kanGrubu,
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
                                name="isim"
                                value={formData.isim || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="İsim"
                            />
                            <input
                                type="text"
                                name="soyisim"
                                value={formData.soyisim || ''}
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
                                name="telefon"
                                value={formData.telefon || ''}
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
                                name="dogumTarihi"
                                value={formData.dogumTarihi || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Doğum Tarihi"
                            />
                            <input
                                type="text"
                                name="boy"
                                value={formData.boy || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Boy"
                            />
                            <input
                                type="text"
                                name="kilo"
                                value={formData.kilo || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Kilo"
                            />
                            <input
                                type="text"
                                name="kanGrubu"
                                value={formData.kanGrubu || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-2 border rounded"
                                placeholder="Kan Grubu"
                            />
                        </div>
                        <div className="mt-4">
                            <Button color="red" onClick={handleSubmit} className="mr-2">
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

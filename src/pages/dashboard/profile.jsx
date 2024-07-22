import React, { useEffect, useState } from 'react';
import { Card, CardBody, Avatar, Typography, Button } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { ProfileInfoCard } from '@/widgets/cards';
import fakeData from '@/data/fake-data'; 
import { useUser } from '@/context/UserContext';  

function Profile() {
    const { user } = useUser();  
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        
        const data = fakeData.find(person => person.tc === user?.tc);  
        if (data) {
            setProfileData(data);
        } else {
            setProfileData(user); 
        }
    }, [user]);

    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
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
                            <Button className="flex items-center gap-3" color="blue" size="sm">
                                <PencilIcon className="h-4 w-4" /> Profili Düzenle
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                        <ProfileInfoCard
                            title="Profil Bilgileri"
                            description="Profil bilgileriniz burada listelenmektedir."
                            details={{
                                Ad: profileData.isim,
                                Soyad: profileData.soyisim,
                                Email: profileData.email,
                                Telefon: profileData.telefon,
                                "T.C. Kimlik No": profileData.tc,
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Profile;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle, faStethoscope, faCapsules, faHospital, faSyringe, faUserPlus, faVials, faCircleRadiation } from '@fortawesome/free-solid-svg-icons';

import { Home, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Results from "@/pages/dashboard/Results";
import Assay from "@/pages/dashboard/Assay";
import Radiological from "@/pages/dashboard/Radiological";
import Prescriptions from "@/pages/dashboard/Prescriptions";
import Hospital from "@/pages/dashboard/Hospital";
import VaccineAllergy from "@/pages/dashboard/VaccineAllergy";

const icon = { className: "w-5 h-5 text-inherit" };

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <FontAwesomeIcon icon={faHome} {...icon} />,
        name: "Ana Sayfa",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <FontAwesomeIcon icon={faUserCircle} {...icon} />,
        name: "Profil",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <FontAwesomeIcon icon={faStethoscope} {...icon} />,
        name: "Muayene Sonuçları",
        path: "/results",
        element: <Results />,
      },
      {
        icon: <FontAwesomeIcon icon={faCapsules} {...icon} />,
        name: "Tetkik İsteme",
        path: "/assay",
        element: <Assay />,
      },
      {
        icon: <FontAwesomeIcon icon={faCircleRadiation} {...icon} />,
        name: "Radyolojik İşlemler",
        path: "/radiological",
        element: <Radiological />,
      },
      {
        icon: <FontAwesomeIcon icon={faSyringe} {...icon} />,
        name: "Aşı/Alerji",
        path: "/vaccineallergy",
        element: <VaccineAllergy />,
      },
      {
        icon: <FontAwesomeIcon icon={faUserPlus} {...icon} />,
        name: "Reçetelerim",
        path: "/prescriptions",
        element: <Prescriptions />,
      },
      {
        icon: <FontAwesomeIcon icon={faHospital} {...icon} />,
        name: "Hastane",
        path: "/hospital",
        element: <Hospital />,
      },
    ],
  },
  {
    title: "Kullanıcı Girişi",
    layout: "auth",
    pages: [
      {
        icon: <FontAwesomeIcon icon={faUserCircle} {...icon} />,
        name: "Giriş Yap",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <FontAwesomeIcon icon={faUserPlus} {...icon} />,
        name: "Kayıt Ol",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

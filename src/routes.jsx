import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle, faStethoscope, faCapsules, faHospital, faSyringe,  faUserPlus,faVials,faCircleRadiation } from '@fortawesome/free-solid-svg-icons';

import { Home, Profile } from "@/pages/dashboard";
import { SignIn, SignUp, SignUpdate } from "@/pages/auth";
import Results from "@/pages/dashboard/Results";
import Assay from "./pages/dashboard/Assay";
import Radiological from "./pages/dashboard/Radiological";
import Prescriptions from "./pages/dashboard/Prescriptions";
import Hospital from "./pages/dashboard/Hospital";
import VaccineAllergy from "./pages/dashboard/VaccineAllergy";

const icon = { className: "w-5 h-5 text-inherit" };

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <FontAwesomeIcon icon={faHome} {...icon} />,
        name: "Anasayfa",
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
        name: "Sonuçlarım",
        path: "/results",
        element: <Results />, 
      },
      {
        icon: <FontAwesomeIcon icon={faVials} {...icon} />,
        name: "Tahlillerim",
        path: "/assay",
        element: <Assay />,
      },
      {
        icon: <FontAwesomeIcon icon={faCircleRadiation} {...icon} />, 
        name: "Radyolojik Görüntülerim",
        path: "/radiological",
        element: <Radiological/>,
      },
      {
        icon: <FontAwesomeIcon icon={faCapsules} {...icon} />, 
        name: "Reçetelerim",
        path: "/prescriptions",
        element: <Prescriptions/>,
      },
      {
        icon: <FontAwesomeIcon icon={faHospital} {...icon} />, 
        name: "Ziyaretlerim",
        path: "/hospital",
        element: <Hospital/>,
      },
      {
        icon: <FontAwesomeIcon icon={faSyringe} {...icon} />, 
        name: "Aşı Takvimim/Alerjilerim",
        path: "/vaccineAllergy",
        element: <VaccineAllergy/>,
      },
    ],
  },
  {
    /* title: "auth pages", */
    layout: "auth",
    pages: [
      {
        icon: <FontAwesomeIcon icon={faUserPlus} {...icon} />,
        name: "Giriş Yap",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <FontAwesomeIcon icon={faUserPlus} {...icon} />,
        name: "Şifre Güncelle",
        path: "/sign-up",
        element: <SignUp />,
      },
     /*  {
        icon: <FontAwesomeIcon icon={faUserPlus} {...icon} />,
        name: "Şifre Güncelle",
        path: "/sign-update",
        element: <SignUpdate />, 
      }, */
    ],
  },
];

export default routes;


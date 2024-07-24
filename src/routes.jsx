import { HomeIcon, UserCircleIcon, TableCellsIcon, InformationCircleIcon, ServerStackIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { Home, Profile } from "@/pages/dashboard";
import { SignIn, SignUp, SignUpdate } from "@/pages/auth";
import Results from "@/pages/dashboard/Results";
import Assay from "./pages/dashboard/Assay";
import Radiological from "./pages/dashboard/Radiological";
import Prescriptions from "./pages/dashboard/Prescriptions";
import Hospital from "./pages/dashboard/Hospital";
import VaccineAllergy from "./pages/dashboard/vaccineAllergy";

const icon = { className: "w-5 h-5 text-inherit" };

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Anasayfa",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profil",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Sonuçlarım",
        path: "/results",
        element: <Results />, 
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Tahlillerim",
        path: "/assay",
        element: <Assay />,
      },
      {
        icon: <InformationCircleIcon {...icon} />, 
        name: "Radyolojik Görüntülerim",
        path: "/radiological",
        element: <Radiological/>,
      },
      {
        icon: <InformationCircleIcon {...icon} />, 
        name: "Reçetelerim",
        path: "/prescriptions",
        element: <Prescriptions/>,
      },
      {
        icon: <InformationCircleIcon {...icon} />, 
        name: "Ziyaretlerim",
        path: "/hospital",
        element: <Hospital/>,
      },
      {
        icon: <InformationCircleIcon {...icon} />, 
        name: "Aşı Takvimim/Alerjilerim",
        path: "/vaccineAllergy",
        element: <VaccineAllergy/>,
      },
      
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign update",
        path: "/sign-update",
        element: <SignUpdate />, 
      },
    ],
  },
];

export default routes;
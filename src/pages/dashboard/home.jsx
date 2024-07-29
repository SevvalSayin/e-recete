import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography
} from '@material-tailwind/react';
import { StatisticsCard } from '@/widgets/cards';
import { StatisticsChart } from '@/widgets/charts';
import { useHomeData } from '@/context/HomeDataContext';
import vaccineIcon from "@/assets/Vaccine.png";
import assayIcon from "@/assets/assay.png";
import hospitalIcon from "@/assets/hospital.png";
import prescriptionsIcon from "@/assets/prescriptions.png";
import radiologicalIcon from "@/assets/radiological.png";
import resultsIcon from "@/assets/results.png";

function Home() {
  const { statisticsCardsData, statisticsChartsData } = useHomeData(); 

  const boxes = [
    { title: "Sonuçlarım", link: "/dashboard/results", color: "bg-red-500", icon: <img src={resultsIcon} alt="results" className="w-12 h-12" /> },
    { title: "Tahlillerim", link: "/dashboard/assay", color: "bg-green-500", icon: <img src={assayIcon} alt="assay" className="w-12 h-12" /> },
    { title: "Radyolojik Görüntülerim", link: "/dashboard/radiological", color: "bg-blue-500", icon: <img src={radiologicalIcon} alt="radiological" className="w-12 h-12" /> },
    { title: "Reçetelerim", link: "/dashboard/prescriptions", color: "bg-yellow-900", icon: <img src={prescriptionsIcon} alt="prescriptions" className="w-12 h-12" /> },
    { title: "Ziyaretlerim", link: "/dashboard/hospital", color: "bg-purple-500", icon: <img src={hospitalIcon} alt="hospital" className="w-12 h-12" /> },
    { title: "Aşı Takvimim/Alerjilerim", link: "/dashboard/vaccineAllergy", color: "bg-teal-500", icon: <img src={vaccineIcon} alt="vaccine" className="w-12 h-12" /> },
  ];

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-4 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {statisticsCardsData.map(({ icon, title, footer, link, ...rest }, index) => (
          <Link key={title} to={`/hospital/${index}`}>
            <StatisticsCard
              {...rest}
              title={title}
              icon={React.createElement(icon, { className: 'w-6 h-6 text-white' })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          </Link>
        ))}
      </div>

      <div className="mb-12 grid gap-y-4 gap-x-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {boxes.map(({ title, link, color, icon }, index) => (
          <Link key={index} to={link} className="block">
            <div
              className={`${color} text-white text-center p-4 rounded-lg shadow hover:bg-opacity-80 transition duration-300 flex items-center justify-center`}
              style={{ width: '100%', maxWidth: '300px', minHeight: '200px' }} // Adjusted size
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-4">
                  {icon}
                </div>
                <span className="text-base md:text-lg lg:text-xl font-semibold">{title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2 lg:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

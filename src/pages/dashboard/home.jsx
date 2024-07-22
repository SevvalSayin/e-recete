import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Card, CardHeader, CardBody, IconButton, Menu,
  MenuHandler, MenuList, MenuItem, Avatar, Tooltip, Progress
} from '@material-tailwind/react';
import { EllipsisVerticalIcon, ArrowUpIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { StatisticsCard } from '@/widgets/cards';
import { StatisticsChart } from '@/widgets/charts';
import { useHomeData } from '@/context/HomeDataContext'; 

function Home() {
  const { statisticsCardsData, statisticsChartsData, projectsTableData, ordersOverviewData } = useHomeData();

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
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

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon strokeWidth={3} fill="currentColor" className="h-6 w-6" />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {['companies', 'members', 'budget', 'completion'].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${key === projectsTableData.length - 1 ? '' : 'border-b border-blue-gray-50'}`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography variant="paragraph" color="blue-gray" className="font-bold">
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar src={img} alt={name} size="xs" variant="circular" className={`cursor-pointer border-2 border-white ${key === 0 ? '' : '-ml-2.5'}`} />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography variant="paragraph" className="text-xs font-medium text-blue-gray-600">
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Progress value={completion} color="deep-orange" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Orders Overview
              </Typography>
              <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
                <ArrowUpIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-200" />
                <strong>24% more</strong> in 2021
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon strokeWidth={3} fill="currentColor" className="h-6 w-6" />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2">
            <div className="overflow-x-scroll">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {['name', 'country', 'city', 'status', 'completion'].map((el) => (
                      <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography variant="small" className="text-[11px] font-medium uppercase text-blue-gray-400">
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ordersOverviewData.map(({ name, country, city, status, completion }, key) => {
                    const className = `py-3 px-5 ${key === ordersOverviewData.length - 1 ? '' : 'border-b border-blue-gray-50'}`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <Typography variant="paragraph" className="font-bold">
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="paragraph" className="text-blue-gray-600">
                            {country}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="paragraph" className="text-blue-gray-600">
                            {city}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="paragraph" className="text-blue-gray-600">
                            {status}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Progress value={completion} color="green" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;

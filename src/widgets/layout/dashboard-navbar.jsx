import { useLocation } from "react-router-dom";
import { Navbar, Typography, Input, IconButton } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";

export function DashboardNavbar() {
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color="transparent"
      className="rounded-xl transition-all px-4 py-2"
      fullWidth
    >
      <div className="flex items-center justify-between md:justify-start md:space-x-4">
        <div className="flex items-center space-x-4">
          <IconButton
            variant="text"
            color="blue-gray"
            className="xl:hidden"
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
        <div className="flex-grow flex justify-center">
          <div className="relative w-full max-w-md">
            <Input
              label="Search"
              className="w-full"
              style={{ width: '100%' }} // Ensure the input takes up the full width of its container
            />
          </div>
        </div>
        <div className="capitalize">
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;

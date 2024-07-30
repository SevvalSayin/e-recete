import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Typography, Input, IconButton, Button } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useUser } from '@/context/UserContext';

export function DashboardNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    navigate("/auth/sign-in");
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length >= 2) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

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
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ width: '100%' }}
            />
            {searchQuery.length >= 2 && (
              <div className="absolute bg-white shadow-lg rounded-md mt-1 w-full max-h-60 overflow-y-auto z-10">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => navigate(`/article/${result.id}`)}
                  >
                    {result.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Typography variant="h6" color="blue-gray" className="capitalize">
            {page}
          </Typography>
          <Button
            variant="gradient"
            color="red"
            size="sm"
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;

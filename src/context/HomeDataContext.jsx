import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const HomeDataContext = createContext();

export const useHomeData = () => useContext(HomeDataContext);

export const HomeDataProvider = ({ children }) => {
  const [statisticsCardsData, setStatisticsCardsData] = useState([]);
  const [statisticsChartsData, setStatisticsChartsData] = useState([]);
  const [projectsTableData, setProjectsTableData] = useState([]);
  const [ordersOverviewData, setOrdersOverviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Using Axios to fetch data
        const cardsResponse = await axios.get('/api/statistics/cards');
        const chartsResponse = await axios.get('/api/statistics/charts');
        const projectsResponse = await axios.get('/api/projects');
        const ordersResponse = await axios.get('/api/orders');

        setStatisticsCardsData(cardsResponse.data);
        setStatisticsChartsData(chartsResponse.data);
        setProjectsTableData(projectsResponse.data);
        setOrdersOverviewData(ordersResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <HomeDataContext.Provider
      value={{
        statisticsCardsData,
        statisticsChartsData,
        projectsTableData,
        ordersOverviewData,
        loading,
        error,
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};

export default HomeDataContext;

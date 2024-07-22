import React, { createContext, useState, useEffect, useContext } from 'react';


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
    
        const cardsData = await fetch('/api/statistics/cards').then(res => res.json());
        const chartsData = await fetch('/api/statistics/charts').then(res => res.json());
        const projectsData = await fetch('/api/projects').then(res => res.json());
        const ordersData = await fetch('/api/orders').then(res => res.json());

        setStatisticsCardsData(cardsData);
        setStatisticsChartsData(chartsData);
        setProjectsTableData(projectsData);
        setOrdersOverviewData(ordersData);
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

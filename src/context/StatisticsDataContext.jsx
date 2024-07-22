
import React, { createContext, useState, useEffect, useContext } from 'react';

const StatisticsDataContext = createContext();

export const useStatisticsData = () => useContext(StatisticsDataContext);

export const StatisticsDataProvider = ({ children }) => {
  const [statisticsCardsData, setStatisticsCardsData] = useState([]);
  const [statisticsChartsData, setStatisticsChartsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        setLoading(true);
       
        const cardsData = await fetch('/api/statistics/cards').then((res) => res.json());
        const chartsData = await fetch('/api/statistics/charts').then((res) => res.json());

        setStatisticsCardsData(cardsData);
        setStatisticsChartsData(chartsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStatisticsData();
  }, []);

  return (
    <StatisticsDataContext.Provider value={{ statisticsCardsData, statisticsChartsData, loading, error }}>
      {children}
    </StatisticsDataContext.Provider>
  );
};

export default StatisticsDataContext;

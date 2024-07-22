import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { MaterialTailwindControllerProvider } from '@/context';
import { HomeDataProvider } from '@/context/HomeDataContext';
import App from './App';
import '../public/css/tailwind.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <ThemeProvider>
      <MaterialTailwindControllerProvider>
        <HomeDataProvider> 
          <App />
        </HomeDataProvider>
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  </Router>
);

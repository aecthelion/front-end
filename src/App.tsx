import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/system';
import './App.css';
import HomePage from './pages/HomePage';
import theme from './helpers/theme';

const App: React.FC = () => {
  return (
     <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
     </ThemeProvider>
  );
};

export default App;

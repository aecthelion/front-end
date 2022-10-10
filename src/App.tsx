import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import './App.css';
import HomePage from './pages/HomePage';
import theme from './helpers/theme';
import PrivateRoute from './components/privateRoute/index';
import SignInForm from './components/signInForm';
import SignUpForm from './components/signUpForm/index';
import VacanciesPage from './pages/VacanciesPage';
import CoursesPage from './pages/CoursesPage';
import axios from 'axios';
import { useAppSelector } from './hooks/redux';
import AdminPanel from './pages/AdminPanel';
import CenterModal from './components/centerModal';
import { ApplicationsPage } from './pages/Applications/index';

const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (user && user.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CenterModal />
        <Routes>
          <Route element={<PrivateRoute user={user} />}>
            <Route path="/settings" element={<AdminPanel />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

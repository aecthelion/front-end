import { AccountCircle, Search } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/ui/logo';
import { useAppSelector } from '../../hooks/redux';

const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (user && user.token) {
      return navigate('/courses');
    } else {
      return navigate('/login');
    }
  };
  return (
    <Box
      display="flex"
      sx={{
        padding: '30px 0',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Logo type="dark" />

      <Box sx={{ width: 140, display: 'flex', alignItems: 'center' }}>
        <Button sx={{ color: 'primary.dark' }}>
          <Search fontSize="large" />
        </Button>

        <Button onClick={handleAccountClick}>
          <AccountCircle fontSize="large" sx={{ color: 'primary.dark' }} />
        </Button>
      </Box>
    </Box>
  );
};

export default Header;

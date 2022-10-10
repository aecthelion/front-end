import { Button } from '@mui/material';
import React from 'react';

interface IFooterBtn {
  text: string;
  onClick?: () => void;
}

const FooterBtn = ({ text, onClick }: IFooterBtn) => {
  return (
    <Button
      onClick={onClick ? onClick : () => null}
      sx={{
        width: `fit-content`,
        backgroundColor: 'primary.light',
        color: 'primary.dark',
        fontWeight: 'bold',
        fontSize: {
          xl: '1.1rem',
          lg: '1.1rem',
          md: '0.9rem',
          sm: '0.9rem',
          xs: '0.7rem',
        },
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'primary.light',
        },
        minWidth: {
          xl: '99px',
          lg: '99px',
          md: '99px',
          sm: '99px',
          xs: '80px',
        },
      }}
    >
      {text}
    </Button>
  );
};

export default FooterBtn;

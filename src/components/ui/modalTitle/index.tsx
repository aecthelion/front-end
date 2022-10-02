import React from 'react';
import { Typography } from '@mui/material';

interface IModalTitleProps {
  title: string;
}

const ModalTitle = ({ title }: IModalTitleProps) => {
  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 'bold',
        marginBottom: '20px',
      }}
    >
      {title}
    </Typography>
  );
};

export default ModalTitle;

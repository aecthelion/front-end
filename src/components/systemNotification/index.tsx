import { Snackbar, Alert } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeSystemNotification } from '../../store/reducers/systemNotification/systemNotification';

export default function SystemNotification() {
  const { isOpen, text, type } = useAppSelector(
    (state) => state.systemNotification
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeSystemNotification());
  };

  return type && text ? (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      sx={{ width: '100%', zIndex: 999 }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type} variant="filled">
        {text}
      </Alert>
    </Snackbar>
  ) : null;
}

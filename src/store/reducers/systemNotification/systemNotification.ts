import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface ISystemNotification {
  isOpen: boolean;
  type: AlertColor | null;
  text: string;
}

const initialState: ISystemNotification = {
  isOpen: false,
  type: null,
  text: '',
};

export const systemNotificationSlice = createSlice({
  name: 'systemNotification',
  initialState,
  reducers: {
    resetNotification: (state) => {
      state = {
        isOpen: false,
        type: null,
        text: '',
      };
    },
    closeSystemNotification: (state) => {
      state.isOpen = false;
      state.text = '';
      state.type = null;
    },
    openSystemNotification: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
  },
});

export const {
  resetNotification,
  closeSystemNotification,
  openSystemNotification,
} = systemNotificationSlice.actions;
export default systemNotificationSlice.reducer;

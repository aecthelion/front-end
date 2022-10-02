import { createSlice } from '@reduxjs/toolkit';

interface IModal {
  isOpen: boolean;
  type: string;
  props: any;
}

interface IModalReducer {
  centerModal: IModal;
  rightModal: IModal;
}

const initialState: IModalReducer = {
  centerModal: {
    isOpen: false,
    type: '',
    props: null,
  },
  rightModal: {
    isOpen: false,
    type: '',
    props: null,
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    resetModals: (state) => {
      state.centerModal = {
        isOpen: false,
        type: '',
        props: null,
      };
      state.rightModal = {
        isOpen: false,
        type: '',
        props: null,
      };
    },
    closeCenterModal: (state) => {
      state.centerModal.isOpen = false;
      state.centerModal.type = '';
      state.centerModal.props = null;
    },
    openCenterModal: (state, action) => {
      state.centerModal.isOpen = true;
      state.centerModal.type = action.payload.type;
      state.centerModal.props = action.payload.props;
    },
    closeRightModal: (state) => {
      state.rightModal.isOpen = false;
      state.rightModal.type = '';
      state.rightModal.props = null;
    },
    openRightModal: (state, action) => {
      state.rightModal.isOpen = true;
      state.rightModal.type = action.payload.type;
      state.rightModal.props = action.payload.props;
    },
  },
});

export const {
  resetModals,
  openCenterModal,
  closeCenterModal,
  openRightModal,
  closeRightModal,
} = modalSlice.actions;
export default modalSlice.reducer;

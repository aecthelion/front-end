import { Backdrop, IconButton, Modal } from '@mui/material';
import { closeCenterModal } from '../../store/reducers/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Close } from '@mui/icons-material';
import { Paper } from '@mui/material';
import { COLORS } from './../../helpers/theme';
import AddNewVacancy from './../modals/addNewVacancy';
import UserUpdateModal from '../modals/userUpdateModal';

const modals = (props: any) => ({
  AddNewVacancy: <AddNewVacancy {...props} />,
  UserUpdateModal: <UserUpdateModal {...props} />,
});

const CenterModal = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(closeCenterModal());
  const { centerModal } = useAppSelector((state) => state.modal);
  return (
    <Modal
      disableAutoFocus
      open={centerModal.isOpen}
      BackdropComponent={Backdrop}
      BackdropProps={{
        style: {
          backdropFilter: 'blur(16px)',
          outline: 'none',
        },
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          padding: '30px',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: COLORS.main,
            transition: 'transform .4s ease-in-out',
            ':hover': {
              transform: 'rotate(360deg)',
              color: COLORS.danger,
            },
          }}
          onClick={handleClose}
        >
          <Close sx={{}} fontSize="large" />
        </IconButton>
        {modals(centerModal.props)[centerModal.type as keyof typeof modals]}
      </Paper>
    </Modal>
  );
};

export default CenterModal;

import { useState, useEffect, createRef } from 'react';
import { Formik, FormikHelpers } from 'formik';
import validationSchema from './validationSchema';
import SignUpFormComponent from './userUpdateFormComponent';
import AuthSideTitle from '../../ui/authSideTitle';
import { Container, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  updateUser,
  resetStatus,
} from './../../../store/reducers/users/usersSlice';

interface IUserData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  avatar?: string;
  _id?: string;
}

interface IUserUpdateModalProps {
  userData: IUserData;
  onSuccess: () => void;
}

export interface IUserUpdateModal extends IUserData {
  confirmPassword: string;
}

interface IUserUpdateModalProps {
  userData: IUserData;
}

export interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Updated successfully.',
    type: 'success',
  },
};

const UserUpdateModal = ({ userData, onSuccess }: IUserUpdateModalProps) => {
  const dispatch = useAppDispatch();
  const formikRef: any = createRef();

  const { isError, isSuccess, error } = useAppSelector(
    (state) => state.users.updateUser.statuses
  );
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const onSubmit = (
    values: IUserUpdateModal,
    actions: FormikHelpers<IUserUpdateModal>
  ) => {
    actions.setSubmitting(true);
    if (userData._id) {
      dispatch(updateUser({ user: values, userId: userData._id }));
    }
  };

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;
    if (isError) {
      setFormStatus({
        message: error,
        type: 'error',
      });

      formikCurrentRef.setSubmitting(false);
      dispatch(resetStatus('updateUser'));
    }
    setDisplayFormStatus(true);
  }, [isError, error, dispatch, formikRef]);

  useEffect(() => {
    if (isSuccess) {
      setFormStatus(formStatusProps.success);
      onSuccess();
    }
  }, [isSuccess, dispatch, onSuccess]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '700px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <AuthSideTitle title="rock" spanTitle="it" leftPosition="-95px" />
        <Formik
          initialValues={{
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role ? userData.role : 'user',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={onSubmit}
          innerRef={formikRef}
          encType="multipart/form-data"
          validationSchema={validationSchema}
        >
          {(props) => (
            <SignUpFormComponent
              {...props}
              displayFormStatus={displayFormStatus}
              formStatus={formStatus}
            />
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserUpdateModal;

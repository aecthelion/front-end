import React, { useState, useEffect, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import validationSchema from './validationSchema';
import SignUpFormComponent from './singUpFormComponent';
import { dataToFormData } from '../../utils/dataToFormData';
import AuthSideTitle from '../ui/authSideTitle';
import { Container, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from './../../hooks/redux';
import {
  registerUser,
  resetAuthStatus,
} from '../../store/reducers/auth/authSlice';

export interface ISignUpForm {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  avatar: string;
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
    message: 'Signed up successfully.',
    type: 'success',
  },
  duplicate: {
    message: 'Email already exist. Please use different email.',
    type: 'error',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

const SignUpForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formikRef: any = createRef();
  const { user, registerStatus } = useAppSelector((state) => state.auth);
  const { isError, isSuccess, error } = registerStatus;
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const onSubmit = (
    values: ISignUpForm,
    actions: FormikHelpers<ISignUpForm>
  ) => {
    actions.setSubmitting(true);
    const data: FormData = dataToFormData(values);

    dispatch(registerUser(data));
  };

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;
    if (isError) {
      setFormStatus({ type: 'error', message: 'error' });
      formikCurrentRef.setSubmitting(false);
      dispatch(resetAuthStatus('registerStatus'));
    }
    setDisplayFormStatus(true);
  }, [isError, error, navigate, dispatch, formikRef]);

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;
    if (user || isSuccess) {
      setFormStatus(formStatusProps.success);
      formikCurrentRef.setSubmitting(false);
      dispatch(resetAuthStatus('registerStatus'));
      navigate('/login');
    }
    setDisplayFormStatus(true);
  }, [user, isSuccess, dispatch, navigate, formikRef]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: '',
            avatar: '',
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

export default SignUpForm;

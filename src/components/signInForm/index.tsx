import React, { createRef, useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import validationSchema from './validationSchema';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AuthSideTitle from '../ui/authSideTitle';
import {
  loginUser,
  resetAuthStatus,
} from '../../store/reducers/auth/authSlice';
import { SignInFormComponent } from './signinFormComponents';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export interface ISignInForm {
  password: string;
  email: string;
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
    message: 'Login successful',
    type: 'success',
  },
  error: {
    message: 'Enter correct login data',
    type: 'error',
  },
};

const SignInForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formikRef: any = createRef();

  const { user, loginStatus } = useAppSelector((state) => state.auth);
  const { isError, isSuccess, error } = loginStatus;
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const onSubmit = (
    values: ISignInForm,
    actions: FormikHelpers<ISignInForm>
  ) => {
    actions.setSubmitting(true);
    dispatch(loginUser(values));
  };

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;
    if (isError) {
      formikCurrentRef.setSubmitting(false);
      setFormStatus({ type: 'error', message: error });
      dispatch(resetAuthStatus('loginStatus'));
    }

    setDisplayFormStatus(true);
  }, [isError, error, dispatch, formikRef]);

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;
    if (user || isSuccess) {
      setFormStatus(formStatusProps.success);
      formikCurrentRef.setSubmitting(false);
      navigate('/');
    }
  }, [user, isSuccess, navigate, formikRef]);

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
            email: '',
            password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          innerRef={formikRef}
        >
          {(props: any) => (
            <SignInFormComponent
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

export default SignInForm;

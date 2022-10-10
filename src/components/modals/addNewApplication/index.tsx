import React, { createRef, useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import validationSchema from './validationSchema';
import { Box, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  addUserApplication,
  resetUserApplicationStatus,
} from '../../../store/reducers/userApplication/userApplicationSlice';
import { NewApplicationFormComponent } from './newApplicationFormComponents';
import ModalTitle from '../../ui/modalTitle';
import { closeCenterModal } from '../../../store/reducers/modal/modalSlice';
import { IUserApplication } from './../../../models/IUserApplication';
import { applicationStatus } from '../../../helpers';
import { openSystemNotification } from '../../../store/reducers/systemNotification/systemNotification';

export interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Successfully created',
    type: 'success',
  },
  error: {
    message: 'Problem with creating, please try again later',
    type: 'error',
  },
};

const AddNewApplication: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const formikRef: any = createRef();
  const { newApplicationStatus } = useAppSelector(
    (state) => state.userApplication
  );
  const { isLoading, isError, isSuccess, error } = newApplicationStatus;
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const onSubmit = (
    values: IUserApplication,
    actions: FormikHelpers<IUserApplication>
  ) => {
    actions.setSubmitting(true);
    dispatch(addUserApplication(values));
  };

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;
    if (isError) {
      formikCurrentRef.setSubmitting(false);
      setFormStatus({
        message: error,
        type: 'error',
      });
      dispatch(resetUserApplicationStatus('newApplicationStatus'));
    }
    if (isSuccess) {
      setFormStatus(formStatusProps.success);
      formikCurrentRef.setSubmitting(false);
      dispatch(
        openSystemNotification({
          type: 'success',
          text: 'Successfully applied',
        })
      );
      dispatch(resetUserApplicationStatus('newApplicationStatus'));
      dispatch(closeCenterModal());
    }
    setDisplayFormStatus(true);
  }, [isLoading, isError, isSuccess, error, dispatch, formikRef]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <ModalTitle title={'New course application'} />
        <Formik
          initialValues={{
            courseId: '',
            englishLvl: '',
            technicalBackground: '',
            status: applicationStatus[0],
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          innerRef={formikRef}
        >
          {(props: any) => (
            <NewApplicationFormComponent
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

export default AddNewApplication;

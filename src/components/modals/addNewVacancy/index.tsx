import React, { createRef, useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import validationSchema from './validationSchema';
import { Box, Container } from '@mui/material';
import { IVacancy } from '../../../models/IVacancy';
import { useAppDispatch, useAppSelector } from './../../../hooks/redux';
import {
  createVacancy,
  reset,
} from '../../../store/reducers/vacancy/vacancySlice';
import { NewVacancyFormComponent } from './newVacancyFormComponents';
import ModalTitle from '../../ui/modalTitle';
import { closeCenterModal } from '../../../store/reducers/modal/modalSlice';

interface INewVacancyProps {
  status: number;
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
    message: 'Successfully created',
    type: 'success',
  },
  error: {
    message: 'Problem with creating, please try again later',
    type: 'error',
  },
};

const AddNewVacancy: React.FunctionComponent<INewVacancyProps> = ({
  status = 0,
}) => {
  const dispatch = useAppDispatch();
  const formikRef: any = createRef();
  const { isLoading, isError, isSuccess, error } = useAppSelector(
    (state) => state.vacancies
  );
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const onSubmit = (values: IVacancy, actions: FormikHelpers<IVacancy>) => {
    actions.setSubmitting(true);
    dispatch(createVacancy(values));
  };

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;
    if (isError) {
      formikCurrentRef.setSubmitting(false);
      setFormStatus({
        message: error,
        type: 'error',
      });
      dispatch(reset());
    }
    if (isSuccess) {
      setFormStatus(formStatusProps.success);
      formikCurrentRef.setSubmitting(false);
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
        <ModalTitle title={'Create vacancy application'} />
        <Formik
          initialValues={{
            jobTitle: '',
            companyName: '',
            vacancyLink: '',
            country: '',
            city: '',
            status: String(status),
            vacancyType: '',
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          innerRef={formikRef}
        >
          {(props: any) => (
            <NewVacancyFormComponent
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

export default AddNewVacancy;

import { useState, useEffect, createRef } from 'react';
import { Formik, FormikHelpers } from 'formik';
import validationSchema from './validationSchema';
import CourseFormComponent from './courseFormComponent';
import { Container, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ICourse } from '../../../models/ICourse';
import {
  createCourse,
  updateCourse,
  resetCourseStatus,
} from '../../../store/reducers/course/courseSlice';
import { IUpdateCourseBody } from '../../../store/reducers/course/courseSlice';
import { dataToFormData } from '../../../utils/dataToFormData';

export interface ICourseModalProps {
  courseData?: ICourse;
  type: 'update' | 'create';
  onSuccess: (type: string) => void;
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

const CourseModal = ({
  courseData,
  type = 'create',
  onSuccess,
}: ICourseModalProps) => {
  const dispatch = useAppDispatch();
  const formInitialValues =
    type === 'create'
      ? {
          title: '',
          type: '',
          icon: '',
        }
      : { title: courseData?.title || '', type: courseData?.type || '' };
  const formikRef: any = createRef();

  const { courseCreate, courseUpdate } = useAppSelector(
    (state) => state.courses
  );
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const statusType = type === 'create' ? 'courseCreate' : 'courseUpdate';
  const currentStatus =
    type === 'create' ? courseCreate.statuses : courseUpdate.statuses;
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const onSubmit = (
    values: ICourse | IUpdateCourseBody,
    actions: FormikHelpers<ICourse | IUpdateCourseBody>
  ) => {
    actions.setSubmitting(true);
    const data: FormData = dataToFormData(values);
    if (type === 'create') {
      dispatch(createCourse(data));
    } else {
      dispatch(updateCourse({ course: values, courseId: courseData?._id }));
    }
  };

  useEffect(() => {
    const formikCurrentRef = formikRef.current as any;

    if (currentStatus.isError) {
      setFormStatus({
        message: currentStatus.error,
        type: 'error',
      });

      formikCurrentRef.setSubmitting(false);
      dispatch(resetCourseStatus(statusType));
    }

    setDisplayFormStatus(true);
  }, [currentStatus, dispatch, formikRef, statusType]);

  useEffect(() => {
    if (currentStatus.isSuccess) {
      setFormStatus(formStatusProps.success);
      onSuccess(type);
    }
  }, [currentStatus, dispatch, onSuccess, type]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '500px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Formik
          initialValues={formInitialValues}
          onSubmit={onSubmit}
          innerRef={formikRef}
          encType="multipart/form-data"
          validationSchema={validationSchema}
        >
          {(props) => (
            <CourseFormComponent
              {...props}
              displayFormStatus={displayFormStatus}
              formStatus={formStatus}
              type={type}
            />
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default CourseModal;

import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { FormikProps, Form } from 'formik';
import React from 'react';
import type { IFormStatus } from './index';
import { IUserApplication } from './../../../models/IUserApplication';
import { useAppSelector } from '../../../hooks/redux';
import { ICourse } from './../../../models/ICourse';
import { englishLvl, technicalLvl } from '../../../helpers';

export interface INewUserApplicationFormComponentProps
  extends FormikProps<IUserApplication> {
  displayFormStatus: boolean;
  formStatus: IFormStatus;
}

export const NewApplicationFormComponent: React.FC<
  INewUserApplicationFormComponentProps
> = ({ displayFormStatus, formStatus, ...props }) => {
  const { courseList } = useAppSelector((state) => state.courses);
  const { values, errors, handleChange, isSubmitting } = props;
  return (
    <Form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
          width: {
            xl: '500px',
            lg: '500px',
            md: '500px',
            sm: '400px',
            xs: '250px',
          },
        }}
      >
        <FormControl error={errors.courseId ? true : false}>
          <InputLabel id="courseIdLabel">Course</InputLabel>
          <Select
            id="courseId"
            labelId="courseIdLabel"
            name="courseId"
            value={values.courseId}
            label="Course"
            onChange={handleChange}
            sx={{
              textAlign: 'left',
            }}
          >
            {courseList.courses.map((course: ICourse) => (
              <MenuItem
                key={course._id}
                value={course._id}
                selected={values.courseId === course._id}
              >
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl error={errors.englishLvl ? true : false}>
          <InputLabel id="englishLvlLabel">English lvl</InputLabel>

          <Select
            id="englishLvl"
            labelId="englishLvlLabel"
            name="englishLvl"
            value={values.englishLvl}
            label="English lvl"
            onChange={handleChange}
            sx={{
              textAlign: 'left',
            }}
          >
            {englishLvl.map((lvl: string) => (
              <MenuItem
                key={lvl}
                value={lvl}
                selected={values.englishLvl === lvl}
              >
                {lvl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl error={errors.technicalBackground ? true : false}>
          <InputLabel id="technicalBackgroundLabel">
            Technical background
          </InputLabel>

          <Select
            id="technicalBackground"
            labelId="technicalBackgroundLabel"
            name="technicalBackground"
            value={values.technicalBackground}
            label="Technical background"
            onChange={handleChange}
            sx={{
              textAlign: 'left',
            }}
          >
            {technicalLvl.map((lvl: string) => (
              <MenuItem
                key={lvl}
                value={lvl}
                selected={values.technicalBackground === lvl}
              >
                {lvl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Create
        </Button>

        {displayFormStatus && (
          <div className="formStatus">
            {formStatus.type === 'error' ? (
              <p>{formStatus.message}</p>
            ) : formStatus.type === 'success' ? (
              <p>{formStatus.message}</p>
            ) : null}
          </div>
        )}
      </Box>
    </Form>
  );
};

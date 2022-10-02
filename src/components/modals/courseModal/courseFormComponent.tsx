import React, { useState } from 'react';
import { Form, FormikProps } from 'formik';
import { AddPhotoAlternate, CancelOutlined, Title } from '@mui/icons-material';
import {
  InputAdornment,
  InputLabel,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  Fab,
  IconButton,
  Typography,
} from '@mui/material';
import { IFormStatus } from '.';
import StyledTextField from '../../ui/styledTextField';
import { courseTypes } from '../../../helpers/index';
import { ICourse } from '../../../models/ICourse';
import { COLORS } from '../../../helpers/theme';
import { IUpdateCourseBody } from './../../../store/reducers/course/courseSlice';

export interface ICourseFormComponentProps
  extends FormikProps<ICourse | IUpdateCourseBody> {
  displayFormStatus: boolean;
  formStatus: IFormStatus;
  type: string;
}

const CourseFormComponent: React.FC<ICourseFormComponentProps> = ({
  displayFormStatus,
  formStatus,
  setFieldValue,
  ...props
}) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    type,
  } = props;
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setFieldValue('icon', e.target.files[0]);
  };
  const handleFileClear = () => {
    setProfileImagePreview('');
    setFieldValue('icon', '');
  };
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
        <StyledTextField
          name="title"
          id="title"
          label="Title"
          value={values.title}
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Title />
              </InputAdornment>
            ),
          }}
          helperText={errors.title && touched.title ? errors.title : ' '}
          error={errors.title && touched.title ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormControl>
          <InputLabel id="typeLabel">Course Type</InputLabel>
          <Select
            id="type"
            labelId="typeLabel"
            name="type"
            value={values.type}
            label="Course Type"
            onChange={handleChange}
            sx={{
              textAlign: 'left',
            }}
          >
            {courseTypes.map((type) => (
              <MenuItem key={type} value={type} selected={values.type === type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {type === 'create' ? (
          <InputLabel htmlFor="file-input">
            {profileImagePreview ? (
              <Box
                sx={{
                  width: {
                    xl: '500px',
                    lg: '500px',
                    md: '500px',
                    sm: '400px',
                    xs: '250px',
                  },
                  height: '200px',
                  background: `center / contain no-repeat url("${profileImagePreview}")`,
                  position: 'relative',
                }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: '0px',
                    color: COLORS.danger,
                  }}
                  onClick={handleFileClear}
                >
                  <CancelOutlined />
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  width: {
                    xl: '500px',
                    lg: '500px',
                    md: '500px',
                    sm: '400px',
                    xs: '250px',
                  },
                  height: '200px',
                  border: `2px dashed ${COLORS.main}`,
                  backgroundColor: COLORS.lightGrey,
                  borderRadius: '8px',
                }}
              >
                <input
                  style={{ display: 'none' }}
                  type="file"
                  name="icon"
                  onChange={onFileChange}
                  id="file-input"
                  accept="image/*"
                />
                <Typography>
                  Add course icon
                  <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    style={{ marginLeft: 20 }}
                  >
                    <AddPhotoAlternate />
                  </Fab>
                </Typography>
              </Box>
            )}
          </InputLabel>
        ) : (
          ''
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
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

export default CourseFormComponent;

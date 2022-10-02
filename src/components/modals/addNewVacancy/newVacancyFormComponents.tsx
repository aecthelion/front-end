import { Flag, Link, LocationOn, Title } from '@mui/icons-material';
import {
  Box,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { FormikProps, Form } from 'formik';
import React from 'react';
import type { IFormStatus } from './index';
import StyledTextField from './../../ui/styledTextField/index';
import { IVacancy } from '../../../models/IVacancy';

export interface INewVacancyFormComponentProps extends FormikProps<IVacancy> {
  displayFormStatus: boolean;
  formStatus: IFormStatus;
}

export const NewVacancyFormComponent: React.FC<
  INewVacancyFormComponentProps
> = ({ displayFormStatus, formStatus, ...props }) => {
  const { values, touched, errors, handleBlur, handleChange, isSubmitting } =
    props;

  console.log(values);
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
          name="jobTitle"
          id="jobTitle"
          label="Job Title"
          value={values.jobTitle}
          helperText={
            errors.jobTitle && touched.jobTitle ? errors.jobTitle : ' '
          }
          error={errors.jobTitle && touched.jobTitle ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Title />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          name="companyName"
          id="companyName"
          label="Company Name"
          value={values.companyName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Title />
              </InputAdornment>
            ),
          }}
          helperText={
            errors.companyName && touched.companyName ? errors.companyName : ' '
          }
          error={errors.companyName && touched.companyName ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <StyledTextField
          name="vacancyLink"
          id="vacancyLink"
          label="Vacancy Link"
          value={values.vacancyLink}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Link />
              </InputAdornment>
            ),
          }}
          helperText={
            errors.vacancyLink && touched.vacancyLink ? errors.vacancyLink : ' '
          }
          error={errors.vacancyLink && touched.vacancyLink ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <StyledTextField
          name="country"
          id="country"
          label="Country"
          value={values.country}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Flag />
              </InputAdornment>
            ),
          }}
          helperText={errors.country && touched.country ? errors.country : ' '}
          error={errors.country && touched.country ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <StyledTextField
          name="city"
          id="city"
          label="city"
          value={values.city}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
          helperText={errors.city && touched.city ? errors.city : ' '}
          error={errors.city && touched.city ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormControl>
          <InputLabel id="vacancyTypeLabel">Vacancy type</InputLabel>
          <Select
            id="vacancyType"
            labelId="vacancyTypeLabel"
            name="vacancyType"
            value={values.vacancyType}
            label="Vacancy type"
            onChange={handleChange}
            sx={{
              textAlign: 'left',
            }}
          >
            <MenuItem
              value={'Remote'}
              selected={values.vacancyType === 'Remote'}
            >
              Remote
            </MenuItem>
            <MenuItem
              value={'Office'}
              selected={values.vacancyType === 'Remote'}
            >
              Office
            </MenuItem>
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

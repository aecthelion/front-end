import React from 'react';
import { Form, FormikProps } from 'formik';
import { AccountCircle, EmailRounded, LockRounded } from '@mui/icons-material';
import {
  InputAdornment,
  InputLabel,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { IUserUpdateModal, IFormStatus } from '.';
import StyledTextField from '../../ui/styledTextField';
import { roles } from '../../../helpers';

export interface ISignUpFormComponentProps
  extends FormikProps<IUserUpdateModal> {
  displayFormStatus: boolean;
  formStatus: IFormStatus;
}

const SignUpFormComponent: React.FC<ISignUpFormComponentProps> = ({
  displayFormStatus,
  formStatus,
  setFieldValue,
  ...props
}) => {
  const { values, touched, errors, handleBlur, handleChange, isSubmitting } =
    props;

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
          name="firstName"
          id="firstName"
          label="First Name"
          value={values.firstName}
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          helperText={
            errors.firstName && touched.firstName ? errors.firstName : ' '
          }
          error={errors.firstName && touched.firstName ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <StyledTextField
          name="lastName"
          id="lastName"
          label="Last Name"
          value={values.lastName}
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          helperText={
            errors.lastName && touched.lastName ? errors.lastName : ' '
          }
          error={errors.lastName && touched.lastName ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <StyledTextField
          name="email"
          id="email"
          label="Email"
          value={values.email}
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRounded />
              </InputAdornment>
            ),
          }}
          helperText={errors.email && touched.email ? errors.email : ' '}
          error={errors.email && touched.email ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <StyledTextField
          name="password"
          id="password"
          label="Password"
          value={values.password}
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRounded />
              </InputAdornment>
            ),
          }}
          helperText={
            errors.password && touched.password
              ? 'Please valid password. One uppercase, one number, one lowercase, one special character and no spaces'
              : ' '
          }
          error={errors.password && touched.password ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <StyledTextField
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm password"
          value={values.confirmPassword}
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRounded />
              </InputAdornment>
            ),
          }}
          helperText={
            errors.confirmPassword && touched.confirmPassword
              ? errors.confirmPassword
              : ' '
          }
          error={
            errors.confirmPassword && touched.confirmPassword ? true : false
          }
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormControl>
          <InputLabel id="roleLabel">User role</InputLabel>
          <Select
            id="role"
            labelId="roleLabel"
            name="role"
            value={values.role}
            label="User Role"
            onChange={handleChange}
            sx={{
              textAlign: 'left',
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role} selected={values.role === role}>
                {role}
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
          Update
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

export default SignUpFormComponent;

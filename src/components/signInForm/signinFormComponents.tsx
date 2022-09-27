import { EmailRounded, LockRounded } from "@mui/icons-material";
import { Box, InputAdornment, Button } from "@mui/material";
import { FormikProps, Form } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import StyledTextField from "../ui/styledTextField";
import type { ISignInForm, IFormStatus } from "./index";

export interface ILoginFormComponentProps extends FormikProps<ISignInForm> {
  displayFormStatus: boolean;
  formStatus: IFormStatus;
}

export const SignInFormComponent: React.FC<ILoginFormComponentProps> = ({
  displayFormStatus,
  formStatus,
  ...props
}) => {
  const { values, touched, errors, handleBlur, handleChange, isSubmitting } =
    props;
  return (
    <Form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          width: {
            xl: "500px",
            lg: "500px",
            md: "500px",
            sm: "400px",
            xs: "250px",
          },
        }}
      >
        <StyledTextField
          name="email"
          id="email"
          label="Email"
          value={values.email}
          type="email"
          helperText={errors.email && touched.email ? errors.email : " "}
          error={errors.email && touched.email ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRounded />
              </InputAdornment>
            ),
          }}
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
              ? "Please valid password. One uppercase, one lowercase, one number, one special character and no spaces"
              : " "
          }
          error={errors.password && touched.password ? true : false}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          type="button"
          variant="outlined"
        >
          Don&apos;t have account yet?
        </Button>
        {displayFormStatus && (
          <div className="formStatus">
            {formStatus.type === "error" ? (
              <p>{formStatus.message}</p>
            ) : formStatus.type === "success" ? (
              <p>{formStatus.message}</p>
            ) : null}
          </div>
        )}
      </Box>
    </Form>
  );
};

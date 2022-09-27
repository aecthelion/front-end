import React, { useState } from "react";
import { Form, FormikProps } from "formik";
import {
  AccountCircle,
  AddPhotoAlternate,
  CancelOutlined,
  EmailRounded,
  LockRounded,
} from "@mui/icons-material";
import {
  InputAdornment,
  InputLabel,
  Typography,
  Fab,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { ISignUpForm, IFormStatus } from ".";
import StyledTextField from "../ui/styledTextField";
import { COLORS } from "../../helpers/theme";

export interface ISignUpFormComponentProps extends FormikProps<ISignUpForm> {
  displayFormStatus: boolean;
  formStatus: IFormStatus;
}

const SignUpFormComponent: React.FC<ISignUpFormComponentProps> = ({
  displayFormStatus,
  formStatus,
  setFieldValue,
  ...props
}) => {
  const [profileImagePreview, setProfileImagePreview] = useState("");
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
    setFieldValue("avatar", e.target.files[0]);
  };
  const handleFileClear = () => {
    setProfileImagePreview("");
    setFieldValue("avatar", "");
  };
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
            errors.firstName && touched.firstName ? errors.firstName : " "
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
            errors.lastName && touched.lastName ? errors.lastName : " "
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
          helperText={errors.email && touched.email ? errors.email : " "}
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
              ? "Please valid password. One uppercase, one number, one lowercase, one special character and no spaces"
              : " "
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
              : " "
          }
          error={
            errors.confirmPassword && touched.confirmPassword ? true : false
          }
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputLabel htmlFor="file-input">
          {profileImagePreview ? (
            <Box
              sx={{
                width: {
                  xl: "500px",
                  lg: "500px",
                  md: "500px",
                  sm: "400px",
                  xs: "250px",
                },
                height: "200px",
                background: `center / contain no-repeat url("${profileImagePreview}")`,
                position: "relative",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  right: "0px",
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                width: {
                  xl: "500px",
                  lg: "500px",
                  md: "500px",
                  sm: "400px",
                  xs: "250px",
                },
                height: "200px",
                border: `2px dashed ${COLORS.main}`,
                backgroundColor: COLORS.lightGrey,
                borderRadius: "8px",
              }}
            >
              <input
                style={{ display: "none" }}
                type="file"
                name="avatar"
                onChange={onFileChange}
                id="file-input"
                accept="image/*"
              />
              <Typography>
                Add profile avatar
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

export default SignUpFormComponent;

import React, { createRef, useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
import validationSchema from "./validationSchema";
import { SignInFormComponent } from "./signinFormComponents";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import AuthSideTitle from "../ui/authSideTitle";
import {useAppDispatch, useAppSelector} from "../../hooks/redutx";
import {loginUser} from "../../store/reducers/auth/actionCreators";

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
    message: "Login successful",
    type: "success",
  },
  error: {
    message: "Enter correct login data",
    type: "error",
  },
};

const SignInForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const formikRef: any = createRef();
  const { user, isLoading, error} = useAppSelector(
    state => state.authReducer
  );
  console.log(error, user,)
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
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
    if (error) {
      formikCurrentRef.setSubmitting(false);
      setFormStatus(formStatusProps.error);
    }
    if (user) {
      setFormStatus(formStatusProps.success);
      formikCurrentRef.setSubmitting(false);
      navigate("/");
    }
    setDisplayFormStatus(true);
  }, [
    user,
    error,
    navigate,
    dispatch,
    formikRef,
  ]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <AuthSideTitle title="rock" spanTitle="it" leftPosition="-95px" />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          innerRef={formikRef}
        >
          {(props) => (
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

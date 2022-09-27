import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import SignInForm from "../../components/signInForm";
import SignUpForm from "./../../components/signUpForm/index";

const AuthPage: React.FC = () => {
  const { pathname } = useLocation();
  const showRegistration = pathname === "/register";
  return <Box>{showRegistration ? <SignUpForm /> : <SignInForm />}</Box>;
};

export default AuthPage;

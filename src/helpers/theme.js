import { createTheme } from "@mui/material";

export const COLORS = {
  main: "#3b757e",
  secondaryMain: "#1181B2",
  dark: "#000",
  darkGray: "#373833",
  light: "#fff",
  lightGrey: "#F5F5F5",
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.main,
      dark: COLORS.dark,
      light: COLORS.light,
    },
    secondary: {
      main: COLORS.secondaryMain,
      light: COLORS.lightGrey,
    },
  },
});

export default theme;

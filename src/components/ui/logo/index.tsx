import React from "react";
import { Typography } from "@mui/material";
import { COLORS } from "../../../helpers/theme";

interface ILogo {
  type: string;
}

const Logo = ({ type = "dark" }: ILogo) => {
  return (
    <Typography
      variant="h3"
      sx={{
        color: `primary.${type}`,
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "2rem",
      }}
    >
      Rock<span style={{ color: COLORS.main }}>IT</span>
    </Typography>
  );
};

export default Logo;

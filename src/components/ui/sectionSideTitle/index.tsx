import { Typography } from "@mui/material";
import React from "react";
import { COLORS } from "./../../../helpers/theme";

interface ISectionSideTitle {
  title: string;
}

const SectionSideTitle = ({ title }: ISectionSideTitle) => {
  return (
    <Typography
      sx={{
        fontSize: "1rem",
        writingMode: "tb-rl",
        transform: "rotate(-180deg)",
        fontWeight: "bold",
        textTransform: "uppercase",
        position: "absolute",
        top: "40px",
        color: COLORS.main,
        height: "230px",
        textAlign: "end",
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionSideTitle;

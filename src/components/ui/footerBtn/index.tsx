import { Button } from "@mui/material";
import React from "react";

interface IFooterBtn {
  text: string;
  size: string;
}

const FooterBtn = ({ text, size = "normal" }: IFooterBtn) => {
  return (
    <Button
      sx={{
        width: `${size === "normal" ? "118px" : "220px"}`,
        backgroundColor: "primary.light",
        color: "primary.dark",
        fontWeight: "bold",
        fontSize: "1.1rem",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "primary.light",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default FooterBtn;

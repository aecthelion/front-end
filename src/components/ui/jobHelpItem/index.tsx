import React from "react";
import { Box } from "@mui/material";
import SectionSubTitle from "../sectionSubTitle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";

interface IJobHelpItem {
  title: string;
  infoText: string;
  iconType: string;
}

const JobHelpItem = ({ title, infoText, iconType }: IJobHelpItem) => {
  const renderIcon = () => {
    if (iconType === "person") {
      return <AssignmentIndIcon />;
    } else if (iconType === "cv") {
      return <DescriptionIcon />;
    } else return <HelpIcon />;
  };
  return (
    <Box
      sx={{
        maxWidth: {
          xl: "400px",
          lg: "400px",
          md: "100%",
          sm: "100%",
          xs: "100%",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "primary.main",
          color: "primary.light",
          padding: "5px",
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        {renderIcon()}
      </Box>
      <Box
        sx={{
          height: {
            xl: "50px",
            lg: "50px",
            md: "20px",
            sm: "20px",
            xs: "fit-content",
          },
          marginBottom: {
            xl: "25px",
            lg: "25px",
            md: "15px",
            sm: "10px",
            xs: "10px",
          },
        }}
      >
        <SectionSubTitle title={title} />
      </Box>
      <Box
        sx={{
          fontSize: {
            xl: "1rem",
            lg: "1rem",
            md: "0.9rem",
            sm: "0.8rem",
            xs: "0.8rem",
          },
          opacity: 0.7,
          lineHeight: "25px",
          marginTop: "15px",
        }}
      >
        {infoText}
      </Box>
    </Box>
  );
};

export default JobHelpItem;

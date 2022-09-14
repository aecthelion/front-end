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
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "primary.main",
          color: "primary.light",
          width: "fit-content",
          padding: "5px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        {renderIcon()}
      </Box>
      <SectionSubTitle title={title} />
      <Box
        sx={{
          fontSize: "1rem",
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

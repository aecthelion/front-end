import { Typography } from "@mui/material";

interface ISectionSubTitle {
  title: string;
}

const SectionSubTitle = ({ title }: ISectionSubTitle) => {
  return (
    <Typography
      sx={{
        fontWeight: "700",
        fontSize: {
          xl: "1.4rem",
          lg: "1.2rem",
          md: "1.1rem",
          sm: "1rem",
          sx: "1rem",
        },
        opacity: 0.7,
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionSubTitle;

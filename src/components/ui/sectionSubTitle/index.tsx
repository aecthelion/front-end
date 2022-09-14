import { Typography } from "@mui/material";

interface ISectionSubTitle {
  title: string;
}

const SectionSubTitle = ({ title }: ISectionSubTitle) => {
  return (
    <Typography sx={{ fontWeight: "700", fontSize: "1.4rem", opacity: 0.7 }}>
      {title}
    </Typography>
  );
};

export default SectionSubTitle;

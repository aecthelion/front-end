import { Box } from "@mui/material";
import MainButton from "../mainButton";

interface ICourse {
  courseTitle: string;
  courseStack: string;
}

const Course = ({ courseTitle, courseStack }: ICourse) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "40px",
        alignItems: "end",
        minWidth: {
          xl: "700px",
          lg: "600px",
          md: "450px",
          sm: "450px",
          xs: "280px",
        },
        width: "100%",
        flexWrap: {
          xl: "nowrap",
          lg: "nowrap",
          md: "nowrap",
          sm: "wrap",
          xs: "wrap",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            fontSize: {
              xl: "2.5rem",
              lg: "2rem",
              md: "2rem",
              sm: "1.2rem",
              xs: "1rem",
            },
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {courseTitle}
        </Box>
        <Box
          sx={{
            fontSize: {
              xl: "1rem",
              lg: "1rem",
              md: "1rem",
              sm: "1rem",
              xs: "0.8rem",
            },
            maxWidth: {
              xl: "360px",
              lg: "360px",
              md: "360px",
              sm: "320px",
              xs: "320px",
            },
          }}
        >
          {courseStack}
        </Box>
      </Box>

      <Box sx={{ marginLeft: "auto" }}>
        <MainButton text="Детальніше" adornment={null} onClick={() => null} />
      </Box>
    </Box>
  );
};

export default Course;

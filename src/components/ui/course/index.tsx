import { Box, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
      }}
    >
      <Box
        sx={{
          width: "300px",
        }}
      >
        <Box
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {courseTitle}
        </Box>
        <Box>{courseStack}</Box>
      </Box>
      <MainButton text="Детальніше" adornment={null} onClick={() => null} />
    </Box>
  );
};

export default Course;

import { Box } from "@mui/material";
import { COLORS } from "../../../helpers/theme";

interface ISectionTitle {
  title?: string;
  spanText?: string;
  type?: string;
  color?: string;
  mainColor?: string;
}
const SectionTitle = ({
  title,
  spanText,
  type = "default",
  mainColor = "default",
}: ISectionTitle) => {
  return (
    <Box
      sx={{
        color: mainColor === "default" ? COLORS.dark : COLORS.light,
        fontWeight: "bold",
        fontSize: {
          xl: "2.5rem",
          lg: "2rem",
          md: "2rem",
          sm: "1.5rem",
          xs: "1.2rem",
        },
        minWidth: {
          xl: "500px",
          lg: "500px",
          md: "300px",
          sm: "350px",
          xs: "280px",
        },
        textTransform: "uppercase",
      }}
    >
      {type === "reverse" ? (
        <>
          <span style={{ color: COLORS.main }}>{spanText}</span>
          {title}
        </>
      ) : (
        <>
          {title}
          <span style={{ color: COLORS.main }}>{spanText}</span>
        </>
      )}
    </Box>
  );
};

export default SectionTitle;

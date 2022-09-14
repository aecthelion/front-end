import { Box } from "@mui/material";
import { COLORS } from "../../../helpers/theme";

interface ISectionTitle {
  title: string;
  spanText: string;
  type: string;
}
const SectionTitle = ({ title, spanText, type = "default" }: ISectionTitle) => {
  return (
    <Box
      sx={{
        fontWeight: "bold",
        fontSize: "2.5rem",
        width: "500px",
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

import { Box } from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

interface ISectionText {
  text: string;
  type: string;
}

const SectionText = ({ text, type = "default" }: ISectionText) => {
  return (
    <Box
      display="flex"
      sx={{
        gap: "7px",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "350px",
        marginBottom: "10px",
      }}
    >
      {type === "default" ? (
        <PercentIcon fontSize="large" sx={{ color: "primary.main" }} />
      ) : type === "price" ? (
        <AttachMoneyIcon fontSize="large" sx={{ color: "primary.main" }} />
      ) : type === "time" ? (
        <AccessTimeIcon fontSize="large" sx={{ color: "primary.main" }} />
      ) : (
        <PlayCircleOutlineIcon
          fontSize="large"
          sx={{ color: "primary.main" }}
        />
      )}
      <Box sx={{ fontWeight: "bold" }}>{text}</Box>
    </Box>
  );
};

export default SectionText;

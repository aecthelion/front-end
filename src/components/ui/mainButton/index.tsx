import { Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface IMainButton {
  text: string;
  adornment: JSX.Element | null;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const MainButton = ({ text, adornment, onClick }: IMainButton) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        height: "40px",
        minWidth: "142px",
        backgroundColor: "primary.dark",
        textTransform: "none",
        fontWeight: "bold",
      }}
    >
      {text}
      {adornment || <KeyboardArrowRightIcon />}
    </Button>
  );
};

export default MainButton;

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
        minWidth: {
          xl: "142px",
          lg: "142px",
          md: "120px",
          sm: "120px",
          xs: "120px",
        },
        backgroundColor: "primary.dark",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: {
          md: "0.7rem",
          sm: "0.7rem",
          xs: "0.7rem",
        },
      }}
    >
      {text}
      {adornment || <KeyboardArrowRightIcon />}
    </Button>
  );
};

export default MainButton;

import { Typography } from "@mui/material";
import { COLORS } from "./../../../helpers/theme";

interface IAuthSideTitle {
  title: string;
  spanTitle: string;
  leftPosition: string;
}

const AuthSideTitle = ({ title, spanTitle, leftPosition }: IAuthSideTitle) => {
  return (
    <Typography
      variant="h3"
      sx={{
        color: `primary.dark`,
        fontWeight: "bold",
        fontSize: "4.7rem",
        writingMode: "tb-rl",
        transform: "rotate(-180deg)",
        textTransform: "uppercase",
        position: "absolute",
        left: leftPosition,
        top: "0px",
      }}
    >
      {title}
      <span style={{ color: COLORS.main }}>{spanTitle}</span>
    </Typography>
  );
};

export default AuthSideTitle;

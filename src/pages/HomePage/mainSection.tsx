import { Typography, Box } from "@mui/material";
import { Typewriter } from "react-simple-typewriter";
import CustomParticles from "../../components/ui/particles";
import { COLORS } from "../../helpers/theme";

const MainSection = () => {
  return (
    <section>
      <Box
        sx={{
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          width: "100%",
          position: "relative",
        }}
      >
        <CustomParticles />
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "30px",
          }}
        >
          Онлайн академія <Box sx={{ color: "primary.main" }}>іт професій</Box>
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeigth: "bold", textTransform: "uppercase" }}
        >
          Твій шлях в{" "}
          <Typewriter
            words={["ІТ", "нове життя", "майбутнє"]}
            loop={5}
            cursor
            cursorStyle="_"
            cursorColor={COLORS.secondaryMain}
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={4000}
          />
        </Typography>
      </Box>
    </section>
  );
};

export default MainSection;

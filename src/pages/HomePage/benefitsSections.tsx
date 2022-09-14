import { Grid, Typography, Divider, Box } from "@mui/material";
import FadeIn from "../../components/ui/fadeIn";

const BenefitsSection = () => {
  return (
    <section>
      <FadeIn type="slide">
        <Box sx={{ opacity: 0.5 }}>
          <Grid container sx={{ alignItems: "center", marginBottom: "15px" }}>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                20% теорії
              </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                100% онлайн
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                власний темп
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ alignItems: "center", fontSize: "1.2rem" }}>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                80% практики
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                кейси з реальних проектів
              </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                підтримка ментора
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />
      </FadeIn>
    </section>
  );
};

export default BenefitsSection;

import { Grid, Box } from "@mui/material";
import SectionContainer from "../../components/sectionContainer";
import FadeIn from "../../components/ui/fadeIn";
import SalaryGrow from "../../components/ui/salaryGrow";
import SectionTitle from "../../components/ui/sectionTitle";

const SalarySection = () => {
  return (
    <FadeIn type="default">
      <SectionContainer sideTitle="Що вас очікує">
        <Grid item xs={11} sx={{}}>
          <Box marginBottom={"20px"}>
            <SectionTitle
              title="У ПЕРШІ 2 РОКИ ПРАЦІ"
              spanText="СЕРЕДНЯ ЗАРОБІТНЯ ПЛАТА В IT "
              type="reverse"
            />
          </Box>
        </Grid>
        <Grid item xs={11} sx={{}}>
          <Grid
            container
            sx={{ alignItems: "flex-end", justifyContent: "center" }}
          >
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <SalaryGrow salary="700" />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <SalaryGrow salary="1300" />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <SalaryGrow salary="1700" />
            </Grid>
          </Grid>
        </Grid>
      </SectionContainer>
    </FadeIn>
  );
};

export default SalarySection;

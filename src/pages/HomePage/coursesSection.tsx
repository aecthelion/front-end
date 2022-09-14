import { Grid, Box } from "@mui/material";
import SectionContainer from "../../components/sectionContainer";
import Course from "../../components/ui/course";

import SectionText from "../../components/ui/sectionText";
import SectionTitle from "../../components/ui/sectionTitle";

const CoursesSection = () => (
  <SectionContainer sideTitle="Курси">
    <Grid item xs={5} sx={{}}>
      <Box marginBottom={"20px"}>
        <SectionTitle title="навчання " spanText="у власному режимі" type="" />
      </Box>
      <SectionText text="Вільний графік навчання" type="time" />
      <SectionText text="Фіксована ціна" type="price" />
      <SectionText text="Навчайся одразу після оплати" type="start" />
    </Grid>
    <Grid
      item
      xs={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <Course
        courseTitle="КУРС FRONTEND"
        courseStack="HTML/CSS, Javascript, React/Redux, Algorithms"
      />
      <Course
        courseTitle="КУРС QA"
        courseStack="Test documentation, Jira, TestRail, HTTPS, Postman, Mobile testing, SQL, Git, Javascript, Cypress"
      />
    </Grid>
  </SectionContainer>
);

export default CoursesSection;

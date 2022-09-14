import { Grid } from "@mui/material";
import SectionSideTitle from "../ui/sectionSideTitle";

interface ISectionContainer {
  sideTitle: string;
  children: JSX.Element[] | JSX.Element;
}

const SectionContainer = ({ sideTitle, children }: ISectionContainer) => {
  return (
    <section>
      <Grid
        container
        spacing={4}
        sx={{ margin: "50px 0", position: "relative" }}
      >
        <Grid item xs={1}>
          <SectionSideTitle title={sideTitle} />
        </Grid>

        {children}
      </Grid>
    </section>
  );
};

export default SectionContainer;

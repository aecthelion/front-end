import { Grid, Box } from "@mui/material";
import SectionSideTitle from "../ui/sectionSideTitle";

interface ISectionContainer {
  sideTitle: string;
  children: JSX.Element[] | JSX.Element;
}

const SectionContainer = ({ sideTitle, children }: ISectionContainer) => {
  return (
    <section>
      <Box
        sx={{
          margin: "50px 0",
          position: "relative",

          paddingLeft: "30px",
        }}
      >
        <Box sx={{ position: "absolute", left: "-20px" }}>
          <SectionSideTitle title={sideTitle} />
        </Box>

        {children}
      </Box>
    </section>
  );
};

export default SectionContainer;

import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import AnimatedCounter from "../animatedCounter";

interface ISalaryGrow {
  salary: string;
}

const SalaryGrow = ({ salary }: ISalaryGrow) => {
  const [height, setHeight] = useState<number | "auto">(0);
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      setHeight("auto");
    }
  }, [inView]);

  return (
    <Box
      sx={{
        width: {
          xl: "350px",
          lg: "350px",
          md: "200px",
          sm: "120px",
          xs: "100px",
        },
      }}
      ref={ref}
    >
      <AnimatedCounter from={0} to={Number(salary)} InView={inView} />
      <AnimateHeight id="example-panel" duration={4000} height={height}>
        <Box
          sx={{
            height: `${
              salary === "700" ? "100" : salary === "1300" ? "185" : "242"
            }px`,
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
            backgroundColor: "primary.main",
            opacity: salary === "700" ? 0.5 : salary === "1300" ? 0.7 : 1,
            marginBottom: "20px",
          }}
        />
      </AnimateHeight>
      <Box
        sx={{
          fontSize: {
            xl: "1.5rem",
            lg: "1.2rem",
            md: "1rem",
            sm: "1rem",
            xs: "0.8rem",
          },
          textAlign: "center",

          opacity: 0.5,
          height: "30px",
        }}
      >
        {salary === "700"
          ? "Початок кар'єри"
          : salary === "1300"
          ? "1 - 1.5 роки досвіду"
          : "2+ роки досвіду"}
      </Box>
    </Box>
  );
};

export default SalaryGrow;

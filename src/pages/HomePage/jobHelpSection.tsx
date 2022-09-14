import { Paper, Collapse, Box, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import MainButton from "../../components/ui/mainButton";
import JobHelpItem from "../../components/ui/jobHelpItem";

const JobHelpSection = () => {
  const [isHelpInfoVisible, setIsHelpInfoVisible] = React.useState(false);

  const jobSectionText = [
    {
      title: "Регулярні тестові співбесіди зі зворотнім зв’язком",
      infoText:
        "Ти перестанеш боятися співбесід і будеш готовий відповідати на технічні питання і показати свій високий рівень професійної підготовки",
      iconType: "person",
    },
    {
      title: "Навчальний модуль по працевлаштуванню",
      infoText:
        "Модуль по підготовці свого резюме, супровідного листа і робочих профілів. В IT зустрічають по CV. Твої профілі і матеріали будуть зрозумілі для рекрутерів",
      iconType: "cv",
    },
    {
      title: "Допомога координаторів",
      infoText:
        "Наші досвідчені координатори допоможуть тобі на цьому шляху, підкажуть чи ти йдеш у правильному напрямку і допоможуть оцінити пропозиції роботодавців та сформувати свої зарплатні очікування згідно ситуації на ринку",
      iconType: "help",
    },
  ];

  const handleInfoClick = () => setIsHelpInfoVisible((prev) => !prev);
  return (
    <section>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          height: "144px",
          padding: "50px",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            fontSize: "2rem",
            textTransform: "upperCase",
            color: "primary.light",
          }}
        >
          Допомога з працевлаштуванням
        </Box>
        <MainButton
          text={isHelpInfoVisible ? "Приховати" : "Показати"}
          adornment={
            isHelpInfoVisible ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )
          }
          onClick={handleInfoClick}
        />
      </Paper>
      <Collapse in={isHelpInfoVisible}>
        <Grid
          container
          justifyContent="center"
          sx={{
            alignItems: "center",
            backgroundColor: "secondary.light",
            position: "relative",
            minHeight: "315px",
            padding: "40px",
            overflow: "hidden",

            "::before": {
              content: "''",
              position: "absolute",
              top: "-10px",
              height: "10px",
              width: "100%",
              zIndex: "-2",
              backgroundColor: "secondary.light",
            },
          }}
        >
          {jobSectionText.map((s, i) => (
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <JobHelpItem
                title={s.title}
                infoText={s.infoText}
                iconType={s.iconType}
                key={i}
              />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </section>
  );
};

export default JobHelpSection;

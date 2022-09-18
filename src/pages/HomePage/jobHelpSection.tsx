import { Paper, Collapse, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import MainButton from "../../components/ui/mainButton";
import JobHelpItem from "../../components/ui/jobHelpItem";
import SectionTitle from "./../../components/ui/sectionTitle/index";

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
          padding: {
            xl: "50px",
            lg: "50px",
            md: "30px",
            sm: "20px",
            xs: "20px",
          },
          borderRadius: "8px",
          flexWrap: {
            xl: "nowrap",
            lg: "nowrap",
            md: "nowrap",
            sm: "wrap",
            xs: "wrap",
          },
        }}
      >
        <SectionTitle title="Допомога з працевлаштуванням" mainColor="light" />

        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
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
        </Box>
      </Paper>
      <Collapse in={isHelpInfoVisible}>
        <Box
          sx={{
            backgroundColor: "secondary.light",
            position: "relative",
            minHeight: "315px",
            padding: "40px",
            overflow: "hidden",
            alignItems: "flex-start",
            justifyContent: "center",
            display: "flex",
            gap: "40px",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            },

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
            <JobHelpItem
              title={s.title}
              infoText={s.infoText}
              iconType={s.iconType}
              key={i}
            />
          ))}
        </Box>
      </Collapse>
    </section>
  );
};

export default JobHelpSection;

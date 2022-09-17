import { Collapse, Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionSubTitle from "../sectionSubTitle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IQuestionItem {
  questionTitle: string;
  questionText: string;
}

const QuestionItem = ({ questionTitle, questionText }: IQuestionItem) => {
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const [rotate, setRotate] = useState(0);
  const x = 0;
  const y = 0;

  const handleOpen = () => {
    setIsDetailsShown((prev) => !prev);
    setRotate((prev) => (prev === 180 ? 0 : 180));
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Divider />
      <Box sx={{ padding: "20px 0" }}>
        <Box
          onClick={handleOpen}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SectionSubTitle title={questionTitle} />

          <motion.div
            animate={{ x, y, rotate }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <Box sx={{ width: "30px" }}>
              <ExpandMoreIcon fontSize="large" />
            </Box>
          </motion.div>
        </Box>
        <Collapse in={isDetailsShown}>
          <Typography
            sx={{
              lineHeight: "15px",
              whiteSpace: "pre-line",
              marginTop: "20px",
              fontSize: {
                xl: "1rem",
                lg: "1rem",
                md: "1rem",
                sm: "0.9rem",
                xs: "0.8rem",
              },
            }}
          >
            {questionText}
          </Typography>
        </Collapse>
      </Box>
      <Divider />
    </Box>
  );
};

export default QuestionItem;

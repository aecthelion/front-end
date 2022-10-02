import { Box } from '@mui/material';
import SectionContainer from '../../components/sectionContainer';
import Course from '../../components/ui/course';

import SectionText from '../../components/ui/sectionText';
import SectionTitle from '../../components/ui/sectionTitle';

const CoursesSection = () => (
  <SectionContainer sideTitle="Курси">
    <Box
      sx={{
        display: 'flex',
        flexWrap: {
          xl: 'nowrap',
          lg: 'nowrap',
          md: 'nowrap',
          sm: 'wrap',
          xs: 'wrap',
        },
        justifyContent: 'space-between',
        gap: '50px',
      }}
    >
      <Box sx={{ maxWidth: '550px' }}>
        <Box marginBottom={'20px'}>
          <SectionTitle
            title="навчання "
            spanText="у власному режимі"
            type=""
          />
        </Box>
        <SectionText text="Вільний графік навчання" type="time" />
        <SectionText text="Фіксована ціна" type="price" />
        <SectionText text="Навчайся одразу після оплати" type="start" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '50px',
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
      </Box>
    </Box>
  </SectionContainer>
);

export default CoursesSection;

import { Box } from '@mui/material';
import SectionContainer from '../../components/sectionContainer';
import FadeIn from '../../components/ui/fadeIn';
import SalaryGrow from '../../components/ui/salaryGrow';
import SectionTitle from '../../components/ui/sectionTitle';

const SalarySection = () => {
  return (
    <FadeIn type="default">
      <SectionContainer sideTitle="Що вас очікує">
        <Box>
          <Box marginBottom={'20px'}>
            <SectionTitle
              title="У ПЕРШІ 2 РОКИ ПРАЦІ"
              spanText="СЕРЕДНЯ ЗАРОБІТНЯ ПЛАТА В IT "
              type="reverse"
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',

              gap: '0px',
            }}
          >
            <SalaryGrow salary="700" />

            <SalaryGrow salary="1300" />

            <SalaryGrow salary="1700" />
          </Box>
        </Box>
      </SectionContainer>
    </FadeIn>
  );
};

export default SalarySection;

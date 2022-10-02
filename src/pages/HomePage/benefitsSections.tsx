import { Typography, Divider, Box } from '@mui/material';
import FadeIn from '../../components/ui/fadeIn';

const BenefitsSection = () => {
  const benefitsText = [
    '20% теорії',
    '100% онлайн',
    'власний темп',
    '80% практики',
    'кейси з реальних проектів',
    'підтримка ментора',
  ];
  return (
    <section>
      <FadeIn type="slide">
        <Box
          sx={{
            opacity: 0.5,
            display: 'flex',
            gap: '10px',
            justifyContent: {
              xl: 'space-between',
              lg: 'space-between',
              md: 'space-between',
              sm: 'center',
              xs: 'center',
            },
            margin: '20px 0',
            flexWrap: {
              xl: 'nowrap',
              lg: 'nowrap',
              md: 'wrap',
              sm: 'wrap',
              xs: 'wrap',
            },
          }}
        >
          {benefitsText.map((t) => (
            <Typography
              key={t}
              sx={{
                fontWeight: 'bold',
                fontSize: {
                  xl: '1.2rem',
                  lg: '1.2rem',
                  md: '1rem',
                  sm: '1rem',
                  xs: '0.7rem',
                },
              }}
            >
              {t}
            </Typography>
          ))}
        </Box>

        <Divider />
      </FadeIn>
    </section>
  );
};

export default BenefitsSection;

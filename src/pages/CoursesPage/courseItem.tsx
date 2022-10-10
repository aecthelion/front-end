import { Box, Button, Paper, Typography } from '@mui/material';
import { Article, Cancel, Pending, Recommend } from '@mui/icons-material';
import { ICourse } from './../../models/ICourse';
import { mainUrl } from './../../helpers/index';
import { IUserApplication } from './../../models/IUserApplication';
import { COLORS } from './../../helpers/theme';

interface ICourseItemProps {
  course: ICourse;
  application: IUserApplication | undefined;
}

const CourseItem = ({ course, application }: ICourseItemProps) => {
  return (
    <Button
      sx={{
        borderRadius: '12px',
        padding: '5px',
      }}
    >
      <Paper
        sx={{
          width: {
            xl: '400px',
            lg: '400px',
            md: '300px',
            sm: '300px',
            xs: '170px',
          },
          height: '150px',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          '&:hover': {
            backgroundColor: 'rgba(59,117,126, 0.5)',
            transition: 'background-color 500ms linear',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              height: '50px',
              width: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'secondary.light',
              borderRadius: '50%',
            }}
          >
            {course.icon ? (
              <Box
                sx={{
                  width: '35px',
                  height: '35px',
                  background: `center / contain no-repeat url("${mainUrl}${course.icon}")`,
                  borderRadius: '50%',
                }}
              />
            ) : (
              <Article />
            )}
          </Box>
          <Typography
            sx={{
              color: 'primary.dark',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              maxWidth: {
                xl: '260px',
                lg: '260px',
                md: '240px',
                sm: '240px',
                xs: '120px',
              },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {course.title}
          </Typography>
        </Box>
        {application && application.status && (
          <Box
            sx={{
              marginTop: 'auto',
              marginLeft: 'auto',
            }}
          >
            {application.status === 'pending' ? (
              <Pending fontSize="large" sx={{ color: COLORS.waring }} />
            ) : application.status === 'rejected' ? (
              <Cancel fontSize="large" sx={{ color: COLORS.danger }} />
            ) : (
              <Recommend fontSize="large" color="primary" />
            )}
          </Box>
        )}
      </Paper>
    </Button>
  );
};

export default CourseItem;

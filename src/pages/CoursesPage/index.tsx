import { Box, Button, LinearProgress, Pagination } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import Layout from '../../layout';
import CourseItem from './courseItem';
import { useEffect } from 'react';
import { useAppDispatch } from './../../hooks/redux';
import {
  changeCoursePage,
  getCourses,
} from './../../store/reducers/course/courseSlice';
import { ICourse } from './../../models/ICourse';
import FadeIn from '../../components/ui/fadeIn';
import { Add } from '@mui/icons-material';
import { openCenterModal } from '../../store/reducers/modal/modalSlice';
import { getUserApplications } from '../../store/reducers/userApplication/userApplicationSlice';

const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const { courses, totalPages, currentPage, statuses } = useAppSelector(
    (state) => state.courses.courseList
  );

  const { applications } = useAppSelector((state) => state.userApplication);

  const { user } = useAppSelector((state) => state.auth);

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(changeCoursePage(newPage));
  };

  useEffect(() => {
    dispatch(getCourses({ page: currentPage, pageSize: 25 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getUserApplications({ page: 1, pageSize: 25 }));
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(
      openCenterModal({
        type: 'AddNewApplication',
      })
    );
  };
  return (
    <Layout>
      {statuses.isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <FadeIn type="">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {user && user.role === 'user' && (
                <Button
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '8px',
                    transition: 'all 350ms linear',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      color: 'primary.light',
                    },
                  }}
                  onClick={handleOpenModal}
                >
                  <Add />
                  <Box sx={{ fontWeight: 'bold' }}>Подати заявку</Box>
                </Button>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: {
                  xl: '40px',
                  lg: '40px',
                  md: '40px',
                  sm: '20px',
                  xs: '20px',
                },
                gap: '40px',
                flexWrap: 'wrap',
                maxHeight: `calc(100vh - ${
                  totalPages > 1 ? '200px' : '150px'
                })`,
                overflowY: 'auto',
              }}
            >
              {courses &&
                courses.map((course: ICourse) => (
                  <CourseItem
                    course={course}
                    key={course._id}
                    application={applications.find(
                      (ap) => ap.courseId === course._id
                    )}
                  />
                ))}
            </Box>
          </FadeIn>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              onChange={handleChangePage}
              variant="outlined"
              color="primary"
              sx={{
                display: 'flex',
                margin: '0 auto',
                padding: '15px 0',
                justifyContent: 'center',
              }}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default CoursesPage;

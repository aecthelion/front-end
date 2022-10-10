import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Pagination,
  LinearProgress,
  Input,
  Paper,
  Button,
} from '@mui/material';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { mainUrl } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Add, Search, SettingsSuggest } from '@mui/icons-material';

import { ICourse } from './../../../models/ICourse';
import {
  closeCenterModal,
  openCenterModal,
} from '../../../store/reducers/modal/modalSlice';
import {
  closeSystemNotification,
  openSystemNotification,
  resetNotification,
} from '../../../store/reducers/systemNotification/systemNotification';
import {
  changeCoursePage,
  resetCourseStatus,
  getCourses,
} from '../../../store/reducers/course/courseSlice';

interface Column {
  id: 'title' | 'type' | 'createdAt' | 'updatedAt' | 'search';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 170 },
  { id: 'createdAt', label: 'Created', minWidth: 170 },
  { id: 'updatedAt', label: 'Last modified', minWidth: 170 },
  { id: 'search', label: 'Search', minWidth: 170, align: 'right' },
];

export default function CoursesTab() {
  const dispatch = useAppDispatch();
  const {
    courses,
    totalPages = 0,
    currentPage = 0,
    statuses,
  } = useAppSelector((state) => state.courses.courseList);

  const { isLoading, isError, isSuccess, error } = statuses;
  const componentWillUnmount = useRef(false);

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  const [searchParam, setSearchParam] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCoursePage(1));
    setSearchParam(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(changeCoursePage(newPage));
  };

  useEffect(() => {
    dispatch(resetCourseStatus('courseList'));
    const searchDebounce = setTimeout(
      () => {
        dispatch(
          getCourses({
            page: currentPage,
            pageSize: 25,
            searchParams: searchParam,
          })
        );
      },
      searchParam ? 1000 : 0
    );
    return () => clearTimeout(searchDebounce);
  }, [searchParam, dispatch, currentPage]);

  useEffect(() => {
    if (isError) {
      dispatch(openSystemNotification({ type: 'error', text: error }));
    }
    if (isSuccess) {
      dispatch(closeSystemNotification());
    }
  }, [isError, isSuccess, dispatch, error]);

  useEffect(() => {
    return () => {
      if (componentWillUnmount.current) {
        dispatch(resetNotification());
        dispatch(resetCourseStatus('courseList'));
      }
    };
  }, [dispatch]);

  const onSuccess = (type: string) => {
    dispatch(
      openSystemNotification({
        type: 'success',
        text: `${type === 'create' ? 'Created' : 'Updated'} successfully`,
      })
    );
    dispatch(closeCenterModal());
    dispatch(
      resetCourseStatus(type === 'create' ? 'courseCreate' : 'courseUpdate')
    );
  };

  const handleCourseClick = (type: string, course?: ICourse) => {
    dispatch(
      openCenterModal({
        type: 'CourseModal',
        props: {
          onSuccess,
          type,
          courseData: course,
        },
      })
    );
  };

  return (
    <Box>
      <TableContainer sx={{ maxHeight: '90%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    backgroundColor: 'primary.main',
                    border: 'none',
                    color: 'primary.light',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  {column.id !== 'search' ? (
                    <Typography>{column.label}</Typography>
                  ) : (
                    <Paper
                      sx={{
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                        borderRadius: '10px',
                        padding: '5px 3px',
                      }}
                    >
                      <Search />
                      <Input
                        placeholder="Search"
                        sx={{
                          width: '100%',
                          outline: 'none',
                          '&:before': {
                            display: 'none',
                          },
                        }}
                        value={searchParam}
                        onChange={handleSearchChange}
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleCourseClick('create')}
                      >
                        <Add />
                      </Button>
                    </Paper>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {courses &&
                courses.map((course: ICourse) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={course._id}
                    >
                      {columns.map((column) => {
                        let value;
                        if (column.id === 'title') {
                          value = (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              <Box
                                sx={{
                                  background: `url(${mainUrl}${course.icon}) center / cover no-repeat`,
                                  borderRadius: '50%',
                                  height: 32,
                                  width: 32,
                                  minWidth: 32,
                                  padding: 0,
                                }}
                              />
                              <Typography
                                sx={{
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                }}
                              >
                                {course.title}
                              </Typography>
                            </Box>
                          );
                        } else if (column.id === 'search') {
                          value = (
                            <Button
                              onClick={() =>
                                handleCourseClick('update', course)
                              }
                            >
                              <SettingsSuggest />
                            </Button>
                          );
                        } else {
                          value = (
                            <Typography>
                              {column.id === 'createdAt' ||
                              column.id === 'updatedAt'
                                ? moment(
                                    course[column.id as keyof typeof course]
                                  ).fromNow()
                                : course[column.id as keyof typeof course]}
                            </Typography>
                          );
                        }

                        return (
                          <TableCell
                            key={column.id + 'column'}
                            align={column.align}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {isLoading && <LinearProgress />}

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
    </Box>
  );
}

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
  Container,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Search } from '@mui/icons-material';

import {
  closeSystemNotification,
  openSystemNotification,
  resetNotification,
} from '../../store/reducers/systemNotification/systemNotification';

import { IUserApplication } from '../../models/IUserApplication';
import {
  changeApplicationPage,
  deleteUserApplication,
  getUserApplications,
  resetUserApplicationStatus,
} from '../../store/reducers/userApplication/userApplicationSlice';
import FadeIn from '../../components/ui/fadeIn';
import Layout from '../../layout';
import ApplicationItem from './applicationItem';
import { updateUserApplicationStatus } from './../../store/reducers/userApplication/userApplicationSlice';

export interface IApplicationColumn {
  id:
    | 'name'
    | 'email'
    | 'englishLvl'
    | 'technicalBackground'
    | 'status'
    | 'createdAt'
    | 'updatedAt'
    | 'search';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: IApplicationColumn[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'englishLvl', label: 'English', minWidth: 170 },
  { id: 'technicalBackground', label: 'Technical Background', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'createdAt', label: 'Created', minWidth: 170 },
  { id: 'updatedAt', label: 'Last modified', minWidth: 170 },
  { id: 'search', label: 'Search', minWidth: 170, align: 'right' },
];

export const ApplicationsPage = () => {
  const dispatch = useAppDispatch();
  const [updatingStatus, setUpdatingStatus] = useState({
    status: '',
    id: '',
  });
  const {
    applications,
    totalPages = 0,
    currentPage = 0,
    applicationStatus,
    updateApplicationStatus,
    deleteApplicationStatus,
  } = useAppSelector((state) => state.userApplication);

  const { isLoading, isError, isSuccess, error } = applicationStatus;
  const componentWillUnmount = useRef(false);

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  const [searchParam, setSearchParam] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeApplicationPage(1));
    setSearchParam(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(changeApplicationPage(newPage));
  };

  useEffect(() => {
    dispatch(resetUserApplicationStatus('applicationStatus'));
    const searchDebounce = setTimeout(
      () => {
        dispatch(
          getUserApplications({
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
        dispatch(resetUserApplicationStatus('applicationStatus'));
      }
    };
  }, [dispatch]);

  const handleStatusChange = (status: string, id?: string) => {
    if (id) {
      dispatch(updateUserApplicationStatus({ status, id }));
    }
  };

  const handleApplicationDelete = (id?: string) => {
    if (id) {
      dispatch(deleteUserApplication(id));
    }
  };

  useEffect(() => {
    const { isLoading, isError, isSuccess, error } = deleteApplicationStatus;
    if ((isSuccess || isError) && !isLoading) {
      if (isSuccess) {
        dispatch(
          openSystemNotification({
            type: 'success',
            text: 'Successfully deleted',
          })
        );
      } else if (isError) {
        dispatch(
          openSystemNotification({
            type: 'error',
            text: error,
          })
        );
      }
      dispatch(resetUserApplicationStatus('deleteApplicationStatus'));
    }
  }, [dispatch, deleteApplicationStatus]);

  useEffect(() => {
    const { isLoading, isError, isSuccess, error } = updateApplicationStatus;
    if ((isSuccess || isError) && !isLoading) {
      setUpdatingStatus({ id: '', status: '' });
      if (isSuccess) {
        dispatch(
          openSystemNotification({
            type: 'success',
            text: 'Successfully updated',
          })
        );
      } else if (isError) {
        dispatch(
          openSystemNotification({
            type: 'error',
            text: error,
          })
        );
      }
      dispatch(resetUserApplicationStatus('updateApplicationStatus'));
    }
  }, [dispatch, updatingStatus, updateApplicationStatus]);

  return (
    <Layout>
      <FadeIn type="">
        <Container maxWidth={'xl'}>
          <Box>
            <Paper
              sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}
            >
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
                            </Paper>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {!isLoading && (
                    <TableBody>
                      {applications &&
                        applications.map((application: IUserApplication) => {
                          return (
                            <ApplicationItem
                              columns={columns}
                              application={application}
                              handleStatusChange={handleStatusChange}
                              handleApplicationDelete={handleApplicationDelete}
                              key={application._id}
                            />
                          );
                        })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Paper>
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
        </Container>
      </FadeIn>
    </Layout>
  );
};

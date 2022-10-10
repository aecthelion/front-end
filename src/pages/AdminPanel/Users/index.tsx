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
import {
  changeUserPage,
  getUsers,
  resetStatus,
} from '../../../store/reducers/users/usersSlice';
import { useAppDispatch, useAppSelector } from './../../../hooks/redux';
import { IUser } from './../../../models/IUser';
import { Search, SettingsSuggest } from '@mui/icons-material';
import {
  closeSystemNotification,
  openSystemNotification,
  resetNotification,
} from '../../../store/reducers/systemNotification/systemNotification';
import {
  closeCenterModal,
  openCenterModal,
} from '../../../store/reducers/modal/modalSlice';

interface Column {
  id: 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt' | 'search';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'createdAt', label: 'Created', minWidth: 170 },
  { id: 'updatedAt', label: 'Last modified', minWidth: 170 },
  { id: 'search', label: 'Search', minWidth: 170, align: 'right' },
];

export default function UsersTab() {
  const dispatch = useAppDispatch();
  const {
    users,
    totalPages = 0,
    currentPage = 0,
    statuses,
  } = useAppSelector((state) => state.users.usersList);

  const { isLoading, isError, isSuccess, error } = statuses;
  const componentWillUnmount = useRef(false);

  useEffect(() => {
    return () => {
      componentWillUnmount.current = true;
    };
  }, []);

  const [searchParam, setSearchParam] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUserPage(1));
    setSearchParam(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(changeUserPage(newPage));
  };

  useEffect(() => {
    dispatch(resetStatus('usersList'));
    const searchDebounce = setTimeout(
      () => {
        dispatch(
          getUsers({
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
        dispatch(resetStatus('usersList'));
      }
    };
  }, [dispatch]);

  const onSuccess = () => {
    dispatch(
      openSystemNotification({
        type: 'success',
        text: 'Updated successfully',
      })
    );
    dispatch(closeCenterModal());
    dispatch(resetStatus('updateUser'));
  };

  const handleUserClick = (userData: IUser) => {
    dispatch(
      openCenterModal({
        type: 'UserUpdateModal',
        props: {
          userData,
          onSuccess,
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
                    </Paper>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {users &&
                users.map((user: IUser) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user._id}
                    >
                      {columns.map((column) => {
                        let value;
                        if (column.id === 'name') {
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
                                  background: `url(${mainUrl}${user.avatar}) center / cover no-repeat`,
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
                                {user.firstName} {user.lastName}
                              </Typography>
                            </Box>
                          );
                        } else if (column.id === 'search') {
                          value = (
                            <Button onClick={() => handleUserClick(user)}>
                              <SettingsSuggest />
                            </Button>
                          );
                        } else {
                          value = (
                            <Typography>
                              {column.id === 'createdAt' ||
                              column.id === 'updatedAt'
                                ? moment(
                                    user[column.id as keyof typeof user]
                                  ).fromNow()
                                : user[column.id as keyof typeof user]}
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

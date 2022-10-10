import { IApplicationColumn } from './index';
import { IUserApplication } from './../../models/IUserApplication';
import { DeleteOutline } from '@mui/icons-material';
import {
  TableRow,
  Typography,
  Button,
  TableCell,
  Box,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import moment from 'moment';
import { applicationStatus, mainUrl } from '../../helpers';
import { COLORS } from './../../helpers/theme';

interface IApplicationItemProps {
  columns: IApplicationColumn[];
  application: IUserApplication;
  handleStatusChange: (status: string, id?: string) => void;
  handleApplicationDelete: (id?: string) => void;
}

const ApplicationItem = ({
  columns,
  application,
  handleStatusChange,
  handleApplicationDelete,
}: IApplicationItemProps) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={application._id}>
      {columns.map((column) => {
        let value;
        if (column.id === 'name' && application.user) {
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
                  background: `url(${mainUrl}${application.user.avatar}) center / cover no-repeat`,
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
                {application.user.firstName} {application.user.lastName}
              </Typography>
            </Box>
          );
        } else if (column.id === 'status') {
          value = (
            <FormControl variant="standard">
              <Select
                id="status"
                name="status"
                value={application.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value, application._id)
                }
                sx={{
                  textAlign: 'left',
                }}
              >
                {applicationStatus.map((status: string) => (
                  <MenuItem
                    key={status}
                    value={status}
                    selected={application.status === status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else if (column.id === 'email') {
          value = (
            <Typography>
              {application.user ? application.user.email : ''}
            </Typography>
          );
        } else if (column.id === 'search') {
          value = (
            <Button
              sx={{ color: COLORS.danger }}
              onClick={() => handleApplicationDelete(application._id)}
            >
              <DeleteOutline />
            </Button>
          );
        } else {
          value = (
            <Typography>
              {column.id === 'createdAt' || column.id === 'updatedAt'
                ? moment(
                    String(application[column.id as keyof typeof application])
                  ).fromNow()
                : String(application[column.id as keyof typeof application])}
            </Typography>
          );
        }

        return (
          <TableCell key={column.id + 'column'} align={column.align}>
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default ApplicationItem;

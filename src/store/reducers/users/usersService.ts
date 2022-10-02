import axios from 'axios';
import { IUserListParams } from '../../../models/IUser';
import { IUpdateUser } from './usersSlice';

const API_URL = 'http://localhost:5000/api/user';

const getUsers = async (usersListParams: IUserListParams) => {
  const { page, pageSize, searchParams } = usersListParams;
  const response = await axios.get(
    `${API_URL}/list?page=${page}&pageSize=${pageSize}${
      searchParams ? `&searchParams=${searchParams}` : ''
    }`
  );

  return response.data;
};

const updateUser = async (data: IUpdateUser) => {
  const response = await axios.patch(`${API_URL}/${data.userId}`, data.user);

  return response.data;
};

const usersService = {
  get: getUsers,
  update: updateUser,
};

export default usersService;

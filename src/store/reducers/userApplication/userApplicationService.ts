import axios from 'axios';

import {
  IUserApplication,
  IUserApplicationListParams,
  IUpdateUserApplicationsStatus,
} from '../../../models/IUserApplication';

const API_URL = 'http://localhost:5000/api/user-application';

const addUserApplication = async (applicationData: IUserApplication) => {
  const response = await axios.post(`${API_URL}`, applicationData);

  return response.data;
};

const updateUserApplicationStatus = async (
  applicationData: IUpdateUserApplicationsStatus
) => {
  const response = await axios.patch(`${API_URL}/${applicationData.id}`, {
    status: applicationData.status,
  });

  return response.data;
};

const deleteUserApplicationStatus = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};

const getApplications = async (
  userApplicationsParams: IUserApplicationListParams
) => {
  const { page, pageSize, searchParams } = userApplicationsParams;
  const response = await axios.get(
    `${API_URL}/list?page=${page}&pageSize=${pageSize}${
      searchParams ? `&searchParams=${searchParams}` : ''
    }`
  );

  return response.data;
};

const userApplicationService = {
  addUserApplication,
  getApplications,
  updateUserApplicationStatus,
  deleteUserApplicationStatus,
};

export default userApplicationService;

import axios from 'axios';

import {
  IVacancy,
  IVacancyListParams,
  IVacancyUpdatePayload,
} from '../../../models/IVacancy';

const API_URL = 'http://localhost:5000/api/vacancies';

const createVacancy = async (vacancyData: IVacancy) => {
  const response = await axios.post(`${API_URL}`, vacancyData);

  return response.data;
};

const getVacancies = async (vacancyListParams: IVacancyListParams) => {
  const { page, pageSize, searchParams } = vacancyListParams;
  const response = await axios.get(
    `${API_URL}/list?page=${page}&pageSize=${pageSize}${
      searchParams ? `&searchParams=${searchParams}` : ''
    }`
  );

  return response.data;
};

const updateVacancy = async (vacancy: IVacancyUpdatePayload) => {
  const response = await axios.patch(`${API_URL}/${vacancy._id}`, {
    status: vacancy.status,
  });

  await new Promise((resolve: any) => {
    setTimeout(() => resolve(), 300);
  });

  return response.data;
};

const vacancyService = {
  create: createVacancy,
  get: getVacancies,
  update: updateVacancy,
};

export default vacancyService;

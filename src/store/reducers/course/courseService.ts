import axios from 'axios';
import { ICourseListParams } from '../../../models/ICourse';
import { IUpdateCourse } from './courseSlice';

const API_URL = 'http://localhost:5000/api/course';

const getCourses = async (courseListParams: ICourseListParams) => {
  const { page, pageSize, searchParams } = courseListParams;
  const response = await axios.get(
    `${API_URL}/list?page=${page}&pageSize=${pageSize}${
      searchParams ? `&searchParams=${searchParams}` : ''
    }`
  );

  return response.data;
};

const updateCourse = async (data: IUpdateCourse) => {
  const response = await axios.patch(
    `${API_URL}/${data.courseId}`,
    data.course
  );

  return response.data;
};

const courseService = {
  get: getCourses,
  update: updateCourse,
};

export default courseService;

export interface ICourse {
  _id?: string;
  title: string;
  type: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseListParams {
  page: number;
  pageSize: number;
  searchParams?: string;
}

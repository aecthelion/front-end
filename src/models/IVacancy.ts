export interface IVacancy {
  _id?: string;
  userId?: string;
  jobTitle: string;
  companyName: string;
  vacancyLink: string;
  country: string;
  city: string;
  status: string;
  vacancyType: string;
  updatedAt?: string;
}

export interface IVacancyUpdatePayload {
  _id: string;
  status: string;
}

export interface IVacancyListParams {
  page: number;
  pageSize: number;
  searchParams?: string;
}

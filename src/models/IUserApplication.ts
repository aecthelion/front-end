import { IUser } from './IUser';

export interface IUserApplication {
  _id?: string;
  userId?: string;
  courseId: string;
  englishLvl: string;
  technicalBackground: string;
  status: string;
  user?: IUser | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserApplicationListParams {
  page: number;
  pageSize: number;
  searchParams?: string;
}

export interface IUpdateUserApplicationsStatus {
  id: string;
  status: string;
}

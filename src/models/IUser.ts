export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  token?: string;
  role?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserListParams {
  page: number;
  pageSize: number;
  searchParams?: string;
}

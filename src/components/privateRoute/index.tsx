import { Navigate, Outlet } from 'react-router-dom';
import { IUser } from '../../models/IUser';

interface IPrivateRouteProps {
  user?: IUser | null;
}

const PrivateRoute = ({ user }: IPrivateRouteProps) => {
  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

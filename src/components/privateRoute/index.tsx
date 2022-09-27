import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {IUser} from "../../features/auth/authSlice";

interface IPrivateRouteProps {
  user?: IUser
}

const PrivateRoute = (user : IPrivateRouteProps) => {

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

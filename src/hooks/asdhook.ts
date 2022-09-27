/* import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/auth.actions";
import { IUser } from "../features/auth/courseSlice";

export interface IUseAuthResult {
  user: IUser;
  login: (email: string, password: string) => Promise<void> | void;
  logout: () => Promise<void> | void;
}

export const useAuth = (): IUseAuthResult => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const login = useCallback(
    (email: string, password: string) => {
      dispatch(loginUser(email, password));
    },
    [dispatch]
  );

  const logout = () => undefined;

  return { isAuthorized, userId, login, logout };
};
 */
export const x = null;

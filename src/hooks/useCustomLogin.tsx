import { useNavigate, Navigate, createSearchParams } from "react-router";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { loginPostAsync, logout } from "../slice/loginSlice";

export default function useCustomLogin() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const loginState: MemberEmail = useSelector(
    (state: RootState) => state.loginSlice
  );

  const isLogin = loginState ? true : false;

  const doLogin = async (loginParam: LoginForm) => {
    return dispatch(loginPostAsync(loginParam)).unwrap();
  };

  const doLogout = () => {
    dispatch(logout());
  };

  const moveToPath = (path: string) => {
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    navigate({ pathname: "/members/login" }, { replace: true });
  };

  const moveToLoginReturn = () => {
    return <Navigate to={"/members/login"} replace />;
  };

  const exceptionHandle = (ex: any) => {
    const errorMsg = ex.response.data.error;

    const errStr = createSearchParams({ error: errorMsg }).toString();

    if (ex.response.data.error === "ERROR_ACCESSDENIED") {
      navigate({ pathname: "/members/login", search: errStr });
      return;
    }
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
  };
}

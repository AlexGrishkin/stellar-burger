import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../../src/services/store';
import { getCookie } from '../../../src/utils/cookie';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  needAuth: boolean;
};

export const ProtectedRoute = ({ needAuth }: ProtectedRouteProps) => {
  const user = useSelector((state) => state.burgerUser);
  const isAuthenticated = getCookie('accessToken') != undefined;
  const location = useLocation();

  if (needAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  if (!needAuth && isAuthenticated) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  if (user.status === 'Loading') {
    return <Preloader />;
  }

  return <Outlet />;
};

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { userLoggedIn } = useSelector((state) => state.user);

  if (!userLoggedIn) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};
export default PrivateRoute;

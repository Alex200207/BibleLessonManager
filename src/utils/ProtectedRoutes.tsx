
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Dashboard from '../pages/Dashboard';

const PrivateRoutes = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role === 'superadmin') {
    return (
      <Dashboard>
        <Outlet />
      </Dashboard>
    );
  }

  if (role === 'maestra') {
    return <Navigate to="/adminPage" />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoutes;

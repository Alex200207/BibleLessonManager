import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Dashboard from '../pages/Dashboard';

const PrivateRoutes = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Rutas para admin
  if (role === 'admin') {
    return (
      <Dashboard>
        <Outlet />
      </Dashboard>
    );
  }

  // Rutas para maestro, ocultando componentes específicos
  if (role !== 'admin') {
    return (
      <Dashboard>
        {/* Ocultar el componente de roles y usuarios para maestros */}
        <Outlet />
      </Dashboard>
    );
  }

  
  return <Navigate to="/login" />;
};

export default PrivateRoutes;

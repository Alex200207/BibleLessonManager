import { useState, useEffect } from 'react';
import { checkPermissions } from '../services/permissionService'; // Ajusta la ruta según donde esté tu archivo de servicios


const usePermissions = (id: string, action: string) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPermission = async () => {
      const permission = await checkPermissions(id, action);
      setHasPermission(permission);
      setLoading(false);
      
    };

    fetchPermission();
  }, [id, action]);

  return { hasPermission, loading };
  
};


export default usePermissions;

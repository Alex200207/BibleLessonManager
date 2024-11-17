import { useState, useEffect } from 'react';
import {  getPermissions } from '../services/permissionService'; 
import { Permission } from '../Types';


const usePermissions = () => {
  const [permission, setPermission] = useState<Permission[]>([])


  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsData = await getPermissions();
      setPermission(studentsData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return { permission};
  
};


export default usePermissions;

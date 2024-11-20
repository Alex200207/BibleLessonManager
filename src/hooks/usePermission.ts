import { useState, useEffect } from 'react';
import {  getPermissions } from '../services/permissionService'; 
import { Permission } from '../Types';


const usePermissions = () => {
  const [permission, setPermission] = useState<Permission[]>([])
  const [reload, setReload] = useState(false);


  useEffect(() => {

    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const studentsData = await getPermissions();
      setPermission(studentsData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return { permission, setPermission, reloadData };
  
};


export default usePermissions;

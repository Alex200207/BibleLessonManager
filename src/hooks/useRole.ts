import { useEffect, useState } from "react";
import { getRoles, getPermissions} from "../services/rolesService";
import { Role ,Permission} from "../Types/index";




export const useRole = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);



  

  
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const studentsData = await getRoles();
      setRoles(studentsData);

      const permissionsData = await getPermissions();
      setPermissions(permissionsData);


    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };


  

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    roles,
    permissions,
    reloadData,
  };
};

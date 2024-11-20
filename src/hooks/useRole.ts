import { useEffect, useState } from "react";
import { getRoles, getPermissions, createRole} from "../services/rolesService";
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

  
  const newRole = async (roleData: Role) => {
    try {
      await createRole(roleData);
      reloadData();
    } catch (error) {
      console.error("Error al crear el rol:", error);
    }
  };
  


  

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    roles,
    permissions,
    reloadData,
    newRole,
  };
};

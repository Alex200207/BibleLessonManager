import { useEffect, useState } from "react";
import { getRoles } from "../services/rolesService";
import { Role } from "../Types/index";

export const useRole = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const studentsData = await getRoles();
      setRoles(studentsData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    roles,
    reloadData,
  };
};

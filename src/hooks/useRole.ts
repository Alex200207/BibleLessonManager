import { useEffect, useState } from "react";
import {
  getRoles,
  getPermissions,
  createRole,
  editRole,
  deleteRole,
} from "../services/rolesService";
import { Role, Permission } from "../Types/index";
import Swal from "sweetalert2"; // Importa Swe

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

  const editRoleData = async (id: Role["id"], updatedRole: Role) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas guardar los cambios realizados en este Rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await editRole(id, updatedRole);
        Swal.fire("Guardado!", "Los cambios han sido guardados.", "success");
        const studentsData = await getRoles();
        setRoles(studentsData);
      } catch (error) {
        Swal.fire("Error!", "No se pudieron guardar los cambios.", "error");
        console.error("Error al actualizar Rol:", error);
      }
    } else {
      Swal.fire("Cancelado", "Los cambios no han sido guardados", "info");
    }
  };

  const deletedRole = async (id: Role["id"]) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se eliminara esta Leccion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteRole(id);
        Swal.fire("Eliminado!", "El rol ha sido eliminado.", "success");
        const studentsData = await getRoles();
        setRoles(studentsData);
      } catch (error) {
        Swal.fire("Error!", "No se pudo eliminar el rol.", "error");
        console.error("Error al eliminar el rol:", error);
      }
    } else {
      Swal.fire("Cancelado", "El rol no ha sido eliminado", "info");
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
    editRoleData,
    deletedRole,
  };
};

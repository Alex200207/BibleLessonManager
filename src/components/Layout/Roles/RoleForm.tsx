import React, { useState, useEffect } from "react";
import { Role, Permission } from "../../../Types";
import PermissionsTable from './PermissionsTable';
import Swal from "sweetalert2";

interface RoleFormProps {
  onSave: (role: Omit<Role, "id" | "permissions"> & { permissions: string[] }) => void;
  role?: Omit<Role, "permissions">;
}

const RoleForm: React.FC<RoleFormProps> = ({ onSave, role }) => {
  const [name, setName] = useState(role?.name || "");
  const [guard] = useState(role?.guard || "web");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch("http://localhost:3000/permissions"); 
        const data = await response.json();
        setPermissions(data.map((permission: Permission) => ({ ...permission, enabled: false }))); 
      } catch (error) {
        console.error("Error al obtener permisos:", error);
      }
    };
    fetchPermissions();
  }, [reload]);

  const handlePermissionChange = (updatedPermissions: Permission[]) => {
    setPermissions(updatedPermissions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPermissions = permissions.filter((permission) => permission.enabled).map((permission) => permission.id.toString());

    const roleData = {
      name,
      guard,
      permissions: selectedPermissions,
    };

    // Mostrar SweetAlert para confirmación antes de guardar
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres guardar los cambios en este rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    });

    // Solo procede si el usuario confirma
    if (result.isConfirmed) {
      reloadData();
      try {
        if (role) {
          // Actualizar rol existente (PUT)
          await fetch(`http://localhost:3000/role/create/${role.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(roleData),
          });
        } else {
          // Crear un nuevo rol (POST)
          await fetch("http://localhost:3000/role/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(roleData),
          });
        }

        onSave(roleData); // Actualiza el estado en RoleList o cualquier otra acción posterior
        Swal.fire("¡Guardado!", "El rol ha sido guardado exitosamente.", "success");
      } catch (error) {
        console.error("Error al guardar el rol:", error);
        Swal.fire("Error", "Hubo un problema al guardar el rol.", "error");
      }
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return (
    <div className="container mx-auto my-5 p-2 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-10">
      <form onSubmit={handleSubmit} className="p-6 border rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <PermissionsTable
          permissions={permissions}
          onPermissionChange={handlePermissionChange}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default RoleForm;

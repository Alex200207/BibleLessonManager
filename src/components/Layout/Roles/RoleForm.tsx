import React, { useState, useEffect } from "react";
import { Role, Permission } from "../../../Types";
import PermissionsTable from './PermissionsTable';

interface RoleFormProps {
  onSave: (role: Omit<Role, "id" | "permissions"> & { permissions: string[] }) => void;
  role?: Omit<Role, "permissions">;
}

const RoleForm: React.FC<RoleFormProps> = ({ onSave, role }) => {
  const [name, setName] = useState(role?.name || "");
  const [guard] = useState(role?.guard || "web");
  const [permissions, setPermissions] = useState<Permission[]>([]);

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
  }, []);

  // Manejar cambios en los permisos seleccionados
  const handlePermissionChange = (updatedPermissions: Permission[]) => {
    setPermissions(updatedPermissions);
  };

  // Enviar los datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPermissions = permissions.filter((permission) => permission.enabled).map((permission) => permission.id.toString());

    // Si el rol tiene ID, es una edición (PUT), si no, es una creación (POST)
    const roleData = {
      name,
      guard,
      permissions: selectedPermissions,
    };

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

      onSave(roleData); // Llamamos a onSave para actualizar el estado en RoleList o para cualquier otra acción posterior
    } catch (error) {
      console.error("Error al guardar el rol:", error);
    }
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
        {/* <div className="mb-4">
          <label className="block text-sm font-medium">Guard</label>
          <input
            type="text"
            value={guard}
            onChange={(e) => setGuard(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div> */}
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

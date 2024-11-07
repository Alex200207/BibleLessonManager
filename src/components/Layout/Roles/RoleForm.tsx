import React, { useState } from "react";
import { Role } from "../../../Types";
import PermissionsTable from './PermissionsTable';


interface RoleFormProps {
  onSave: (role: Omit<Role, "id" | "permissions">) => void;
  role?: Omit<Role, "permissions">;
}

const RoleForm: React.FC<RoleFormProps> = ({ onSave, role }) => {
  const [name, setName] = useState(role?.name || "");
  const [guard, setGuard] = useState(role?.guard || "web");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, guard });
  };

  return (
    <>
    <div className="container mx-auto my-5 p-2 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-10">
    <form onSubmit={handleSubmit} className="p-6  border rounded-md shadow-md">
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
        <div className="mb-4">
          <label className="block text-sm font-medium">Guard</label>
          <input
            type="text"
            value={guard}
            onChange={(e) => setGuard(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Guardar
        </button>
      </form>
      <PermissionsTable permissions={[]} onPermissionChange={() => {}} />
      </div>
    </>
   
      
  );
};

export default RoleForm;

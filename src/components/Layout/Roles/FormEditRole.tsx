import React, { useState, useEffect } from "react";
import { Role } from "../../../Types";
import { useRole } from "../../../hooks/useRole";
import usePermissions from "../../../hooks/usePermission";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

interface FormEditRoleProps {
  role: Role | null;
}

const FormEditRole: React.FC<FormEditRoleProps> = ({ role }) => {
  const { editRoleData } = useRole();
  const { permission } = usePermissions();
  const [editedRole, setEditedRole] = useState<Role>(
    role || { id: 0, name: "", guard: "", permissions: [] }
  );
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (role) {
      setEditedRole(role);
    }
  }, [role]);

  useEffect(() => {
    const allSelected =
      permission?.length === editedRole.permissions.length &&
      permission?.every((p) =>
        editedRole.permissions.some((perm) => perm.id === p.id)
      );
    setSelectAll(allSelected);
  }, [editedRole, permission]);

  const handlePermissionChange = (permissionId: string) => {
    const updatedPermissions = editedRole.permissions.some(
      (perm) => perm.id === Number(permissionId)
    )
      ? editedRole.permissions.filter(
          (perm) => perm.id !== Number(permissionId)
        )
      : [
          ...editedRole.permissions,
          {
            id: Number(permissionId),
            name: permissionId,
            guard: "",
            enabled: false,
          },
        ];
    setEditedRole({ ...editedRole, permissions: updatedPermissions });
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedPermissions = newSelectAll
      ? permission?.map((perm) => ({
          id: perm.id,
          name: perm.name,
          guard: perm.guard,
          enabled: perm.enabled,
        }))
      : [];
    setEditedRole({ ...editedRole, permissions: updatedPermissions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedRole.id !== 0) {
      editRoleData(editedRole.id, editedRole);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl sm:max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md overflow-auto"
    >
      <div className="mb-4 sm:mb-6">
        <label
          htmlFor="name"
          className="block text-lg sm:text-xl font-medium text-gray-800 mb-2"
        >
          Nombre del Rol
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedRole.name}
          onChange={(e) =>
            setEditedRole({ ...editedRole, name: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          required
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <label
          htmlFor="guard"
          className="block text-lg sm:text-xl font-medium text-gray-800 mb-2"
        >
          Guard
        </label>
        <input
          type="text"
          id="guard"
          name="guard"
          value={editedRole.guard}
          onChange={(e) =>
            setEditedRole({ ...editedRole, guard: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          required
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <label
          htmlFor="permissions"
          className="block text-lg sm:text-xl font-medium text-gray-800 mb-2"
        >
          Permisos
        </label>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-blue-600 hover:underline mb-4 text-sm sm:text-base"
        >
          {selectAll ? "Deseleccionar todos" : "Seleccionar todos"}
        </button>
        <div className="space-y-4">
          {permission?.map((p) => {
            const isSelected = editedRole.permissions.some(
              (perm) => perm.id === p.id
            );

            return (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 bg-gray-50 border rounded-md shadow-sm"
              >
                <span className="text-gray-700 text-lg sm:text-xl">
                  {p.name}
                </span>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className="mr-2 text-sm sm:text-base text-gray-600">
                      {isSelected ? "Habilitado" : "Deshabilitado"}
                    </span>
                    <div
                      className={`relative inline-block w-10 h-6 transition-all rounded-full ${
                        isSelected ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handlePermissionChange(p.id.toString())}
                        className="sr-only"
                      />
                      <span
                        className={`absolute block w-6 h-6 bg-white rounded-full transition-transform transform ${
                          isSelected ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </label>
                  {isSelected ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaRegCircle className="text-gray-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default FormEditRole;

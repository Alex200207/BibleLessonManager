import React, { useState } from 'react';
import { Permission } from '../../../Types';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Importando los iconos de React Icons

interface PermissionsTableProps {
  permissions: Permission[];
  onPermissionChange: (permissions: Permission[]) => void;
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions, onPermissionChange }) => {
  const [selectAll, setSelectAll] = useState(false);

  // Función para alternar la selección de todos los permisos
  const toggleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    onPermissionChange(permissions.map(permission => ({ ...permission, enabled: newValue })));
  };

  // Función para manejar el cambio en un checkbox específico
  const handleCheckboxChange = (permissionId: string) => {
    onPermissionChange(
      permissions.map((permission) =>
        permission.id === Number(permissionId)
          ? { ...permission, enabled: !permission.enabled }
          : permission
      )
    );
  };

  return (
    <div className="p-4 sm:p-6 border rounded-lg shadow-md mt-6 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">Permisos</h2>
      
      {/* Botón para seleccionar todos */}
      <button
        onClick={toggleSelectAll}
        className="text-blue-600 mt-2 mb-4 block text-sm sm:text-base hover:underline"
      >
        {selectAll ? "Deseleccionar todos" : "Seleccionar todos"}
      </button>

      {/* Grid de permisos con un diseño más compacto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={permission.enabled}
                onChange={() => handleCheckboxChange(permission.id.toString())}
                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-300"
              />
              <span className="ml-2 text-gray-800 dark:text-gray-200 text-sm sm:text-base">{permission.name}</span>
            </div>
            {/* Icono de estado (check o x) */}
            {permission.enabled ? (
              <FaCheck className="h-5 w-5 text-green-500" />
            ) : (
              <FaTimes className="h-5 w-5 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionsTable;

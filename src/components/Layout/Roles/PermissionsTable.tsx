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
    <div className="p-6 border rounded-lg shadow-md mt-6 bg-white dark:bg-gray-800 dark:border-gray-600">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Permisos</h2>

      {/* Botón para seleccionar todos */}
      <button
        onClick={toggleSelectAll}
        className="text-blue-600 hover:underline mb-4 block text-sm sm:text-base"
      >
        {selectAll ? "Deseleccionar todos" : "Seleccionar todos"}
      </button>

      {/* Tabla de permisos */}
      <table className="min-w-full bg-white dark:bg-gray-700">
        <thead>
          <tr className="text-left text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">
            <th className="py-2 px-4">Permiso</th>
            <th className="py-2 px-4 text-center">Estado</th>
            <th className="py-2 px-4 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr
              key={permission.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
              } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
            >
              <td className="py-2 px-4">{permission.name}</td>
              <td className="py-2 px-4 text-center">
                {permission.enabled ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaTimes className="text-red-500" />
                )}
              </td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  checked={permission.enabled}
                  onChange={() => handleCheckboxChange(permission.id.toString())}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-300"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;

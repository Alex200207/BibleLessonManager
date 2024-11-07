import React, { useState } from 'react';
import { Permission } from '../../../Types';

interface PermissionsTableProps {
    permissions: Permission[];
    onPermissionChange: (permissions: Permission[]) => void;
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions, onPermissionChange }) => {
    const [selectAll, setSelectAll] = useState(false);

    const toggleSelectAll = () => {
        const newValue = !selectAll;
        setSelectAll(newValue);
        onPermissionChange(permissions.map(permission => ({ ...permission, enabled: newValue })));
    };

    return (
        <div className="p-4 border rounded-md shadow-md mt-4">
            <h2 className="text-lg font-semibold">Permisos de Aula</h2>
            <button onClick={toggleSelectAll} className="text-blue-500">
                Seleccionar todos
            </button>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {permissions.map((permission) => (
                    <label key={permission.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={permission.enabled}
                            onChange={() =>
                                onPermissionChange(
                                    permissions.map((p) =>
                                        p.id === permission.id ? { ...p, enabled: !p.enabled } : p
                                    )
                                )
                            }
                        />
                        <span className="ml-2">{permission.name}</span>
                    </label>
                ))}
            </div>
            
        </div>
    );
};

export default PermissionsTable;

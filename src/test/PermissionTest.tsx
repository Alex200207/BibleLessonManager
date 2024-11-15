import React, { useState } from 'react';
import usePermissions from '../hooks/usePermission'; // Ajusta la ruta según la ubicación de tu hook

const PermissionsTestPage = () => {
  const [id, setId] = useState("1"); // ID de prueba
  const [action, setAction] = useState("crear"); // Acción de prueba

  const { hasPermission, loading } = usePermissions(id, action);

  return (
    <div>
      <h1>Testing usePermissions Hook</h1>
      <div>
        <label>
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Action:
          <input
            type="text"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
        </label>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : hasPermission ? (
        <p>You have permission to {action} the resource.</p>
      ) : (
        <p>You do not have permission to {action} the resource.</p>
      )}
    </div>
  );
};

export default PermissionsTestPage;

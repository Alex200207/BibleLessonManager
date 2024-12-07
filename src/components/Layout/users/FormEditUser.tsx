import { useState, useEffect } from "react";
import { users } from "../../../Types";
import { useUser } from "../../../hooks/useUser";
import { useRole } from "../../../hooks/useRole";

interface FormEditUserProps {
  role: users | null;
  onClose: () => void;
}

const FormEditUser: React.FC<FormEditUserProps> = ({ role, onClose }) => {
  const { updateUserData } = useUser();
  const { roles } = useRole();
  const [formData, setFormData] = useState<users>(
    role || {
      id: 0,
      name: "",
      email: "",
      password: "",
      role_id: 0,
      role: "",
    }
  );
  const [error] = useState<string>(""); // Estado para manejar el error

  useEffect(() => {
    if (role) {
      setFormData(role);
    }
  }, [role]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "role_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación para asegurarse de que los campos requeridos estén completos

    try {
      await updateUserData(formData.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Correo Electrónico (Opcional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Rol
          </label>
          <select
            id="role"
            name="role_id" // Aquí cambiamos a 'role_id' para que coincida con el estado
            value={formData.role_id}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          >
            {roles.map((roleOption) => (
              <option key={roleOption.id} value={roleOption.id}>
                {roleOption.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar error si no se completan los campos requeridos */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Guardar
          </button>
          <button
            type="button"
            className="ml-2 py-2 px-4 rounded-lg border border-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditUser;

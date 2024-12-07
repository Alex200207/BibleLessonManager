import { useState, useEffect } from "react";
import { users } from "../../../Types";
import { useUser } from "../../../hooks/useUser";
import { useRole } from "../../../hooks/useRole";

interface FormEditUserProps {
  role: users | null;
  onClose: () => void;
}

const FormEditUser: React.FC<FormEditUserProps> = ({ role, onClose }) => {
  const { updateUserData, reloadData } = useUser();
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
    if (formData.id !== 0) {
      try {
        onClose();
        await updateUserData(formData.id, formData);
        reloadData();
      } catch (error) {
        console.error("Error al editar el usuario:", error);
      }
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
            Correo Electrónico
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
          <label htmlFor="role_id" className="block text-sm font-medium">
            Rol
          </label>
          <select
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          >
            <option value={0} disabled>
              Seleccionar Rol
            </option>
            {roles.map((roleOption) => (
              <option key={roleOption.id} value={roleOption.id}>
                {roleOption.name}
              </option>
            ))}
          </select>
        </div>

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

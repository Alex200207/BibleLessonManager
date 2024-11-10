import React from "react";
import { useRole} from "../../../hooks/useRole";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useUserModal } from "../../../hooks/useAddUser";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reloadData: () => void;
}

const AddUserModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  reloadData,
}) => {
  const { newUser, handleInputChange, handleSubmit } = useUserModal();
  const { roles } = useRole();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold text-gray-800">Agregar Usuario</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(() => {
              reloadData();
              onClose();
            });
          }}
          className="grid grid-cols-1 gap-4 mt-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              nombre
            </label>
            <input
              type="text"
              name="name"
              placeholder="nombre"
              value={newUser.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <textarea
              name="email"
              placeholder="agrega un correo"
              value={newUser.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              name="password" 
              placeholder="Texto de la lección"
              value={newUser.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role_id"
              value={newUser.role_id}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un role</option>
              {roles.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between col-span-1 mt-4">
            <button
              type="submit"
              className="flex items-center border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md transition hover:bg-blue-500 hover:text-white"
            >
              <CiSaveDown2 className="h-5 w-5 mr-2" aria-hidden="true" />
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center border-2 border-red-500 text-red-500 px-4 py-2 rounded-md transition hover:bg-red-500 hover:text-white"
            >
              <IoMdClose className="h-5 w-5 mr-2" aria-hidden="true" />
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;

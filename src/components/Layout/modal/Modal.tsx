import React from "react";
import { useStudentModal } from "../../../hooks/useAddStudent";
import { useStudent } from "../../../hooks/useStudent";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../../../hooks/useUser";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reloadData: () => void;
  
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, reloadData }) => {
  const { newStudent, handleInputChange, handleSubmit } = useStudentModal();
  const { group } = useStudent();
  const { userList: teachers } = useUser();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-800">
          Agregar Estudiante
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(() => {
              reloadData();
              onClose();
            });
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del Estudiante"
              value={newStudent.nombre}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grupo
            </label>
            <select
              name="grupo_id"
              value={newStudent.grupo_id}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un grupo</option>
              {group.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maestra
            </label>
            <select
              name="id_maestra"
              value={newStudent.id_maestra}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione una maestr@</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={newStudent.edad}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              name="genero"
              value={newStudent.genero}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="flex justify-between col-span-1 md:col-span-2 mt-6">
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

export default Modal;

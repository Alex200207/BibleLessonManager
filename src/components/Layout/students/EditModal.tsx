import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useStudent } from "../../../hooks/useStudent";
import { kids } from "../../../Types";
import { useUser } from "../../../hooks/useUser";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: kids | null;
  onSave: (updatedData: kids) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave,
}) => {
  const { group } = useStudent();
  const { user } = useUser();
  const [editedStudent, setEditedStudent] = useState<kids>(
    student || {
      id: 0,
      nombre: "",
      edad: 0,
      genero: "",
      grupo_id: 0,
      progreso: 0,
      fecha: new Date(),
    }
  );

  useEffect(() => {
    if (student) {
      setEditedStudent(student); // Inicializar el modal con los datos del estudiante seleccionado
    }
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedStudent); // Llamar a onSave con los datos editados
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-800">
          Editar Estudiante
        </h2>
        <form
          onSubmit={handleSubmit}
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
              value={editedStudent.nombre}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {user.role === "admin" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Grupo
              </label>
              <select
                name="grupo_id"
                value={editedStudent.grupo_id}
                onChange={handleChange}
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
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={editedStudent.edad}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              name="genero"
              value={editedStudent.genero}
              onChange={handleChange}
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

export default EditModal;

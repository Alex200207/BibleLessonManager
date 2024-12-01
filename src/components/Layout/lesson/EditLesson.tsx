import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useStudent } from "../../../hooks/useStudent";
import { useUser } from "../../../hooks/useUser";
import { lesson } from "../../../Types";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: lesson | null;
  onSave: (updatedData: lesson) => void;
}

const EditLesson: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onSave,
}) => {
  const { group } = useStudent();
  const { userList: teachers } = useUser();

  const [editedLesson, setEditedLesson] = useState<lesson>(
    lesson || {
      id: 0,
      tema: "",
      descripcion: "",
      pasaje_biblico: "",
      id_maestra: 0,
      id_grupo: 0,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      estado: 0,
    }
  );

  useEffect(() => {
    if (lesson) {
      setEditedLesson(lesson);
    }
  }, [lesson]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedLesson);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-800">Editar Lección</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tema
            </label>
            <input
              type="text"
              name="tema"
              placeholder="Tema de la lección"
              value={editedLesson.tema}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grupo
            </label>
            <select
              name="id_grupo"
              value={editedLesson.id_grupo}
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maestr@
            </label>
            <select
              name="id_maestra"
              value={editedLesson.id_maestra}
              onChange={handleChange}
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
              Descripción
            </label>
            <textarea
              name="descripcion"
              placeholder="Agrega información de la lección"
              value={editedLesson.descripcion}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pasaje
            </label>
            <input
              type="text"
              name="pasaje_biblico"
              placeholder="Texto de la lección"
              value={editedLesson.pasaje_biblico}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

export default EditLesson;

import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useStudent } from "../../../hooks/useStudent";
import { lesson } from "../../../Types";
import momet from "moment";

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

  const [editedLesson, setEditedLesson] = useState<lesson>(
    lesson || {
      id: 0,
      tema: "",
      descripcion: "",
      pasaje_biblico: "",
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
      <div className="bg-white rounded-lg shadow-lg p-3 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-sm font-semibold text-gray-800">Editar Lección</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
        >
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Tema
            </label>
            <input
              type="text"
              name="tema"
              placeholder="Tema de la lección"
              value={editedLesson.tema}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">
              Grupo
            </label>
            <select
              name="id_grupo"
              value={editedLesson.id_grupo}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
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
            <label className="block text-xs font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              placeholder="Agrega información de la lección"
              value={editedLesson.descripcion}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">
              Pasaje
            </label>
            <input
              type="text"
              name="pasaje_biblico"
              placeholder="Texto de la lección"
              value={editedLesson.pasaje_biblico}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="fecha_inicio"
              value={momet(editedLesson.fecha_inicio).format("YYYY-MM-DD")}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">
              Fecha de Fin
            </label>
            <input
              type="date"
              name="fecha_fin"
              value={momet(editedLesson.fecha_fin).format("YYYY-MM-DD")}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>

          <div className="flex justify-between col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="flex items-center border-2 border-blue-500 text-blue-500 px-3 py-1 rounded-md transition hover:bg-blue-500 hover:text-white text-xs"
            >
              <CiSaveDown2 className="h-4 w-4 mr-2" aria-hidden="true" />
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center border-2 border-red-500 text-red-500 px-3 py-1 rounded-md transition hover:bg-red-500 hover:text-white text-xs"
            >
              <IoMdClose className="h-4 w-4 mr-2" aria-hidden="true" />
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLesson;

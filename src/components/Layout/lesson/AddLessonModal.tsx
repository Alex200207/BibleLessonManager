import React, { useEffect } from "react";
import { useStudent } from "../../../hooks/useStudent";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../../../hooks/useUser";
import { useLessonModal } from "../../../hooks/useAddLesson";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  reloadData: () => void;
}

const AddLessonModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  reloadData,
}) => {
  const { newLesson, handleInputChange, handleSubmit, setNewLesson } =
    useLessonModal();
  const { group } = useStudent();
  const { userList: teachers, user } = useUser();

  useEffect(() => {
    if (newLesson.fecha_inicio && typeof newLesson.fecha_inicio === "string") {
      newLesson.fecha_inicio = new Date(newLesson.fecha_inicio);
    }
    if (newLesson.fecha_fin && typeof newLesson.fecha_fin === "string") {
      newLesson.fecha_fin = new Date(newLesson.fecha_fin);
    }
    validateUser();
  }, [setNewLesson, user]);

  const validateUser = () => {
    if (user.role !== "admin") {
      // Si el usuario no es admin, asignar su id a id_maestra
      setNewLesson((prev) => ({
        // Actualizar el estado de newStudent
        ...prev,
        id_maestra: user.id,
      }));
    }
  };

  const formatDate = (
    input: number | Date | string | null | undefined
  ): string => {
    if (input) {
      if (typeof input === "string") {
        return input;
      }
      const date = new Date(input);
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-auto flex items-center justify-center custom-z bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-3 w-11/12 max-w-lg">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Agregar Lección
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(() => {
              reloadData();
              onClose();
            });
          }}
          className="grid grid-cols-1 gap-3 mt-3"
        >
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Tema
            </label>
            <input
              type="text"
              name="tema"
              placeholder="Tema de la lección"
              value={newLesson.tema}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              placeholder="Agrega información de la lección"
              value={newLesson.descripcion}
              onChange={handleInputChange}
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
              value={newLesson.pasaje_biblico}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Grupo
              </label>
              <select
                name="id_grupo"
                value={newLesson.id_grupo}
                onChange={handleInputChange}
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

            {user.role === "admin" && (
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Maestra
                </label>
                <select
                  name="id_maestra"
                  value={newLesson.id_maestra}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                >
                  <option value="">Seleccione una maestr@</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="fecha_inicio"
                value={formatDate(newLesson.fecha_inicio)}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Fecha Fin
              </label>
              <input
                type="date"
                name="fecha_fin"
                value={formatDate(newLesson.fecha_fin)}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-between col-span-1 mt-3">
            <button
              type="submit"
              className="flex items-center border-2 border-blue-500 text-blue-500 px-3 py-1.5 rounded-md transition hover:bg-blue-500 hover:text-white text-xs"
            >
              <CiSaveDown2 className="h-4 w-4 mr-2" aria-hidden="true" />
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center border-2 border-red-500 text-red-500 px-3 py-1.5 rounded-md transition hover:bg-red-500 hover:text-white text-xs"
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

export default AddLessonModal;

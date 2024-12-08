import React, { useEffect, useState } from "react";
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
  const { user, userList } = useUser();

  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  useEffect(() => {
    // Crea una copia local de newLesson para evitar modificaciones directas
    const updatedLesson = { ...newLesson };

    // Verifica y convierte las fechas si es necesario
    if (
      updatedLesson.fecha_inicio &&
      typeof updatedLesson.fecha_inicio === "string"
    ) {
      updatedLesson.fecha_inicio = new Date(updatedLesson.fecha_inicio);
    }
    if (
      updatedLesson.fecha_fin &&
      typeof updatedLesson.fecha_fin === "string"
    ) {
      updatedLesson.fecha_fin = new Date(updatedLesson.fecha_fin);
    }

    // Asigna el grupo si el usuario no es admin
    if (user.role !== "admin") {
      updatedLesson.id_grupo =
        group.find((g) => g.maestro_id === user.id)?.id || 0;
    }

    // Actualiza el estado si realmente hay un cambio
    if (JSON.stringify(updatedLesson) !== JSON.stringify(newLesson)) {
      setNewLesson(updatedLesson);
    }
  }, [user.role, group, newLesson, setNewLesson, user.id]);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = e.target.value;
    const groupData = group.find((g) => g.id.toString() === groupId);
    if (groupData) {
      const teacher = userList.find((user) => user.id === groupData.maestro_id);
      setSelectedTeacher(teacher?.name || null);
    }
    handleInputChange(e); // Se asegura de que el estado también se actualice con el grupo seleccionado
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
      <div className="bg-white rounded-lg shadow-lg p-3 w-11/12 max-w-lg dark:bg-slate-800">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-slate-100 mb-3">
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
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300">
              Tema
            </label>
            <input
              type="text"
              name="tema"
              placeholder="Tema de la lección"
              value={newLesson.tema}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300">
              Descripción
            </label>
            <textarea
              name="descripcion"
              placeholder="Agrega información de la lección"
              value={newLesson.descripcion}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-300">
              Pasaje
            </label>
            <input
              type="text"
              name="pasaje_biblico"
              placeholder="Texto de la lección"
              value={newLesson.pasaje_biblico}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
            />
          </div>
          {user.role === "admin" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-slate-300">
                  Grupo
                </label>
                <select
                  name="id_grupo"
                  value={newLesson.id_grupo}
                  onChange={handleGroupChange}
                  className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
                >
                  <option value="">Seleccione un grupo</option>
                  {group.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {selectedTeacher && (
                <div>
                  <label className="inline text-xs font-medium text-gray-700 dark:text-slate-300">
                    Maestro
                  </label>
                  <p className="text-xs bg-slate-100 border p-1 rounded-sm text-gray-600 dark:bg-slate-700 dark:text-slate-200">
                    {selectedTeacher}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-300">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="fecha_inicio"
                value={formatDate(newLesson.fecha_inicio)}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-300">
                Fecha Fin
              </label>
              <input
                type="date"
                name="fecha_fin"
                value={formatDate(newLesson.fecha_fin)}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-1.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
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

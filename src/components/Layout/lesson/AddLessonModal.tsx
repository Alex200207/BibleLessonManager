import React, { useEffect, useState } from "react";
import { useStudent } from "../../../hooks/useStudent";
import { CiSaveDown2 } from "react-icons/ci";
import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";
import { useUser } from "../../../hooks/useUser";
import { useLessonModal } from "../../../hooks/useAddLesson";
import "react-quill/dist/quill.snow.css"; // Estilos predeterminados de Quill
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { useLesson } from "../../../hooks/useLesson";

const AddLessonModal: React.FC = () => {
  const { newLesson, handleInputChange, handleSubmit, setNewLesson } =
    useLessonModal();

  const { reloadData } = useLesson();
  const { group } = useStudent();
  const { user } = useUser();
  const { lessons } = useLesson();
  const navigate = useNavigate();

  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const { userList } = useUser();

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

    // Actualiza el estado si realmente hay un cambio
    if (JSON.stringify(updatedLesson) !== JSON.stringify(newLesson)) {
      setNewLesson(updatedLesson);
    }
  }, [user.role, lessons, newLesson, setNewLesson, user.id]);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lessonId = e.target.value; // Obtiene la lección seleccionada

    // Busca la lección en la lista de lecciones usando el ID
    const lessonData = lessons.find(
      (lesson) => lesson.id.toString() === lessonId
    );

    if (lessonData) {
      // Busca el grupo asociado a la lección
      const groupData = lessons.find((g) => g.id === lessonData.grupo_id);

      if (groupData) {
        // Si el grupo existe, busca al maestro relacionado
        const teacher = userList.find(
          (user) =>
            user.id === group.find((g) => g.id === groupData.id)?.maestro_id
        );

        // Actualiza el estado con el nombre del maestro (o null si no existe)
        setSelectedTeacher(teacher?.name || null);
      }
    }

    // Actualiza el estado del formulario con la lección seleccionada
    handleInputChange(e);
  };

  const handleDescriptionChange = (value: string) => {
    handleInputChange({
      target: { name: "descripcion", value },
    } as React.ChangeEvent<HTMLInputElement>);
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
          Agregar Lección
        </h2>
        <label
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/lesson")}
        >
          <IoIosArrowRoundBack className="w-10 h-10" />
        </label>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(() => {
            reloadData();
          });
        }}
        className="space-y-6  "
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Tema
          </label>
          <input
            type="text"
            name="tema"
            placeholder="Tema de la lección"
            value={newLesson.tema}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Descripción
          </label>
          <ReactQuill
            theme="snow"
            placeholder="Agrega información de la lección"
            value={newLesson.descripcion}
            onChange={handleDescriptionChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Pasaje
          </label>
          <input
            type="text"
            name="pasaje_biblico"
            placeholder="Texto de la lección"
            value={newLesson.pasaje_biblico}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Fecha Inicio
            </label>
            <input
              type="date"
              name="fecha_inicio"
              value={formatDate(newLesson.fecha_inicio)}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Fecha Fin
            </label>
            <input
              type="date"
              name="fecha_fin"
              value={formatDate(newLesson.fecha_fin)}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
            />
          </div>
        </div>

        {user.role === "admin" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Grupo
            </label>
            <select
              name="grupo_id"
              value={newLesson.grupo_id ?? ""}
              onChange={handleGroupChange}
              className="border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
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

        {user.role === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedTeacher && (
              <div>
                <label className="inline text-sm font-medium text-gray-700 dark:text-slate-300">
                  Maestro
                </label>
                <p className="text-sm bg-slate-100 border p-2 rounded-sm text-gray-600 dark:bg-slate-700 dark:text-slate-200">
                  {selectedTeacher}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="flex items-center border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md transition hover:bg-blue-500 hover:text-white text-sm"
          >
            <CiSaveDown2 className="h-4 w-4 mr-2" aria-hidden="true" />
            Guardar
          </button>
          <button
            type="button"
            onClick={() => navigate("/lesson")}
            className="flex items-center border-2 border-red-500 text-red-500 px-4 py-2 rounded-md transition hover:bg-red-500 hover:text-white text-sm"
          >
            <IoMdClose className="h-4 w-4 mr-2" aria-hidden="true" />
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLessonModal;

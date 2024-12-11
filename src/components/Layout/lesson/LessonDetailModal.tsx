import React from "react";
import { group, lesson, users } from "../../../Types";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import { useUser } from "../../../hooks/useUser";
import DOMPurify from "dompurify";

interface LessonDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: lesson | null;
  group: group[];
  teacher: users[];
}

const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  isOpen,
  onClose,
  lesson,
  group,
}) => {
  const { userList } = useUser();
  if (!isOpen || !lesson) return null;

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g) => g.id === groupId);
    return groupData ? groupData.nombre : "Sin grupo";
  };

  const findTeacherForGroup = (teacherId: number): string => {
    const groupData = group.find((g) => g.id === teacherId);
    if (groupData) {
      const teacher = userList.find((user) => user.id === groupData.maestro_id);
      return teacher ? teacher.name : "Sin maestro";
    }
    return "Sin maestro";
  };

  const sanitizedDescription = DOMPurify.sanitize(lesson.descripcion);
  const descriptionWithStyles = sanitizedDescription
    .replace(/<h1>/g, '<h1 class="text-2xl text-gray-800 dark:text-slate-100">')
    .replace(/<h2>/g, '<h2 class="text-xl text-gray-800 dark:text-slate-100">')
    .replace(/<h3>/g, '<h3 class="text-lg text-gray-800 dark:text-slate-100">')
    .replace(/<h4>/g, '<h4 class="text-md text-gray-800 dark:text-slate-100">')
    .replace(/<h5>/g, '<h5 class="text-sm text-gray-800 dark:text-slate-100">')
    .replace(/<h6>/g, '<h6 class="text-xs text-gray-800 dark:text-slate-100">')
    .replace(/<ul>/g, '<ul class="list-disc pl-6 text-gray-700">')
    .replace(/<ol>/g, '<ol class="list-decimal pl-6 text-gray-700">')
    .replace(/<li>/g, '<li class="text-gray-700">');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-100 w-full h-full rounded-none shadow-xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Detalles de la Lección
          </h2>
          <button
            className="text-gray-500 hover:text-red-500 transition duration-200"
            onClick={onClose}
          >
            <IoCloseOutline className="h-8 w-8" />
          </button>
        </div>
        <hr className="mb-4" />
        <div className="space-y-4">
          <div className="text-gray-700">
            <strong>Tema:</strong> {lesson.tema}
          </div>
          <div>
            <strong>Descripción:</strong>
            <div
              className="text-gray-700 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-300"
              dangerouslySetInnerHTML={{ __html: descriptionWithStyles }}
              style={{ minHeight: "150px" }} // Agregado para que tenga un mínimo de altura
            />
          </div>
          <div className="text-gray-700">
            <strong>Maestr@:</strong> {findTeacherForGroup(lesson.id_grupo)}
          </div>
          <div className="text-gray-700">
            <strong>Grupo:</strong> {findGroupName(lesson.id_grupo)}
          </div>
          <div className="text-gray-700">
            <strong>Texto:</strong> {lesson.pasaje_biblico}
          </div>
          <div className="text-gray-700">
            <strong>Estado:</strong>{" "}
            {lesson.estado === 1
              ? "Activo"
              : lesson.estado === 2
              ? "Finalizado"
              : "Desconocido"}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-700">
              <strong>Inicio:</strong>{" "}
              {moment(lesson.fecha_inicio).locale("es").format("LL")}
            </div>
            <div className="text-gray-700">
              <strong>Fin:</strong>{" "}
              {moment(lesson.fecha_fin).locale("es").format("LL")}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailModal;

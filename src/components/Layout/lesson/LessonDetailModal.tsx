import React from "react";
import { group, lesson, users } from "../../../Types";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import { useUser } from "../../../hooks/useUser";

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
  const { userList} = useUser();
  if (!isOpen || !lesson) return null;

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
  };

  const findTeacherForGroup= (teacherId: number): string => {
    // Encuentra el grupo correspondiente al estudiante
    const groupData = group.find((g) => g.id === teacherId); // Asegúrate que 'id' sea la propiedad correcta del grupo
    if (groupData) {
      // Busca el maestro asignado al grupo
      const teacher = userList.find((user) => user.id === groupData.maestro_id); // Asegúrate que 'maestro_id' sea la propiedad correcta
      return teacher ? teacher.name : "Sin maestro"; // Devuelve el nombre del maestro si existe
    }
    // Si no se encuentra el grupo, devuelve un mensaje predeterminado
    return "Sin maestro";
  };
  

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/3 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Detalles del Estudiante
        </h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong>Tema:</strong> {lesson.tema}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Descripción:</strong> {lesson.descripcion}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Maestr@:</strong> {findTeacherForGroup(lesson.id_grupo)}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Grupo:</strong> {findGroupName(lesson.id_grupo)}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Texto:</strong> {lesson.pasaje_biblico}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Estado:</strong>{" "}
            {lesson.estado === 1
              ? "Activo"
              : lesson.estado === 2
              ? "Finalizado"
              : "Desconocido"}
          </p>

          <hr />
          <p className="text-gray-700">
            <strong>Inicio:</strong>{" "}
            {moment(lesson.fecha_inicio).locale("es").format("LL")}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Fin:</strong>{" "}
            {moment(lesson.fecha_fin).locale("es").format("LL")}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="border border-red-500 text-red-500 py-2 px-4 rounded-lg shadow hover: transition duration-200"
            onClick={onClose}
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailModal;

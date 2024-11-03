import React from "react";
import { group, kids, score, users } from "../../../Types";
import { IoCloseOutline } from "react-icons/io5";

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: kids | null;
  score: score[];
  group: group[];
  teacher: users[];
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  isOpen,
  onClose,
  student,
  score,
  teacher,
  group,
}) => {
  if (!isOpen || !student) return null;

  const findScoreForStudent = (studentId: number) => {
    const studentScore = score.find((s) => s.estudiante_id === studentId);
    return studentScore ? studentScore.puntuacion : "sin puntos";
  };

  const findTeacherForStudent = (teacherId: number) => {
    const teacherList = teacher.find((u) => u.id === teacherId);
    return teacherList ? teacherList.name : "sin maestro";
  };

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
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
            <strong>Nombre:</strong> {student.nombre}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Edad:</strong> {student.edad}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Género:</strong> {student.genero}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Grupo:</strong> {findGroupName(student.grupo_id)}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Puntuación:</strong> {findScoreForStudent(student.id)}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Maestr@:</strong>{" "}
            {findTeacherForStudent(student.id_maestra)}
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

export default StudentDetailModal;

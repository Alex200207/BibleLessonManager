import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import { FcAcceptDatabase } from "react-icons/fc";
import { useStudent } from "../../../hooks/useStudent";
import EditModal from "../modal/EditModal";
import { kids } from "../../../Types";
import { useUser } from "../../../hooks/useUser";
import { FaUser } from "react-icons/fa";
import StudentDetailModal from "../modal/StudentDetailModal";
import { GrView } from "react-icons/gr";
import Table from "../Table"; // Importar el componente reutilizable
import Tippy from "@tippyjs/react"; // Importa Tippy
import "tippy.js/dist/tippy.css"; // Importa estilos para los tooltips

interface Row {
  id: number;
  nombre: string;
  edad: number;
  id_maestra: number;
  genero: string;
  grupo_id: number;
}

const StudentTable: React.FC = () => {
  const {
    students,
    score,
    group,
    reloadData,
    deleteStudents,
    editStudentData,
    studentDeletedList,
  } = useStudent();
  const { userList } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<kids | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  const visibleStudents = showDeleted
    ? filteredStudents.filter((student) => student.deleted_at) // Filtra solo los eliminados
    : filteredStudents.filter((student) => !student.deleted_at);

  const studentCount = filteredStudents.length;

  const findScoreForStudent = (studentId: number) => {
    const studentScore = score.find((s) => s.estudiante_id === studentId);
    return studentScore ? studentScore.puntuacion : "sin puntos";
  };

  const findTeacherForStudent = (teacherId: number) => {
    const teacher = userList.find((u) => u.id === teacherId);
    return teacher ? teacher.name : "sin maestro";
  };

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openEditModal = (student: kids) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleEditSave = async (updatedData: kids) => {
    await editStudentData(updatedData.id, updatedData);
    reloadData();
    closeEditModal();
  };

  const handleDelete = async (id: number) => {
    await deleteStudents(id);
    reloadData();
  };

  const openDetailModal = (student: kids) => {
    if (isMobile) {
      setSelectedStudent(student);
      setIsDetailModalOpen(true);
    }
  };
  const toggleShowDeleted = async () => {
    setShowDeleted((prev) => !prev); // Alterna la visualización de eliminados
    if (!showDeleted) {
      await studentDeletedList(); // Obtiene estudiantes eliminados solo si se está mostrando eliminados
    } else {
      await reloadData(); // Recarga los datos si se está mostrando activos
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row: Row) => row.nombre,
      cell: (row: Row) => (
        <div className="whitespace-normal break-words">{row.nombre}</div>
      ),
    },
    { name: "Edad", selector: (row: Row) => row.edad, omit: isMobile },
    { name: "Género", selector: (row: Row) => row.genero, omit: isMobile },
    {
      name: "Grupo",
      cell: (row: Row) => findGroupName(row.grupo_id),
      omit: isMobile,
    },
    {
      name: "Puntuación",
      cell: (row: Row) => findScoreForStudent(row.id),
      omit: isMobile,
    },
    {
      name: "Maestr@",
      cell: (row: Row) => findTeacherForStudent(row.id_maestra),
      omit: isMobile,
    },
    {
      name: "Acciones",
      cell: (row: Row) => (
        <div className="flex space-x-2 justify-between">
          {isMobile && (
            <button
              onClick={() => openDetailModal(row)}
              data-tip="Ver detalles"
              data-for="detailTooltip"
            >
              <GrView className="h-6 w-6" />
            </button>
          )}
          <Tippy content="Editar" placement="top">
            <button onClick={() => openEditModal(row)}>
              <MdOutlineEdit className="h-6 w-6" />
            </button>
          </Tippy>
          <Tippy content="Eliminar" placement="top">
            <button onClick={() => handleDelete(row.id)}>
              <MdDeleteOutline className="h-6 w-6 text-red-600" />
            </button>
          </Tippy>
        </div>
      ),
      width: "100px",
    },
  ];

  const customStyles = {
    table: { style: { borderRadius: "20px 20px 0 0", overflow: "hidden" } },
    headCells: {
      style: {
        backgroundColor: "#ebf8ff",
        color: "#2d3748",
        fontWeight: "600",
      },
    },
    cells: {
      style: { paddingLeft: "24px", paddingRight: "24px", color: "#4a5568" },
    },
    rows: {
      style: {
        backgroundColor: "#ffffff",
        padding: "16px",
        "&:hover": { backgroundColor: "#f7fafc" },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#edf2f7",
        color: "#4a5568",
        borderRadius: "0 0 20px 20px",
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mx-auto my-5 p-2 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-10">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar estudiantes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md"
        />

        <Tippy content="Agregar" placement="top">
          <button onClick={toggleModal} className="btn btn-success">
            <IoAddCircleOutline className="ml-5 h-10 w-10" />
          </button>
        </Tippy>
      </div>

      <div className="rounded-lg p-2 mb-4 flex items-center">
        <FaUser className="text-blue-600 h-6 w-6 mr-2" />
        <span className="text-lg">
          Cantidad de estudiantes: <strong>{studentCount}</strong>
        </span>
        <button onClick={toggleShowDeleted} className="ml-4">
          {showDeleted ? (
            <FcAcceptDatabase className="h-6 w-6" />
          ) : (
            <FcDeleteDatabase className="h-6 w-6" />
          )}
        </button>
      </div>

      <Table
        data={visibleStudents}
        columns={columns.filter(
          (column) =>
            !column.omit ||
            column.name === "Nombre" ||
            column.name === "Acciones"
        )}
        customStyles={customStyles}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        reloadData={reloadData}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        student={selectedStudent}
        onSave={handleEditSave}
      />
      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={selectedStudent}
        score={score}
        group={group}
        teacher={userList}
      />
    </div>
  );
};

export default StudentTable;

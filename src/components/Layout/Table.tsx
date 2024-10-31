import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal from "../Layout/modal/Modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useStudent } from "../../hooks/useStudent";
import EditModal from "./modal/EditModal";
import { kids } from "../../Types";
import { useUser } from "../../hooks/useUser";
import { FaUser } from "react-icons/fa"; // Importar el ícono de usuario
import StudentDetailModal from "./modal/StudentDetailModal"; // Importar el nuevo modal
import { GrView } from "react-icons/gr";

interface Row {
  id: number;
  nombre: string;
  edad: number;
  id_maestra: number;
  genero: string;
  grupo_id: number;
}

const Table: React.FC = () => {
  const {
    students,
    score,
    group,
    reloadData,
    deleteStudents,
    editStudentData,
  } = useStudent();
  const { userList } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<kids | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Nuevo estado para el modal de detalles

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

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
      // Solo abrir el modal si está en un dispositivo móvil
      setSelectedStudent(student);
      setIsDetailModalOpen(true); // Abrir el modal de detalles
    }
  };

  const columns = [
    { name: "Edad", selector: (row: Row) => row.nombre },

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
            <button onClick={() => openDetailModal(row)}>
              <GrView className="h-6 w-6" />
            </button>
          )}
          <button onClick={() => openEditModal(row)}>
            <MdOutlineEdit className="h-6 w-6" />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <MdDeleteOutline className="h-6 w-6 text-red-600" />
          </button>
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
        <button onClick={toggleModal} className="btn btn-success">
          <IoAddCircleOutline className="ml-5 h-10 w-10" />
        </button>
      </div>

      <div className="rounded-lg  p-2 mb-4 flex items-center">
        <FaUser className="text-blue-600 h-6 w-6 mr-2" />
        <span className="text-lg">
          Cantidad de estudiantes: <strong>{studentCount}</strong>
        </span>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns.filter(
            (column) =>
              !column.omit ||
              column.name === "Nombre" ||
              column.name === "Acciones"
          )}
          data={filteredStudents}
          pagination
          customStyles={customStyles}
        />
      </div>

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

export default Table;

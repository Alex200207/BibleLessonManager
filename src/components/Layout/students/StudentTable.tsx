import React, { useState, useEffect } from "react";
import AddCustom from "./AddStudent";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useStudent } from "../../../hooks/useStudent";
import EditModal from "./EditModal";
import { kids } from "../../../Types";
import { useUser } from "../../../hooks/useUser";
import { FaUser } from "react-icons/fa";
import StudentDetailModal from "./StudentDetailModal";
import Dropdown from "../Dropdown";
import { GrView } from "react-icons/gr";
import Table from "../Table"; 
import Tippy from "@tippyjs/react"; 
import "tippy.js/dist/tippy.css"; 

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

  const dropdownOptions = [
    { label: "Mostrar eliminados", value: "showDeleted" },
    { label: "Mostrar activos", value: "showActive" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  const visibleStudents = showDeleted
    ? filteredStudents.filter((student) => student.deleted_at) 
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

  const handleDropdownSelect = async (value: string) => {
    if (value === "showDeleted") {
      setShowDeleted(true);
      await studentDeletedList(); // Llama a tu función para obtener eliminados
    } else {
      setShowDeleted(false);
      // Aquí podrías recargar los estudiantes activos
      await reloadData();
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
        <div className="flex space-x-2 justify-between ">
          {showDeleted ? (
            <button
              className="ml-10"
              onClick={() => openDetailModal(row)}
              data-tip="Ver detalles"
              data-for="detailTooltip"
            >
              <GrView className="h-6 w-6 " />
            </button>
          ) : (
            <>
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
                  <MdDeleteOutline className="h-6 w-6 text-red-600 " />
                </button>
              </Tippy>
            </>
          )}
        </div>
      ),
      width: "100px",
    },
  ];

  const customStyles = {
    table: {
      style: { borderRadius: "12px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
    },
    headCells: {
      style: {
        background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
        color: "#ffffff",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        padding: "13px",
        fontSize: "14px",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f9fafb",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "#ebf4ff",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#edf2f7",
        color: "#4a5568",
        borderRadius: "0 0 12px 12px",
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

      <div className="rounded-lg p-2 flex items-center">
        <FaUser className="text-blue-600 h-6 w-6 mr-2" />
        <span className="text-sm">
          {showDeleted
            ? `Cantidad de estudiantes eliminados: `
            : `Cantidad de estudiantes Activos: `}
          <strong>{studentCount}</strong>
        </span>

        <Dropdown options={dropdownOptions} onSelect={handleDropdownSelect} />
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

      <AddCustom
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

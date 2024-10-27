import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { kids, score, group } from "../../Types";
import Modal from "../Layout/modal/Modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useUser } from "../../hooks/useUser";

export interface Row {
  id: number;
  nombre: string;
  edad: number;
  id_maestra: number;
  genero: string;
  grupo_id: number;
}

interface TableProps {
  students: kids[];
  score: score[];
  group: group[];
}

const Table: React.FC<TableProps> = ({ students, score, group }) => {
  const { userList } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  const findScoreForStudent = (studentId: number) => {
    const studentScore = score.find(
      (s: score) => s.estudiante_id === studentId
    );
    return studentScore ? studentScore.puntuacion : "sin puntos";
  };

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g: group) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
  };

  const findTeacherName = (teacherId: number) => {
    const teacherData = userList.find(
      (user: { id: number }) => user.id === teacherId
    );
    return teacherData ? teacherData.name : "sin maestro";
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row: Row) => row.nombre,
    },
    {
      name: "Edad",
      selector: (row: Row) => row.edad,
    },
    {
      name: "Maestro",
      cell: (row: Row) => findTeacherName(row.id_maestra),
    },
    {
      name: "Género",
      selector: (row: Row) => row.genero,
    },
    {
      name: "Grupo",
      cell: (row: Row) => findGroupName(row.grupo_id),
    },
    {
      name: "Puntuación",
      cell: (row: Row) => findScoreForStudent(row.id),
    },
    {
      name: "Acciones",
      cell: () => (
        <div id="tableButtons">
          <button>
            <MdOutlineEdit className="h-6 w-6" />
          </button>
          <button>
            <MdDeleteOutline className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const customStyles = {
    table: {
      style: {
        borderRadius: "20px",
        overflow: "hidden",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#ebf8ff",
        color: "#2d3748",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        paddingLeft: "24px",
        paddingRight: "24px",
        color: "#4a5568",
      },
    },
    rows: {
      style: {
        backgroundColor: "#ffffff",
        padding: "16px",
        "&:hover": {
          backgroundColor: "#f7fafc",
        },
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

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="flex justify-between mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 px-4 border rounded-full shadow-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
        </div>
        <button onClick={toggleModal} className="btn btn-success">
          <IoAddCircleOutline className="ml-5 h-10 w-10" />
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredStudents}
        pagination
        selectableRows
        customStyles={customStyles}
      />

      <Modal isOpen={isModalOpen} onClose={toggleModal} reloadData={() => {}} />
    </div>
  );
};

export default Table;

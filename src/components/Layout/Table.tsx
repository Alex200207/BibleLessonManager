
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "../Layout/modal/Modal";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useStudent } from "../../hooks/useStudent";

interface Row {
  id: number;
  nombre: string;
  edad: number;
  id_maestra: number;
  genero: string;
  grupo_id: number;
}

const Table: React.FC = () => {
  const { students, score, group, reloadData, deleteStudents } = useStudent();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  const findScoreForStudent = (studentId: number) => {
    const studentScore = score.find((s) => s.estudiante_id === studentId);
    return studentScore ? studentScore.puntuacion : "sin puntos";
  };

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (id: number) => {
    await deleteStudents(id); // Llama a la función de eliminación del hook
    reloadData(); // Recarga la lista de estudiantes después de eliminar
  };

  const columns = [
    { name: "Nombre", selector: (row: Row) => row.nombre },
    { name: "Edad", selector: (row: Row) => row.edad },
    { name: "Género", selector: (row: Row) => row.genero },
    { name: "Grupo", cell: (row: Row) => findGroupName(row.grupo_id) },
    { name: "Puntuación", cell: (row: Row) => findScoreForStudent(row.id) },
    {
      name: "Acciones",
      cell: (row: Row) => (
        <div className="flex space-x-2">
          <button>
            <MdOutlineEdit className="h-6 w-6" />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <MdDeleteOutline className="h-6 w-6 text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        borderRadius: "20px 20px 0 0",
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
    <div className="container mx-auto my-5 p-5 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-10">
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

      <DataTable
        columns={columns}
        data={filteredStudents}
        pagination
        customStyles={customStyles}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        reloadData={reloadData}
      />
    </div>
  );
};

export default Table;
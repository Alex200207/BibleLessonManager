import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

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
    await deleteStudents(id);
    reloadData();
  };

  const columns = [
    { name: "Nombre", selector: (row: Row) => row.nombre },
    { name: "Edad", selector: (row: Row) => row.edad, omit: isMobile },
    { name: "Género", selector: (row: Row) => row.genero, omit: isMobile },
    { name: "Grupo", cell: (row: Row) => findGroupName(row.grupo_id), omit: isMobile },
    { name: "Puntuación", cell: (row: Row) => findScoreForStudent(row.id), omit: isMobile },
    {
      name: "Acciones",
      cell: (row: Row) => (
        <div className="flex space-x-2 justify-between"> {/* Cambiar a justify-between */}
          <button>
            <MdOutlineEdit className="h-6 w-6" />
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <MdDeleteOutline className="h-6 w-6 text-red-600" />
          </button>
        </div>
      ),
      width: '100px', // Establecer un ancho específico para la columna de acciones
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

  // Hook para detectar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambiar 768 por tu breakpoint deseado
    };

    handleResize(); // Verificar el tamaño al cargar el componente
    window.addEventListener("resize", handleResize); // Agregar listener

    return () => window.removeEventListener("resize", handleResize); // Limpiar el listener
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

      <DataTable
        columns={columns.filter(column => !column.omit || column.name === "Nombre" || column.name === "Acciones")} // Mantener Nombre y Acciones
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

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useLesson } from "../../../hooks/useLesson";
import Table from "../Table";
import { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

interface Row {
  id: number;
  tema: string;
  descripcion: string;
  pasaje_biblico: string;
  fecha: Date;
  id_maestra: number;
  id_grupo: number;
}

const Lesson = () => {
  const { lessons } = useLesson();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    {
      name: "Tema",
      selector: (row: Row) => row.tema,
      cell: (row: Row) => (
        <div className="whitespace-normal break-words">{row.tema}</div>
      ),
    },
    {
      name: "Descripcion",
      selector: (row: Row) => row.descripcion,
      omit: isMobile,
    },
    {
      name: "Pasaje",
      selector: (row: Row) => row.pasaje_biblico,
      omit: isMobile,
    },
    {
      name: "Fecha",
      cell: (row: Row) => row.fecha,
      omit: isMobile,
    },
    {
      name: "Maestr@",
      cell: (row: Row) => row.id_maestra,
      omit: isMobile,
    },
    {
      name: "Grupo",
      cell: (row: Row) => row.id_grupo,
      omit: isMobile,
    },
    {
      name: "Acciones",
      cell: (row: Row) => (
        <div className="flex space-x-2 justify-between ">
          <button>
            <MdOutlineEdit className="h-6 w-6" />
          </button>
          <button>
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

  return (
    <>
      <div className="container mx-auto my-5 p-2 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-10">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md"
          />
        </div>
        <Table columns={columns} data={lessons} customStyles={customStyles} />
      </div>
    </>
  );
};

export default Lesson;

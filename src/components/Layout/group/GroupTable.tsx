import { useGroup } from "../../../hooks/useGroup";
import Table from "../Table";
import { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface Row {
    id: number;
    nombre: string;
    descripcion: string;
    deleted_at?: Date;

}

const GroupTable:React.FC = () => {
  const { group , } = useGroup();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const filteredLesson = group.filter(
    (g) =>
      g.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.id.toString().includes(searchTerm)
  );



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
      name: "Nombre",
      selector: (row: Row) => row.nombre,
      cell: (row: Row) => (
        <div className="whitespace-normal break-words">{row.nombre}</div>
      ),
    },
    {
      name: "Descripcion",
      selector: (row: Row) => row.descripcion,
      omit: isMobile,
    },
    
    {
      name: "Acciones",
      cell: () => (
        <div className="flex space-x-2 justify-between ">
          <button>
            <MdOutlineEdit className="h-6 w-6" />
          </button>
          <button  >
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md"
          />
          <Tippy content="Agregar" placement="top">
            <button  className="btn btn-success">
              <IoAddCircleOutline className="ml-5 h-10 w-10" />
            </button>
          </Tippy>
        </div>
        <Table columns={columns} data={filteredLesson} customStyles={customStyles} />
      </div>
    </>
  );
};

export default GroupTable;

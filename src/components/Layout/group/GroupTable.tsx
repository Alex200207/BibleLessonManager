import { useGroup } from "../../../hooks/useGroup";
import Table from "../Table";
import { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useUser } from "../../../hooks/useUser";

interface Row {
  id: number;
  nombre: string;
  descripcion: string;
  deleted_at?: Date;
}

const GroupTable: React.FC = () => {
  const { group } = useGroup();
  const {user} =useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const filteredLesson = group.filter((g) => {
    if (user.role === "admin") {
      return true; // Mostrar todas las lecciones si es administrador
    }
    return g.id === user.id; // Mostrar solo las lecciones asignadas al usuario
  }).filter((g) => {
    return g.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
           g.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

  });

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
                {user.permissions.some((perm) =>
                  ["editar", "eliminar"].includes(perm)
                ) ? (
                  <>
                    <button>
                      <MdOutlineEdit className="h-6 w-6" />
                    </button>
                    <button>
                      <MdDeleteOutline className="h-6 w-6 text-red-600" />
                    </button>
                  </>
                ) : (
                  <div>Sin Acceso</div>
                )}
              </div>
            ),
      width: "100px",
    },
  ];
  const customStyles = {
    table: {
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      },
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
        padding: "16px",
        fontSize: "14px",
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

          {user.permissions.includes("crear") && (
            <Tippy content="Agregar" placement="top">
              <button  className="btn btn-success">
                <IoAddCircleOutline className="ml-5 h-10 w-10" />
              </button>
            </Tippy>
          )}
        </div>
        <Table
          columns={columns}
          data={filteredLesson}
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default GroupTable;

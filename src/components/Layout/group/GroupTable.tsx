import { useGroup } from "../../../hooks/useGroup";
import Table from "../Table";
import { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useUser } from "../../../hooks/useUser";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

interface Row {
  id: number;
  nombre: string;
  descripcion: string;
  deleted_at?: Date;
}

const GroupTable: React.FC = () => {
  const { group } = useGroup();
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const filteredLesson = group
    .filter((g) => {
      if (user.role === "admin") {
        return true; // Mostrar todas las lecciones si es administrador
      }
      return g.id === user.id; // Mostrar solo las lecciones asignadas al usuario
    })
    .filter((g) => {
      return (
        g.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
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

  return (
    <>
      <div className="container mx-auto my-5 p-2  z-10">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md dark:bg-zinc-900 dark:text-gray-200"
          />

          {user.permissions.includes("crear") && (
            <Tippy content="Agregar" placement="top">
              <button className="btn btn-success">
                <IoAddCircleOutline className="ml-5 h-10 w-10" />
              </button>
            </Tippy>
          )}
        </div>

        <div>
          {/* Mostrar Skeleton mientras carga */}
          {group.length === 0 ? (
            <Skeleton
              count={5}
              height={50}
              className="mb-2 dark:bg-slate-700 bg-slate-300 animate-pulse"
            />
          ) : (
            <Table columns={columns} data={filteredLesson} />
          )}
        </div>
      </div>
    </>
  );
};

export default GroupTable;

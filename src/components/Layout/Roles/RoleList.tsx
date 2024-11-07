import { useRole } from "../../../hooks/useRole";
import Table from "../Table";
import { useState, useEffect } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { Role } from "../../../Types";
import { GrView } from "react-icons/gr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { IoCloseOutline } from "react-icons/io5";

const RoleList: React.FC = () => {
  const { roles } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Filtrar roles según el término de búsqueda
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.id.toString().includes(searchTerm)
  );

  const showDeleted = false; // Para manejar roles eliminados (se puede modificar si lo necesitas)

  const visibleRoles = showDeleted
    ? filteredRoles.filter((role) => role.deleted_at)
    : filteredRoles.filter((role) => !role.deleted_at);

  // Cambiar la visibilidad de la barra lateral
  const toggleSidebar = (role: Role) => {
    setSelectedRole(role);
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      selector: (row: Role) => row.name,
      cell: (row: Role) => (
        <div className="whitespace-normal break-words">{row.name}</div>
      ),
    },
    {
      name: "Permisos",
      selector: (row: Role) => row.guard,
      omit: isMobile,
    },
    {
      name: "Acciones",
      cell: (row: Role) => (
        <div className="flex space-x-2 justify-between">
          <button
            onClick={() => toggleSidebar(row)} // Abrir barra lateral
            data-tip="Ver detalles"
            data-for="detailTooltip"
            className="text-blue-500"
          >
            <GrView className="h-6 w-6" />
          </button>

          <Tippy content="Editar" placement="top">
            <button>
              <MdOutlineEdit className="h-6 w-6" />
            </button>
          </Tippy>
          <Tippy content="Eliminar" placement="top">
            <button>
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

  return (
    <div className="container mx-auto my-5 p-2 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-10">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar roles..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md"
        />
      </div>
      <Table
        data={visibleRoles}
        columns={columns}
        customStyles={customStyles}
      />
      {isSidebarOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/3 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Detalles del Rol
            </h2>
            {selectedRole && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Nombre:</strong> {selectedRole.name}
                </p>
                <p className="text-gray-700">
                  <strong>Guard:</strong> {selectedRole.guard}
                </p>
                <p className="text-gray-700">
                  <strong>Actualizado el:</strong>{" "}
                  {selectedRole.updated_at?.toLocaleDateString()}
                </p>
                <hr />
                <p className="text-gray-700">
                  <strong>Eliminado el:</strong>{" "}
                  {selectedRole.deleted_at
                    ? selectedRole.deleted_at.toLocaleDateString()
                    : "No disponible"}
                </p>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                className="border border-red-500 text-red-500 py-2 px-4 rounded-lg shadow hover:transition duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <IoCloseOutline className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleList;

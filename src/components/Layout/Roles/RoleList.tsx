import React, { useState, useEffect } from "react";
import { Role } from "../../../Types";
import Table from "../Table";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { IoCloseOutline } from "react-icons/io5";
import { useRole } from "../../../hooks/useRole";
import RoleDetailModal from "./RoleDetailModal";
import Skeleton from "react-loading-skeleton";

const RoleList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { roles } = useRole();

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.id.toString().includes(searchTerm)
  );

  const showDeleted = false;

  const visibleRoles = showDeleted
    ? filteredRoles.filter((role) => role.deleted_at)
    : filteredRoles.filter((role) => !role.deleted_at);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openDetailModal = (role: Role) => {
    if (isMobile) {
      setSelectedRole(role);
      setIsDetailModalOpen(true);
    }
  };

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
      selector: (row: Role) => row.permissions?.length || 0, //mostramos la cantidad de permisos de cada rol
      cell: (row: Role) => (
        <div className="text-gray-800 font-extrabold bg-lime-400 w-5 h-5 rounded-full">{row.permissions ? row.permissions.length : 0}</div>
      ),
      omit: isMobile,
    },
    {
      name: "Actualizado el",
      selector: (row: Role) => row.updated_at,
      cell: (row: Role) => (
        <div className="whitespace-normal break-words">
          {row.updated_at
            ? new Date(row.updated_at).toLocaleDateString()
            : "No disponible"}
        </div>
      ),
      omit: isMobile,
    },
    {
      name: "Acciones",
      cell: (row: Role) => (
        <div className="flex space-x-2 justify-between">
          {showDeleted ? (
            <button
              onClick={() => openDetailModal(row)}
              data-for="detailTooltip"
              className="text-blue-500"
            >
              <GrView className="h-6 w-6" />
            </button>
          ) : (
            <>
              {isMobile && (
                <Tippy content="Ver detalles" placement="top">
                  <button onClick={() => openDetailModal(row)}>
                    <GrView className="h-6 w-6 text-blue-500" />
                  </button>
                </Tippy>
              )}
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
            </>
          )}
        </div>
      ),
      width: "100px",
    },
  ];

  return (
    <div className="container mx-auto my-5 p-2  z-10">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar roles..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md dark:bg-zinc-900 dark:text-gray-200"
        />
      </div>

      <div>
        {/* Mostrar Skeleton mientras carga */}
        {roles.length === 0 ? (
          <Skeleton
            count={5}
            height={50}
            className="mb-2 dark:bg-slate-700 bg-slate-300 animate-pulse"
          />
        ) : (
          <Table data={visibleRoles} columns={columns} />
        )}
      </div>
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
                  <strong>Permisos:</strong>{" "}
                  {selectedRole.permissions?.length || 0}
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
      <RoleDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        roles={selectedRole}
      />
    </div>
  );
};

export default RoleList;

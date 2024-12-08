import React, { useState, useEffect } from "react";
import Table from "../Table";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import Tippy from "@tippyjs/react";
import { IoAddCircleOutline } from "react-icons/io5";
import "tippy.js/dist/tippy.css";
import { IoCloseOutline } from "react-icons/io5";
import { useUser } from "../../../hooks/useUser";
import { useRole } from "../../../hooks/useRole";
import AddUserModal from "./AddUserModal";
import Skeleton from "react-loading-skeleton";
import AddModal from "../modal/AddModal";
import FormEditUser from "./FormEditUser";
import { users } from "../../../Types";

const UserTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<users | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectUserRole, setSelectUserRole] = useState<users | null>(null);
  //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { userList: user, reloadData, deleteUsersData } = useUser();
  const { roles } = useRole();

  console.log(setSelectedUser);

  const filteredRoles = user.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toString().includes(searchTerm)
  );

  const showDeleted = false;

  const visibleRoles = showDeleted
    ? filteredRoles.filter((user) => user.deleted_at)
    : filteredRoles.filter((user) => !user.deleted_at);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const findRoleName = (userRoleId: number) => {
    const roleData = user.find((r) => r.id === userRoleId);
    return roleData ? roleData.role : "sin Rol asignado";
  };

  const openDetailModal = (user: users) => {
    if (isMobile) {
      setSelectedUser(user);
      // setIsDetailModalOpen(true);
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = async (id: number) => {
    await deleteUsersData(id);
    reloadData();
  };

  const openEditModal = (user: users) => {
    const userRole: users = {
      id: user.id,
      name: user.name,
      updated_at: user.updated_at,
      password: user.password,
      role_id: user.role_id,
      email: "",
      role: "",
    };
    setSelectUserRole(userRole);
    setIsOpen(true);
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row: users) => row.name,
      cell: (row: users) => (
        <div className="whitespace-normal break-words">{row.name}</div>
      ),
    },
    {
      name: "Rol",
      selector: (row: users) => row.id, // Asegúrate de que el `user` tenga un campo `role_id`
      cell: (row: users) => (
        <div className="whitespace-normal break-words">
          {findRoleName(row.id)} {/* Pasamos el role_id de cada usuario */}
        </div>
      ),
    },
    {
      name: "Actualizado el",
      selector: (row: users) => row.updated_at,
      cell: (row: users) => (
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
      cell: (row: users) => (
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
                <button onClick={() => openEditModal(row)}>
                  <MdOutlineEdit className="h-6 w-6" />
                </button>
              </Tippy>
              <Tippy content="Eliminar" placement="top">
                <button onClick={() => handleDelete(row.id)}>
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
        <Tippy content="Agregar" placement="top">
          <button onClick={toggleModal} className="btn btn-success">
            <IoAddCircleOutline className="ml-5 h-10 w-10" />
          </button>
        </Tippy>
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
            {selectedUser && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Nombre:</strong> {selectedUser.name}
                </p>
                <p className="text-gray-700">
                  <strong>Actualizado el:</strong>{" "}
                  {selectedUser.updated_at?.toLocaleDateString()}
                </p>
                <hr />
                <p className="text-gray-700">
                  <strong>Eliminado el:</strong>{" "}
                  {selectedUser.deleted_at
                    ? selectedUser.deleted_at.toLocaleDateString()
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
      {/* <RoleDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        roles={selectedUser}
      /> */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        reloadData={reloadData}
      />
      <AddModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Editar Usuario"
      >
        {selectUserRole && (
          <FormEditUser
            role={selectUserRole}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AddModal>
    </div>
  );
};

export default UserTable;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Role } from "../Types";
import RoleList from "../components/Layout/Roles/RoleList";
import { IoMdPersonAdd } from "react-icons/io";

const initialRoles: Role[] = [
  { id: 1, name: "Super Admin", guard: "web", permissions: [] },
  { id: 2, name: "Maestro", guard: "web", permissions: [] },
];

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(setRoles)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Link to="/addRole">
          <button className="rounded transparent text-black px-4 py-2">
          <IoMdPersonAdd  className="h-10 w-10"/>
          </button>
        </Link>
      </div>

      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar roles..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded p-2 w-full md:w-1/2"
        />
      </div>

      
      <RoleList roles={filteredRoles} />
    </div>
  );
};

export default RolesPage;

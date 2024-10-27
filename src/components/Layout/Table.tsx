// src/components/Table.tsx
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {  score, group } from "../../Types";
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
  const { students, score, group, reloadData } = useStudent();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  const findScoreForStudent = (studentId: number) => {
    const studentScore = score.find((s: score) => s.estudiante_id === studentId);
    return studentScore ? studentScore.puntuacion : "sin puntos";
  };

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g: group) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const columns = [
    { name: "Nombre", selector: (row: Row) => row.nombre },
    { name: "Edad", selector: (row: Row) => row.edad },
    { name: "Género", selector: (row: Row) => row.genero },
    { name: "Grupo", cell: (row: Row) => findGroupName(row.grupo_id) },
    { name: "Puntuación", cell: (row: Row) => findScoreForStudent(row.id) },
    {
      name: "Acciones",
      cell: () => (
        <div>
          <button><MdOutlineEdit className="h-6 w-6" /></button>
          <button><MdDeleteOutline className="h-6 w-6" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto my-5 p-5">
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
        customStyles={{ table: { style: { borderRadius: "20px" } } }}
      />

      <Modal isOpen={isModalOpen} onClose={toggleModal} reloadData={reloadData} />
    </div>
  );
};

export default Table;

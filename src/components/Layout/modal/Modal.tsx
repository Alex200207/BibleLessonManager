import React, { useState } from "react";
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid' // Asegúrate de tener instalada la biblioteca de Heroicons

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("");
  const [maestra, setMaestra] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");

  if (!isOpen) return null;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log({ nombre, grupo, maestra, edad, genero });
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-semibold text-gray-800">Agregar Estudiante</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Nombre del Estudiante"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Grupo</label>
            <input
              type="text"
              placeholder="Grupo"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maestra</label>
            <input
              type="text"
              placeholder="Nombre de la Maestra"
              value={maestra}
              onChange={(e) => setMaestra(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              type="number"
              placeholder="Edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Género</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="flex justify-between col-span-1 md:col-span-2 mt-6">
            <button
              type="submit"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              <XCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

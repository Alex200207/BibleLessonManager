import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos predeterminados de Quill

interface FormAddGroupProps {
  onClose: () => void;
}

const FormAddGroup: React.FC<FormAddGroupProps> = ({ onClose }) => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    
  };

  return (
    <form className="max-w-2xl mx-auto  bg-white rounded-lg  dark:bg-gray-800 md:w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Agregar Grupo
      </h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Ingrese el nombre del grupo"
          required
        />
      </div>

      {/* Descripción con React-Quill */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Descripción
        </label>
        <ReactQuill
          value={description}
          placeholder="Agrega información del grupo"
          onChange={handleDescriptionChange}
          theme="snow" 
          className="bg-white  dark:bg-gray-700 dark:text-gray-100 h-max-32  "
        />
      </div>

      <div className="mb-4 ">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Maestro
        </label>
        <select
          name="teacher_id"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          <option value={0} disabled>
            Seleccionar Maestro
          </option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Leccion
        </label>
        <select
          name="teacher_id"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          <option value={0} disabled>
            Seleccionar Leccion
          </option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormAddGroup;

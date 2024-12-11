import React, { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useStudent } from "../../../hooks/useStudent";
import { lesson } from "../../../Types";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useLesson } from "../../../hooks/useLesson";
import { IoIosArrowRoundBack } from "react-icons/io";

const EditLesson: React.FC = () => {
  const { group } = useStudent();
  const { editLessonData, reloadData } = useLesson();
  const navigate = useNavigate();
  const location = useLocation();

  const lessonData = location.state?.lesson; // Obtener la lección pasada desde Link

  const [editedLesson, setEditedLesson] = useState<lesson>(
    lessonData || {
      id: 0,
      tema: "",
      descripcion: "",
      pasaje_biblico: "",
      id_grupo: 0,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      estado: 0,
    }
  );

  useEffect(() => {
    if (lessonData) {
      setEditedLesson(lessonData);
    }
  }, [lessonData]);

  const handleEditSave = async (updatedData: lesson) => {
    try {
      await editLessonData(updatedData.id, updatedData);
      reloadData();
      navigate("/lesson");
    } catch (error) {
      console.error("Error al guardar la lección:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setEditedLesson((prev) => ({ ...prev, descripcion: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEditSave(editedLesson);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between  mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Editar Lección</h2>
        <label
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/lesson")}
        >
          <IoIosArrowRoundBack className="w-10 h-10" />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Tema
          </label>
          <input
            type="text"
            name="tema"
            placeholder="Tema de la lección"
            value={editedLesson.tema}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Grupo
          </label>
          <select
            name="id_grupo"
            value={editedLesson.id_grupo}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          >
            <option value="">Seleccione un grupo</option>
            {group.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Descripción
          </label>
          <div className="overflow-auto">
            <ReactQuill
              value={editedLesson.descripcion}
              onChange={handleDescriptionChange}
              className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs dark:bg-slate-600 dark:border-slate-500 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Pasaje
          </label>
          <input
            type="text"
            name="pasaje_biblico"
            placeholder="Texto de la lección"
            value={editedLesson.pasaje_biblico}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="fecha_inicio"
            value={moment(editedLesson.fecha_inicio).format("YYYY-MM-DD")}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Fecha de Fin
          </label>
          <input
            type="date"
            name="fecha_fin"
            value={moment(editedLesson.fecha_fin).format("YYYY-MM-DD")}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <CiSaveDown2 className="h-4 w-4 mr-2" aria-hidden="true" />
            Guardar
          </button>
          <button
            type="button"
            onClick={() => navigate("/lesson")}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            <IoMdClose className="h-4 w-4 mr-2" aria-hidden="true" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLesson;

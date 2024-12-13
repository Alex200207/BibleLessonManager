import { useEffect, useState } from "react";
import { lesson } from "../Types";
import { getLesson, addLesson, deleteLesson, editLesson } from "../services/lessonService";
import Swal from "sweetalert2"; // Importa SweetAlert2

export const useLesson = () => {
  const [lessons, setLessons] = useState<lesson[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const lessonData = await getLesson();
      setLessons(lessonData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const createLesson = async (newLesson: lesson) => {
    try {
      await addLesson(newLesson);
      reloadData();
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  const deletedLesson = async (id: lesson["id"]) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Se eliminará esta Lección!",
      icon: "warning",
      input: 'text',
      inputPlaceholder: 'Escribe "CONFIRMAR" para eliminar',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
      preConfirm: (inputValue) => {
        if (inputValue !== 'CONFIRMAR') {
          Swal.showValidationMessage('Debes escribir "CONFIRMAR" para eliminar');
          return false;
        }
        return true;
      }
    });

    if (result.isConfirmed) {
      try {
        await deleteLesson(id);
        Swal.fire("Eliminado!", "La lección ha sido eliminada.", "success");
        const lessonData = await getLesson();
        setLessons(lessonData);
      } catch (error) {
        Swal.fire("Error!", "No se pudo eliminar la lección.", "error");
        console.error("Error al eliminar la lección:", error);
      }
    } else {
      Swal.fire("Cancelado", "La lección no ha sido eliminada", "info");
    }
  };
  const editLessonData = async (id: lesson["id"], updatedLesson: lesson) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas guardar los cambios realizados en este estudiante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await editLesson(id, updatedLesson);
        Swal.fire("Guardado!", "Los cambios han sido guardados.", "success");
        const studentsData = await getLesson();
        setLessons(studentsData);
      } catch (error) {
        Swal.fire("Error!", "No se pudieron guardar los cambios.", "error");
        console.error("Error al editar el estudiante:", error);
      }
    } else {
      Swal.fire("Cancelado", "Los cambios no han sido guardados", "info");
    }
  };

  return {
    lessons,
    reloadData,
    createLesson,
    deletedLesson,
    editLessonData,
  };
};

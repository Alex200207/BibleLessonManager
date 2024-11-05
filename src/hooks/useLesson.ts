import { useEffect, useState } from "react";
import { lesson } from "../Types";
import { getLesson, addLesson, deleteLesson } from "../services/lessonService";
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
      text: "¡Se eliminara esta Leccion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteLesson(id);
        Swal.fire("Eliminado!", "El estudiante ha sido eliminado.", "success");
        const studentsData = await getLesson();
        setLessons(studentsData);
      } catch (error) {
        Swal.fire("Error!", "No se pudo eliminar el estudiante.", "error");
        console.error("Error al eliminar el estudiante:", error);
      }
    } else {
      Swal.fire("Cancelado", "El estudiante no ha sido eliminado", "info");
    }
  };

  return {
    lessons,
    reloadData,
    createLesson,
    deletedLesson,
  };
};

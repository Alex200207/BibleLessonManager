import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { lesson } from "../Types";
import { useLesson } from "./useLesson";

const MySwal = withReactContent(Swal);

export const useLessonModal = () => {
  const { createLesson, reloadData } = useLesson();
  const [newLesson, setNewLesson] = useState<lesson>({
    id: 0,
    tema: "",
    descripcion: "",
    pasaje_biblico: "",
    id_maestra: 0,
    id_grupo: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewLesson((prev) => ({
      ...prev,
      [name]:
        name === "id_grupo" || name === "id_maestra"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (onClose: () => void) => {
    onClose();
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres agregar esta lección?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await createLesson(newLesson);
        await MySwal.fire({
          title: "¡Éxito!",
          text: "Lección agregada exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });

        setNewLesson({
          id: 0,
          tema: "",
          descripcion: "",
          pasaje_biblico: "",
          id_maestra: 0,
          id_grupo: 0,
        });

        reloadData();
        onClose();
      } catch (error) {
        await MySwal.fire({
          title: "Error",
          text: error instanceof Error ? error.message : "Error desconocido",
          icon: "error",
        });
      }
    }
  };

  return {
    newLesson,
    handleInputChange,
    handleSubmit,
  };
};

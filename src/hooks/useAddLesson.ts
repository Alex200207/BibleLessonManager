import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { lesson } from "../Types";
import { useLesson } from "./useLesson";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

export const useLessonModal = () => {
  const { createLesson, reloadData } = useLesson();
  const [newLesson, setNewLesson] = useState<lesson>({
    id: 0,
    tema: "",
    descripcion: "",
    pasaje_biblico: "",
    estado: 1,
    fecha_inicio: undefined,
    fecha_fin: undefined,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "fecha_inicio" || name === "fecha_fin") {
      setNewLesson((prevLesson) => ({
        ...prevLesson,
        [name]: value ? new Date(value) : undefined,
      }));
    } else {
      setNewLesson((prevLesson) => ({
        ...prevLesson,
        [name]: value,
      }));
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (onClose: () => void) => {
    
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
          estado: 1,
          fecha_inicio: undefined,
          fecha_fin: undefined,
        });

        reloadData();
        onClose();
        navigate("/lesson");
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
    setNewLesson,
  };
};

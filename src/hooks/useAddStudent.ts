// src/hooks/useStudentModal.ts
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { kids } from "../Types";
import { useStudent } from "./useStudent";

const MySwal = withReactContent(Swal);

export const useStudentModal = () => {
  const { createKid, reloadData } = useStudent();
  const [newStudent, setNewStudent] = useState<kids>({
    id: 0,
    nombre: "",
    edad: 0,
    id_maestra: 0,
    genero: "",
    grupo_id: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: name === "grupo_id" || name === "id_maestra" || name === "edad"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (onClose: () => void) => {
    onClose()
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres agregar este estudiante?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await createKid(newStudent);
        await MySwal.fire({
          title: "¡Éxito!",
          text: "Estudiante agregado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });

        setNewStudent({
          id: 0,
          nombre: "",
          edad: 0,
          id_maestra: 0,
          genero: "",
          grupo_id: 0,
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
    newStudent,
    handleInputChange,
    handleSubmit,
  };
};

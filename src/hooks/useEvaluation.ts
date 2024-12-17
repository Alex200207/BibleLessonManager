import { useEffect, useState } from "react";
import {} from "../services/evaluationService";
import { Evaluaciones } from "../Types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createEvaluation } from "../services/evaluationService";

const MySwal = withReactContent(Swal);

export const useEvaluation = () => {
  const [reload, setReload] = useState(false);
  const [evaluate, setEvaluate] = useState<Evaluaciones>({
    id: 0,
    maestro_id: 0,
    leccion_id: 0,
    titulo: "",
    descripcion: "",
    tipo_evaluacion_id: 0,
    fecha_creacion: new Date(),
    cuestionarios: [],
  });

  useEffect(() => {}, [reload]);

  const createEvaluationData = async (newEvaluate: Evaluaciones) => {
    try {
      await createEvaluation(newEvaluate);
      reloadData();
    } catch (error) {
      console.error("Error al crear el grupo:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
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
        await createEvaluation(evaluate);
        await MySwal.fire({
          title: "¡Éxito!",
          text: "Lección agregada exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });

        setEvaluate({
          id: 0,
          maestro_id: 0,
          leccion_id: 0,
          titulo: "",
          descripcion: "",
          tipo_evaluacion_id: 0,
          fecha_creacion: new Date(),
          cuestionarios: [],
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
    createEvaluationData,
    reloadData,
    handleSubmit,
  };
};

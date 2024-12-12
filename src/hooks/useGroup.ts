import { useState, useEffect } from "react";
import { getGroup } from "../services/studentService";
import { addGroup } from "../services/groupService";
import { group } from "../Types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const useGroup = () => {
  const [group, setGroup] = useState<group[]>([]);
  const [reload, setReload] = useState(false);
  const [newGroup, setNewGroup] = useState<group>({
    id: 0,
    nombre: "",
    descripcion: "",
    maestro_id: 0,
    leccion_id: 0,
  });

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const studentsData = await getGroup();
      setGroup(studentsData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const createGroup = async (newGroup: group) => {
    try {
      await addGroup(newGroup);
      reloadData();
    } catch (error) {
      console.error("Error al crear el grupo:", error);
    }
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
        await createGroup(newGroup);
        await MySwal.fire({
          title: "¡Éxito!",
          text: "Lección agregada exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });

        setNewGroup({
          id: 0,
          nombre: "",
          descripcion: "",
          maestro_id: 0,
          leccion_id: 0,
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    group,
    reloadData,
    handleSubmit,
    newGroup,
    setNewGroup,
    handleInputChange,
  };
};

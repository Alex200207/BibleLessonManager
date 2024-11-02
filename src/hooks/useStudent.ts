import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import {
  getStudents,
  getScore,
  getGroup,
  addKid,
  deleteStudent,
  editStudent,
  restoreStudent,
  getDeletedStudents

} from "../services/studentService";
import { kids, score as scoreType, group as groupType } from "../Types/index";

export const useStudent = () => {
  const [students, setStudents] = useState<kids[]>([]);
  const [score, setScore] = useState<scoreType[]>([]);
  const [group, setGroup] = useState<groupType[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchData();
    getGroupData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const studentsData = await getStudents();
      setStudents(studentsData);

      const scoreData = await getScore();
      setScore(scoreData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const deleteStudents = async (id: kids["id"]) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás recuperar este estudiante después de eliminarlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteStudent(id);
        Swal.fire("Eliminado!", "El estudiante ha sido eliminado.", "success");
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        Swal.fire("Error!", "No se pudo eliminar el estudiante.", "error");
        console.error("Error al eliminar el estudiante:", error);
      }
    } else {
      Swal.fire("Cancelado", "El estudiante no ha sido eliminado", "info");
    }
  };

  const getGroupData = async () => {
    try {
      const groupData = await getGroup();
      setGroup(groupData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const createKid = async (newKid: kids) => {
    try {
      await addKid(newKid);
      reloadData();
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
    }
  };

  const editStudentData = async (id: kids["id"], updatedStudent: kids) => {
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
        await editStudent(id, updatedStudent);
        Swal.fire("Guardado!", "Los cambios han sido guardados.", "success");
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (error) {
        Swal.fire("Error!", "No se pudieron guardar los cambios.", "error");
        console.error("Error al editar el estudiante:", error);
      }
    } else {
      Swal.fire("Cancelado", "Los cambios no han sido guardados", "info");
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  const restoreStudentData = async (id: kids["id"]) => {
    const result = await Swal.fire({
      title: "¿Quieres restaurar este estudiante?",
      text: "El estudiante será restaurado.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await restoreStudent(id);
        Swal.fire(
          "Restaurado!",
          "El estudiante ha sido restaurado.",
          "success"
        );
        reloadData();
      } catch (error) {
        Swal.fire("Error!", "No se pudo restaurar el estudiante.", "error");
        console.error("Error al restaurar el estudiante:", error);
      }
    } else {
      Swal.fire("Cancelado", "El estudiante no ha sido restaurado", "info");
    }
  };

  const studentDeletedList = async () => {
    try {
      const deletedStudents = await getDeletedStudents();
      setStudents(deletedStudents); 
    } catch (error) {
      console.error("Error al obtener los estudiantes eliminados:", error);
    }
  };


  return {
    students,
    score,
    group,
    createKid,
    reloadData,
    deleteStudents,
    editStudentData,
    restoreStudentData,
    studentDeletedList,
  };
};

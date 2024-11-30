import React, { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Table from "../Table";
import { useLesson } from "../../../hooks/useLesson";
import { useStudent } from "../../../hooks/useStudent";
import { useUser } from "../../../hooks/useUser";
import AddLessonModal from "./AddLessonModal";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Row {
  id: number;
  tema: string;
  descripcion: string;
  pasaje_biblico: string;
  fecha: Date;
  id_maestra: number;
  id_grupo: number;
}

const Lesson: React.FC = () => {
  const { lessons, reloadData, deletedLesson } = useLesson();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { group } = useStudent();
  const { userList, user } = useUser();
  const [isMobile, setIsMobile] = useState(false);

  const filteredLesson = lessons
    .filter((lesson) => {
      if (user.role === "admin") {
        return true; // Mostrar todas las lecciones si es administrador
      }
      return lesson.id_maestra === user.id; // Mostrar solo las lecciones asignadas al usuario
    })
    .filter((lesson) => {
      return (
        lesson.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.pasaje_biblico.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const dateFormater = (date: Date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const findTeacherForStudent = (teacherId: number) => {
    const teacher = userList.find((u) => u.id === teacherId);
    return teacher ? teacher.name : "sin maestro";
  };

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (id: number) => {
    await deletedLesson(id);
    reloadData();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    {
      name: "Tema",
      selector: (row: Row) => row.tema,
      cell: (row: Row) => (
        <div className="whitespace-normal break-words">{row.tema}</div>
      ),
    },
    {
      name: "Descripcion",
      selector: (row: Row) => row.descripcion,
      omit: isMobile,
    },
    {
      name: "Pasaje",
      selector: (row: Row) => row.pasaje_biblico,
      omit: isMobile,
    },
    {
      name: "Fecha",
      cell: (row: Row) => dateFormater(row.fecha),
      omit: isMobile,
    },
    {
      name: "Maestr@",
      cell: (row: Row) => findTeacherForStudent(row.id_maestra),
      omit: isMobile,
    },
    {
      name: "Grupo",
      cell: (row: Row) => findGroupName(row.id_grupo),
      omit: isMobile,
    },
    {
      name: "Acciones",
      cell: (row: Row) =>
        user.permissions.some((perm) =>
          ["editar", "eliminar"].includes(perm)
        ) ? (
          <div className="flex space-x-2 justify-between">
            {user.permissions.includes("editar") && (
              <button>
                <MdOutlineEdit className="h-6 w-6" />
              </button>
            )}
            {user.permissions.includes("eliminar") && (
              <button onClick={() => handleDelete(row.id)}>
                <MdDeleteOutline className="h-6 w-6 text-red-600" />
              </button>
            )}
          </div>
        ) : (
          <span>Sin Acceso</span>
        ),
      width: "100px",
    },
  ];

  return (
    <>
      <div className="container mx-auto my-5 p-2  text-gray-800 border-none z-10">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md dark:bg-zinc-900 dark:text-gray-200"
          />

          {user.permissions.includes("crear") && (
            <Tippy content="Agregar" placement="top">
              <button onClick={toggleModal} className="btn btn-success">
                <IoAddCircleOutline className="ml-5 h-10 w-10" />
              </button>
            </Tippy>
          )}
        </div>

        {/* Mostrar Skeleton mientras carga */}
        {lessons.length === 0 ? (
          <Skeleton
            count={5}
            height={50}
            className="mb-2 dark:bg-slate-700 bg-slate-300 animate-pulse"
          />
        ) : (
          <Table columns={columns} data={filteredLesson} />
        )}
      </div>

      <AddLessonModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        reloadData={reloadData}
      />
    </>
  );
};

export default Lesson;

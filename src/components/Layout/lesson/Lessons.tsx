import React, { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Table from "../Table";
import { useLesson } from "../../../hooks/useLesson";
import { useStudent } from "../../../hooks/useStudent";
import { useUser } from "../../../hooks/useUser";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LessonDetailModal from "./LessonDetailModal";
import { lesson } from "../../../Types";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";

interface Row {
  id: number;
  tema: string;
  descripcion: string;
  pasaje_biblico: string;
  fecha: Date;
  id_maestra: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: number;
}

const Lesson: React.FC = () => {
  const { lessons, reloadData, deletedLesson } = useLesson();
  const [searchTerm, setSearchTerm] = useState("");
  const { group } = useStudent();
  const { userList, user } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<lesson | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredLesson = lessons
    .filter((lesson) => {
      // If the user is an admin, show all lessons
      if (user.role === "admin") {
        return true;
      }

      // Otherwise, only show lessons assigned to the user's group
      if (lessons && lessons.length > 0) {
        // Filter based on the user's group
        return lessons.find((g) => g.id === lesson.id);
      }

      // If no group or no lesson found, return false
      return false;
    })
    .filter((lesson) => {
      // Perform search filtering based on the input search term
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

  const findTeacherForStudent = (teacherId: number): string => {
    // Encuentra el grupo correspondiente al estudiante
    const groupData = group.find((g) => g.id === teacherId); // Asegúrate que 'id' sea la propiedad correcta del grupo
    if (groupData) {
      // Busca el maestro asignado al grupo
      const teacher = userList.find((user) => user.id === groupData.maestro_id); // Asegúrate que 'maestro_id' sea la propiedad correcta
      return teacher ? teacher.name : "Sin maestro"; // Devuelve el nombre del maestro si existe
    }
    // Si no se encuentra el grupo, devuelve un mensaje predeterminado
    return "Sin maestro";
  };

  const findGroupName = (groupId: number) => {
    const groupData = group.find((g) => g.id === groupId);
    return groupData ? groupData.nombre : "sin grupo";
  };

  const handleDelete = async (id: number) => {
    await deletedLesson(id);
    reloadData();
  };
  const openDetailModal = (lessons: lesson) => {
    setSelectedLesson(lessons);
    setIsDetailModalOpen(true);
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
      name: "Pasaje",
      selector: (row: Row) => row.pasaje_biblico,
      omit: isMobile,
    },
    {
      name: "Maestr@",
      cell: (row: Row) => findTeacherForStudent(row.id_maestra),
      omit: isMobile,
    },
    {
      name: "Grupo",
      cell: (row: Row) => findGroupName( row.id_maestra),
      omit: isMobile,
    },

    {
      name: "Fecha Inicio",
      cell: (row: Row) => dateFormater(row.fecha_inicio),
      omit: isMobile,
    },
    {
      name: "Fecha Fin",
      cell: (row: Row) => dateFormater(row.fecha_fin),
      omit: isMobile,
    },
    {
      name: "Estado",
      selector: (row: Row) => row.estado,
      cell: (row: Row) => (
        <div>
          {row.estado === 1 ? (
            <span className="text-green-600 font-bold">En Curso</span>
          ) : (
            <span className="text-red-600 font-bold">Finalizado</span>
          )}
        </div>
      ),
      omit: isMobile,
    },

    {
      name: "Acciones",
      cell: (row: Row) => (
        <div className="flex space-x-2 justify-between">
          {user.permissions.includes("ver") && (
            <button
              onClick={() => openDetailModal(row)}
              data-tip="Ver detalles"
              data-for="detailTooltip"
            >
              <GrView className="h-6 w-6" />
            </button>
          )}

          {user.permissions.includes("editar") && (
            <Link to={`/editLesson`} state={{ lesson: row }}>
              <button>
                <MdOutlineEdit className="h-6 w-6" />
              </button>
            </Link>
          )}
          {user.permissions.includes("eliminar") && (
            <button onClick={() => handleDelete(row.id)}>
              <MdDeleteOutline className="h-6 w-6 text-red-600" />
            </button>
          )}
        </div>
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

          {Array.isArray(user.permissions) &&
            user.permissions.includes("crear") && (
              <Tippy content="Agregar" placement="top">
                <Link to="/addLesson">
                  <button className="btn btn-success">
                    <IoAddCircleOutline className="ml-5 h-10 w-10" />
                  </button>
                </Link>
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

      <LessonDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        lesson={selectedLesson}
        group={group}
        teacher={userList}
      />
    </>
  );
};

export default Lesson;

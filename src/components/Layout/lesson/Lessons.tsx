import { useLesson } from "../../../hooks/useLesson";
import Table from "../Table";
import { useEffect, useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useStudent } from "../../../hooks/useStudent";
import { useUser } from "../../../hooks/useUser";
import { IoAddCircleOutline } from "react-icons/io5";
import AddLessonModal from "./AddLessonModal";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

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
  const { userList } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  

  const filteredLesson = lessons.filter(
    (lesson) =>
      lesson.tema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.id.toString().includes(searchTerm)
  );

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
      cell: (row: Row) => (
        <div className="flex space-x-2 justify-between ">
          
            <button>
              <MdOutlineEdit className="h-6 w-6" />
            </button>
 
            <button onClick={() => handleDelete(row.id)}>
              <MdDeleteOutline className="h-6 w-6 text-red-600" />
            </button>

        </div>
      ),
      width: "100px",
    },
  ];

  const customStyles = {
    table: {
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      },
    },
    headCells: {
      style: {
        background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
        color: "#ffffff",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
    cells: {
      style: {
        padding: "16px",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f9fafb",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "#ebf4ff",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#edf2f7",
        color: "#4a5568",
        borderRadius: "0 0 12px 12px",
      },
    },
  };


  return (
    <>
      <div className="container mx-auto my-5 p-2 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-10">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs h-12 px-4 border rounded-full shadow-md"
          />
          <Tippy content="Agregar" placement="top">
            <button onClick={toggleModal} className="btn btn-success">
              <IoAddCircleOutline className="ml-5 h-10 w-10" />
            </button>
          </Tippy>
        </div>
        <Table
          columns={columns}
          data={filteredLesson}
          customStyles={customStyles}
        />
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

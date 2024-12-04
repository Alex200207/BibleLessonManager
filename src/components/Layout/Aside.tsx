import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaBookOpen,
  FaUserShield,
} from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { useStudent } from "../../hooks/useStudent";
import { useLesson } from "../../hooks/useLesson";
import { MdGroup } from "react-icons/md";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { GoHistory } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { useAuth } from "../../utils/AuthProvider";
import { useUser } from "../../hooks/useUser";

interface AsideProps {
  isOpened: boolean;
  style?: React.CSSProperties;
}

const Aside = ({ isOpened }: AsideProps) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    movimientos: true,
    panel: true,
    planificacion: true,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const { user } = useUser();
  const { students } = useStudent();
  const { lessons } = useLesson();
  const { userRole } = useAuth();
  const {group} = useStudent();

  return (
    <aside
      id="default-sidebar"
      className={`fixed left-0 custom-top z-10 h-full w-64 sm:w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transform transition-transform duration-300 ease-in-out shadow-lg ${
        isOpened ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-2 py-6 overflow-y-auto bg-white dark:bg-gray-950">
        <ul className="space-y-4 font-normal overflow-y-auto">
          <li>
            <Link
              to="/home"
              className="flex items-center p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FaHome className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="ml-3 text-gray-800 dark:text-gray-200">
                Home
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <div
              className="flex items-center p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              onClick={() => toggleMenu("planificacion")}
            >
              <FaClipboardList className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <span className="flex-1 text-gray-800 dark:text-gray-200">
                Planificación
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  openMenus.planificacion ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            {openMenus.planificacion && (
              <ul className="ml-6 space-y-2 mt-2 text-sm">
                {/* Submenu items */}
                <li>
                  <Link
                    to="/kid"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <PiStudentLight className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                    <span className="flex-1 text-gray-800 dark:text-gray-200">
                      Estudiantes
                    </span>
                    <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      {userRole === "admin"
                        ? students.length
                        : students.filter(
                            (student) => student.id_maestra === user.id
                          ).length}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lesson"
                    className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
                  >
                    <FaBookOpen className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                    <span className="flex-1 text-gray-800 dark:text-gray-200">
                      Lecciones
                    </span>
                    <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      {userRole === "admin"
                        ? lessons.length
                        : lessons.filter((l) => l.id_maestra === user.id)
                            .length}
                    </span>
                  </Link>
                </li>
                {userRole === "admin" && (
                  <li>
                    <Link
                      to="/group"
                      className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      <MdGroup className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                      <span className="flex-1 text-gray-800 dark:text-gray-200">
                        Grupos
                      </span>
                      <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        {group.length}
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </li>
          {/* More menu items */}
          {userRole === "admin" && (
            <>
              <li>
                <div
                  className="flex items-center p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleMenu("movimientos")}
                >
                  <GoHistory className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-gray-800 dark:text-gray-200">
                    Movimientos
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openMenus.movimientos ? "rotate-90" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                {openMenus.movimientos && (
                  <ul className="ml-6 space-y-2 mt-2 text-sm">
                    <li>
                      <Link
                        to="#"
                        className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <span className="flex-1 text-gray-800 dark:text-gray-200">
                          Estudiantes
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <div
                  className="flex items-center p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleMenu("panel")}
                >
                  <LuLayoutPanelLeft className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="flex-1 text-gray-800 dark:text-gray-200">
                    Personal
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openMenus.panel ? "rotate-90" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                {openMenus.panel && (
                  <ul className="ml-6 space-y-2 mt-2">
                    <li>
                      <Link
                        to="/role"
                        className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <FaUserShield className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                        <span className="flex-1 text-gray-800 dark:text-gray-200">
                          Roles
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/users"
                        className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        <FiUsers className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                        <span className="flex-1 text-gray-800 dark:text-gray-200">
                          Usuarios
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

import { Link } from "react-router-dom";
import { useState } from "react";
import { PiStudentLight } from "react-icons/pi";
import { FaHome, FaUsers, FaClipboardList, FaChartLine } from "react-icons/fa"; 
import { useStudent } from "../../hooks/useStudent";

interface AsideProps {
  isOpened: boolean;
  style?: React.CSSProperties;
}

const Aside = ({ isOpened }: AsideProps) => {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isMovimientosOpen, setIsMovimientosOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  
  const { students } = useStudent(); 
  
  const toggleGroup = () => {
    setIsGroupOpen(!isGroupOpen);
    setIsMovimientosOpen(false); 
    setIsPanelOpen(false); 
  };

  const toggleMovimientos = () => {
    setIsMovimientosOpen(!isMovimientosOpen);
    setIsGroupOpen(false);
    setIsPanelOpen(false);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    setIsGroupOpen(false); 
    setIsMovimientosOpen(false); 
  };

  return (
    <aside
      id="default-sidebar"
      className={`fixed left-0 custom-top z-10 h-full w-42 sm:w-56 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transform transition-transform duration-300 ease-in-out shadow-lg ${
        isOpened ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-4 py-6 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-4 font-medium">
          <li>
            <Link
              to="/home"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FaHome className="w-5 h-5 text-gray-500 dark:text-gray-400" /> 
              <span className="ml-3">Home</span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/kid"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <PiStudentLight className="h-6 w-6 mr-2" />
              <span className="flex-1">Estudiantes</span>
              <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                {students.length}
              </span>
            </Link>
          </li>
          <li>
            <div
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              onClick={toggleGroup}
            >
              <FaUsers className="w-5 h-5 mr-2" />
              <span className="flex-1">Grupos</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isGroupOpen ? "rotate-90" : ""
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
            {isGroupOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>
                  <Link
                    to="/group"
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="flex-1">Grupo 1</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/group"
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="flex-1">Grupo 2</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              onClick={toggleMovimientos}
            >
              <FaClipboardList className="w-5 h-5 mr-2" /> 
              <span className="flex-1">Movimientos</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isMovimientosOpen ? "rotate-90" : ""
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
            {isMovimientosOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="flex-1">Estudiantes</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              onClick={togglePanel}
            >
              <FaChartLine className="w-5 h-5 mr-2" /> {/* Icono de Panel */}
              <span className="flex-1">Panel</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isPanelOpen ? "rotate-90" : ""
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
            {isPanelOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="flex-1">Roles</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

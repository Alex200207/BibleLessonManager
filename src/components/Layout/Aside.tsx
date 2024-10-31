import { Link } from "react-router-dom";
import { useState } from "react";
import { PiStudentLight } from "react-icons/pi";
interface AsideProps {
  isOpened: boolean;
  style?: React.CSSProperties;
}

const Aside = ({ isOpened }: AsideProps) => {
  const [isGroupOpen, setIsGroupOpen] = useState(false); // Estado para controlar el grupo

  const toggleGroup = () => {
    setIsGroupOpen(!isGroupOpen);
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
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ml-3">Home</span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/kid"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-200"
            ><PiStudentLight  className="h-6 w-6 mr-2"/>
              <span className="flex-1">Estudiantes</span>
              <span className="inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                10
              </span>
            </Link>
          </li>
          <li>
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer" onClick={toggleGroup}>
              <span className="flex-1">Grupos</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${isGroupOpen ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {isGroupOpen && (
              <ul className="ml-6 space-y-2 mt-2">
                <li>
                  <Link to="/group" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="flex-1">Grupo 1</span>
                  </Link>
                </li>
                <li>
                  <Link to="/group" className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="flex-1">Grupo 2</span>
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

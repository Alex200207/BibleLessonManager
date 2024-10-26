import { useAuth } from "../../utils/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useState, useEffect, useRef } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";

interface UserDataToken extends JwtPayload {
  email: string;
  iat: number;
  id: number;
  name: string;
}

function DropdownUser() {
  const { token } = useAuth();
  const user = jwtDecode<UserDataToken>(token);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Crear una referencia para el dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu sesión se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5", 
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      logout();
      Swal.fire({
        title: "¡Éxito!",
        text: "Has cerrado sesión correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 900,
      }).then(() => {
        navigate("/");       
      });
    }
  };

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : '';

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Detectar clics fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verificar si el clic fue fuera del dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Agregar el evento de escucha
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento de escucha al desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 focus:outline-none"
      >
        <IoOptionsOutline className="w-6 h-6" />
      </button>
      {isOpen && (
        <div className="p-5 absolute right-0 z-10 w-64 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 transition-opacity duration-200">
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-600">
            <div className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full mr-2">
              {firstLetter}
            </div>
            <h1 className="text-lg font-bold  text-gray-800 dark:text-gray-200">Hola, {user?.name}</h1>
          </div>
          <a
            href="#/profile"
            className="flex items-center p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 rounded-lg"
          >
            <FaUser className="mr-2 w-6 h-6 " /> Perfil
          </a>
          <a
            href="#/settings"
            className="flex items-center p-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 rounded-lg"
          >
            <IoMdSettings className="mr-2 w-6 h-6" /> Configuraciones
          </a>
          <div className="flex w-full items-center p-2 cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 rounded-lg" onClick={toggleDarkMode}>
            <span className="mr-2">{darkMode ? <IoSunnyOutline className="w-6 h-6"/>: <MdDarkMode className="w-6 h-6" /> }</span>
          </div>
          <a
            href="/"
            onClick={handleLogout}
            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 rounded-lg"
          >
            <CiLogout className="mr-2 h-6 w-6" /> Cerrar sesión
          </a>
        </div>
      )}
    </div>
  );
}

export default DropdownUser;

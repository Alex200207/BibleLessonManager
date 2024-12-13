import { Link } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import icon from "../../../assets/image/icon.webp";
import { FaFacebook } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="bg-[#030a27] bg-opacity-30 border-white/10 py-4 fixed w-full top-0 z-50 transition-all duration-500 ease-in-out">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={icon}
                alt="Logo"
                className="w-8 h-8 rounded-full transform transition-transform duration-500 hover:scale-110 hover:rotate-6"
              />
              <h1 className="text-xl font-bold text-white tracking-wider transition-transform duration-500 transform hover:scale-110 hover:text-gray-500">
                BibleLesson
              </h1>
            </div>

            <button
              onClick={toggleMenu}
              className={`lg:hidden flex items-center text-slate-100 focus:outline-none transition-transform duration-300 ${
                isMenuOpen ? "transform rotate-90" : ""
              }`}
            >
              <GiHamburgerMenu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex lg:space-x-4">
              <Link
                to="/about"
                className="text-gray-50 px-4 py-2 border border-white/20 hover:border-white rounded-md transition-all duration-300 ease-in-out hover:bg-white/10 transform hover:scale-105 hover:shadow-lg"
              >
                Acerca de
              </Link>
              {/* <Link
                to="/"
                className="text-black px-4 py-2 border border-white/20 hover:border-white rounded-md transition-all duration-300 ease-in-out hover:bg-white/10 transform hover:scale-105 hover:shadow-lg"
              >
                Registrarse
              </Link> */}
            </nav>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
      <aside
        className={`fixed top-0 left-0 w-64 bg-white h-full shadow-lg z-50 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-800">Menú</h2>
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900"
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-4">
          <Link
            to="/about"
            className="text-black px-4 py-2 hover:bg-gray-200 rounded-md transition-all duration-300 ease-in-out font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Acerca de
          </Link>
          <hr />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Iglesia</h3>
            <a
              className="text-black px-4 py-2 hover:bg-gray-200 rounded-md transition-all duration-300 ease-in-out flex items-center relative"
              href="https://www.facebook.com/profile.php?id=100092870447281&mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="mr-2 w-5 h-5" />

              <span>Facebook</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
            </a>
          </div>

          <div className="mt-4">
            <hr className="mb-5"/>
            <h3 className="text-md font-medium mb-2">Contacto</h3>
            <div className="flex items-center space-x-2 mt-5">
              <a
                href=""
                className="text-black hover:underline flex items-center"
              >
                <BiLogoGmail className="mr-2 w-5 h-5" />
                <span className="text-slate-950 text-sm">
                  Correo: Eddy Talavera
                </span>
              </a>
            </div>

            <br />
            <div className="flex items-center space-x-2">
              <a
                href=""
                className="text-black hover:underline flex items-center"
              >
                <FaFacebook className="mr-2 w-5 h-5" />
                <span className="text-slate-950 text-sm">
                  Facebook: Alex Talavera
                </span>
              </a>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <a
                className="text-black hover:underline flex items-center"
                href="https://github.com/Alex200207"
              >
                <BsGithub className="mr-2 w-5 h-5" />
                <span className="text-slate-950 text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export { Header };

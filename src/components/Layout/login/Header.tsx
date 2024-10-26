import { Link } from 'react-router-dom';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'; // Hamburger icon
import { AiOutlineClose } from 'react-icons/ai'; // Close icon
import icon from '../../../assets/image/icon.webp'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="backdrop-blur-mdborder-b border-white/10 py-4 fixed w-full top-0 z-50 transition-all duration-500 ease-in-out">
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
              className="lg:hidden flex items-center text-black focus:outline-none"
            >
              <GiHamburgerMenu className="w-6 h-6" />
            </button>

            <nav className="hidden lg:flex lg:space-x-4">
              <Link
                to="/about"
                className="text-black px-4 py-2 border border-white/20 hover:border-white rounded-md transition-all duration-300 ease-in-out hover:bg-white/10 transform hover:scale-105 hover:shadow-lg"
              >
                Acerca de
              </Link>
              <Link
                to="/register"
                className="text-black px-4 py-2 border border-white/20 hover:border-white rounded-md transition-all duration-300 ease-in-out hover:bg-white/10 transform hover:scale-105 hover:shadow-lg"
              >
                Registrarse
              </Link>
            </nav>
          </div>
        </div>
      </header>

   
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      />
      <aside
        className={`fixed top-0 left-0 w-64 bg-white h-full shadow-lg z-50 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Menú</h2>
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-4">
          <Link
            to="/about"
            className="text-black px-4 py-2 hover:bg-gray-200 rounded-md transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(false)} 
          >
            Acerca de
          </Link>
          <hr />
          <Link
            to="/register"
            className="text-black px-4 py-2 hover:bg-gray-200 rounded-md transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(false)} 
          >
            Registrarse
          </Link>

        </div>
      </aside>
    </>
  );
};

export { Header };

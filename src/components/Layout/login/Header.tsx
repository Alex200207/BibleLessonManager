import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="backdrop-blur-md bg-white/30 border-b border-white/10 py-4 fixed w-full top-0 z-50 transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

       
          <div className="flex items-center space-x-3">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="w-8 h-8 rounded-full transform transition-transform duration-500 hover:scale-110 hover:rotate-6"
            />
            <h1 className="text-xl font-semibold text-black tracking-wider transition-transform duration-500 transform hover:scale-110 hover:text-slate-900">
              AlexApp
            </h1>
          </div>

          
          <nav className="flex space-x-4">
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
  );
};

export { Header };

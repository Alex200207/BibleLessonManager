import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';


const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r bg-transparent">
      <div className="container mx-auto px-4 py-12">
        

        {/* Sección de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Lecciones */}
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden transform hover:scale-105 transition duration-300">
            <Link to="/lecciones" className="flex flex-col items-center p-6 text-center">
              <FaBook className="text-blue-600 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Lecciones</h3>
              <p className="text-gray-500 mt-2">Explora nuestras lecciones bíblicas interactivas y profundiza en la palabra.</p>
            </Link>
          </div>

          {/* Eventos */}
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden transform hover:scale-105 transition duration-300">
            <Link to="/eventos" className="flex flex-col items-center p-6 text-center">
              <FaCalendarAlt className="text-green-600 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Eventos</h3>
              <p className="text-gray-500 mt-2">Consulta los próximos eventos y actividades de la comunidad.</p>
            </Link>
          </div>

          {/* Tareas/Actividades */}
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden transform hover:scale-105 transition duration-300">
            <Link to="/tareas" className="flex flex-col items-center p-6 text-center">
              <FaChalkboardTeacher className="text-orange-600 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Tareas</h3>
              <p className="text-gray-500 mt-2">Revisa las tareas y actividades asignadas a la comunidad.</p>
            </Link>
          </div>

          {/* Recursos */}
          <div className="bg-white shadow-lg rounded-3xl overflow-hidden transform hover:scale-105 transition duration-300">
            <Link to="/recursos" className="flex flex-col items-center p-6 text-center">
              <FaUsers className="text-purple-600 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Recursos</h3>
              <p className="text-gray-500 mt-2">Accede a recursos educativos y materiales para el aprendizaje bíblico.</p>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

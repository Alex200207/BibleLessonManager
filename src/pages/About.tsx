import { useEffect, useRef } from 'react';
import { Code, Rocket,  Github } from 'lucide-react';
import img from '../assets/image/@AlexApp.png';

function About() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translateZ(-1px) scale(2)',
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Bienvenido a <span className="text-blue-400">BibleLesson</span>
          </h1>
          <p className="text-xl mb-8 animate-fade-in delay-200">
            Plataforma de gestión de estudiantes y lecciones para la iglesia.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
            Comienza Ahora
          </button>
        </div>
      </div>

  
      <div 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="bg-white py-24 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Code className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Desarrollo Moderno</h3>
              <p className="text-gray-600">
                Aprovecha las últimas características de React para un desarrollo eficiente.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Rocket className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rápido y Eficaz</h3>
              <p className="text-gray-600">
                Rendimiento optimizado con técnicas avanzadas de agrupamiento.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="bg-gray-50 py-24 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Acerca de Eddy Alexis Talavera Espinoza</h2>
          <p className="text-xl text-gray-600 mb-8">
            Hola, Soy estudiante de Ingeniería en Software y estoy desarrollando una plataforma para la iglesia  <strong>Río de Agua Viva</strong>. Esta plataforma está diseñada para gestionar estudiantes, lecciones e información, facilitando la administración y el seguimiento de actividades educativas.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="bg-blue-600 py-24 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            ¿Listo para comenzar?
          </h2>
          {/* <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105">
              Comienza Ahora
            </button>
            <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105">
              Documentación
            </button>
          </div> */}
        </div>
      </div>

      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Github className="w-6 h-6" />
              <span className="font-bold text-xl">Río de Agua Viva</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400">Acerca de</a>
              <a href="#" className="hover:text-blue-400">Documentación</a>
              <a href="#" className="hover:text-blue-400">GitHub</a>
              <a href="#" className="hover:text-blue-400">Contacto</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2024 Eddy Alexis Talavera Espinoza. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;

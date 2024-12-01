import { Users, BookOpen, GraduationCap, Clock } from "lucide-react";
import StatsCard from "./StatsCard";
import RecentActivity from "./RecentActivity";
import { useStudent } from "../../../hooks/useStudent";
import { useUser } from "../../../hooks/useUser";
import { useLesson } from "../../../hooks/useLesson";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const { students } = useStudent();
  const { userList: teachers, user } = useUser();
  const { lessons } = useLesson();

  const progressData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"], // Ajusta según tus necesidades
    datasets: [
      {
        label: "Progreso de Estudiantes (%)",
        data: students.map((student) => student.progreso), // Usar el campo `progreso`
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e5e7eb" } },
    },
  };

  const calcularTasaFinalizacionLecciones = () => {
    const totalLecciones = lessons.length;
    // Filtrar las lecciones cuyo estado sea 2 (finalizado)
    const totalLeccionesFinalizadas = lessons.filter(
      (lesson) => lesson.estado === 2
    ).length;
    return (totalLeccionesFinalizadas / totalLecciones) * 100;
  };

  const mostrarLeccionesPending = () => {
    const totalLeccionesPendientes = lessons.filter(
      (lesson) => lesson.estado === 2
    ).length;
    return totalLeccionesPendientes;
  };

  const mostrarleccionesActivas = () => {
    const totalLeccionesActivas = lessons.filter(
      (lesson) => lesson.estado === 1
    ).length;
    return totalLeccionesActivas;
  };
  // const calcularPromedioProgreso = () => {
  //   if (students.length === 0) return 0;
  //   const totalProgreso = students.reduce(
  //     (sum, student) => sum + student.progreso, // Asegúrate de tener una propiedad `progreso` en cada estudiante
  //     0
  //   );
  //   return totalProgreso / students.length;
  // };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-black transform transition-transform duration-300 ease-in-out shadow-lg">
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ¡Buen día, {user.name}!
                </h1>
                <p className="text-gray-600 dark:text-white">
                  Aquí está el resumen de tu actividad
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Estudiantes"
                value={students.length.toString()}
                trend={0}
                icon={Users}
                color="bg-blue-500"
              />
              <StatsCard
                title="Lecciones"
                value={`Activas: ${mostrarleccionesActivas().toString()} Finalizadas: ${mostrarLeccionesPending().toString()}`}
                trend={0}
                icon={BookOpen}
                color="bg-green-500"
              />
              <StatsCard
                title="Profesores"
                value={teachers.length.toString()}
                trend={-0}
                icon={GraduationCap}
                color="bg-purple-500"
              />
              <StatsCard
                title="Tasa de Finalización Lecciones"
                value={`${calcularTasaFinalizacionLecciones().toFixed(2)}% `} // Muestra el porcentaje calculado
                trend={0}
                icon={BookOpen}
                color="bg-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm dark:text-white dark:bg-black">
                <h2 className="text-lg font-semibold mb-4">
                  Progreso de Estudiantes
                </h2>
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  <Line data={progressData} options={options} />
                </div>
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="text-center text-lg  bg-slate-100 dark:bg-black dark:text-white text-zinc-700 pt-5 pb-5 underline ">
        Created By Alex Talavera
      </footer>
    </>
  );
}

export default Home;

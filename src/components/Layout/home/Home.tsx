import { Users, BookOpen, GraduationCap } from "lucide-react";
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

  const generarEtiquetasMeses = () => [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const meses = generarEtiquetasMeses();

  const progresoPorMes = meses.map((_mes, index) => {
    const mesEstudiantes = students.filter((student) => {
      if (!student.fecha) return false;
      const fecha = new Date(student.fecha); // Manejo seguro de fechas
      return !isNaN(fecha.getTime()) && fecha.getMonth() === index;
    });

    const totalProgreso = mesEstudiantes.reduce(
      (sum, student) => sum + (student.progreso || 0),
      0
    );

    return mesEstudiantes.length > 0
      ? totalProgreso / mesEstudiantes.length
      : 0; // Asigna 0 si no hay estudiantes en el mes
  });

  const progressData = {
    labels: meses,
    datasets: [
      {
        label: "Progreso de Estudiantes (%)",
        data: progresoPorMes,
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#374151" },
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: { color: "#374151", beginAtZero: true },
      },
    },
  };

  // Calcular tasa de finalización de lecciones
  const calcularTasaFinalizacionLecciones = () => {
    const totalLecciones = lessons.length;
    const totalLeccionesFinalizadas = lessons.filter(
      (lesson) => lesson.estado === 2
    ).length;
    return totalLecciones > 0
      ? (totalLeccionesFinalizadas / totalLecciones) * 100
      : 0;
  };

  // Mostrar lecciones pendientes
  const mostrarLeccionesPendientes = () => {
    return lessons.filter((lesson) => lesson.estado === 0).length;
  };

  // Mostrar lecciones activas
  const mostrarLeccionesActivas = () => {
    return lessons.filter((lesson) => lesson.estado === 1).length;
  };

  const userName = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName === "andrely") {
      return "cara de puerco";
    }
    return user.name;
  }


  const obtenerSaludoSegunHora = () => {
    const hora = new Date().getHours();
    if (hora < 12) {
      return "¡Buen día";
    } else if (hora < 18) {
      return "¡Buenas tardes";
    } else {
      return "¡Buenas noches";
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transform transition-transform duration-300 ease-in-out shadow-lg">
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {obtenerSaludoSegunHora()}, {userName(user.name)}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Aquí está el resumen de tu actividad
                </p>
              </div>
              <div className="flex items-center gap-4">
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
                value={
                  user.role === "admin"
                    ? students.length.toString()
                    : students
                        .filter((student) => student.id_maestra === user.id)
                        .length.toString()
                }
                trend={0}
                icon={Users}
                color="bg-blue-500"
              />
              <StatsCard
                title="Lecciones"
                value={`Activas: ${
                  user.role === "admin"
                    ? mostrarLeccionesActivas()
                    : lessons.filter(
                        (lesson) =>
                          lesson.estado === 1 && lesson.id_maestra === user.id
                      ).length
                } Pendientes: ${
                  user.role === "admin"
                    ? mostrarLeccionesPendientes()
                    : lessons.filter(
                        (lesson) =>
                          lesson.estado === 0 && lesson.id_maestra === user.id
                      ).length
                }`}
                trend={0}
                icon={BookOpen}
                color="bg-green-500"
              />
              {user.role === "admin" && (
                <StatsCard
                  title="Total Maestros"
                  value={teachers.length.toString()}
                  trend={0}
                  icon={GraduationCap}
                  color="bg-purple-500"
                />
              )}
              <StatsCard
                title="Tasa de Finalización Lecciones"
                value={
                  user.role === "admin"
                    ? calcularTasaFinalizacionLecciones().toFixed(2)
                    : "0%"
                }
                trend={0}
                icon={BookOpen}
                color="bg-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm dark:text-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold mb-4">
                  Progreso de Estudiantes
                </h2>
                <div className="h-[300px] flex items-center justify-center ">
                  {progresoPorMes.every((value) => value === 0) ? (
                    <p>No hay datos disponibles para mostrar.</p>
                  ) : (
                    <Line data={progressData} options={options} />
                  )}
                </div>
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="text-center text-lg bg-slate-100 dark:bg-gray-800 dark:text-white text-zinc-700 py-5 underline">
        Created By Alex Talavera
      </footer>
    </>
  );
}

export default Home;

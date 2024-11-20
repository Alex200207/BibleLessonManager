import { Users, BookOpen, GraduationCap, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import { useStudent } from '../../../hooks/useStudent';
import { useUser } from '../../../hooks/useUser';
import { useLesson } from '../../../hooks/useLesson';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Home() {
  const { students } = useStudent();
  const { userList: teachers ,user} = useUser();
  const { lessons } = useLesson();

  // Datos simulados para el gráfico
  const progressData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Progreso de Estudiantes (%)',
        data: [65, 70, 75, 85, 90, 92],
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        tension: 0.4, // Línea suavizada
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#e5e7eb' } },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-black transform transition-transform duration-300 ease-in-out shadow-lg">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">¡Buen día, {user.name}!</h1>
              <p className="text-gray-600 dark:text-white">Aquí está el resumen de tu actividad</p>
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
              title="Lecciones Activas"
              value={lessons.length.toString()}
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
              title="Tasa de Finalización"
              value="92%"
              trend={0}
              icon={Users}
              color="bg-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm dark:text-white dark:bg-black">
              <h2 className="text-lg font-semibold mb-4">Progreso de Estudiantes</h2>
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
  );
}

export default Home;

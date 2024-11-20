
const activities = [
  {
    user: 'María González',
    action: 'completó la lección',
    subject: 'Matemáticas Avanzadas',
    time: 'Hace 5 minutos',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    user: 'Carlos Rodríguez',
    action: 'creó una nueva tarea',
    subject: 'Física Cuántica',
    time: 'Hace 15 minutos',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
  },
  {
    user: 'Ana Martínez',
    action: 'calificó los exámenes',
    subject: 'Literatura',
    time: 'Hace 30 minutos',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm dark:text-white dark:bg-black">
      <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={activity.image}
              alt={activity.user}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium">{activity.subject}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
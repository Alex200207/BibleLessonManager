import { RiMenu2Fill } from "react-icons/ri";
import DropdownUser from "./students/DropdownUser";
import NotificationsDropdown from "./NotificationsDropdown";


interface HeaderProps {
  toggleAside: () => void;
  isOpened: boolean;
}

const notifications = [
  {
    user: "Eddy Talavera",
    action: "completó la lección",
    subject: "App de Tareas",
    time: "Hace 5 minutos",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
  {
    user: "Andrely Bermudez",
    action: "creó una nueva tarea",
    subject: "Física Cuántica",
    time: "Hace 15 minutos",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
  },
];

function Header({ toggleAside, isOpened }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-slate-200 dark:bg-slate-950 text-gray-800 dark:text-gray-200 shadow-md">
      <nav
        className="mx-auto flex items-center justify-between p-3 lg:px-8 shadow-sm"
        aria-label="Global"
      >
        <button onClick={toggleAside} className="h-8 w-auto">
          <RiMenu2Fill
            className={`w-6 h-6 transition-transform ${
              isOpened ? "rotate-90" : ""
            }`}
          />
        </button>

        <div className="flex-1 flex justify-center lg:justify-start">
          <span className="text-lg ml-4 font-semibold text-gray-900 dark:text-gray-200">
            AlexApp
          </span>
        </div>

        <div className="flex lg:flex-1 justify-end">
          <div className="flex items-center gap-4">
            <div className="relative">
              <NotificationsDropdown notifications={notifications} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
          </div>
          <DropdownUser />
        </div>
      </nav>
    </header>
  );
}

export default Header;

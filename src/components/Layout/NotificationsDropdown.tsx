import { useState, useEffect, useRef } from "react";
import { RiNotification3Line } from "react-icons/ri";

interface Notification {
  user: string;
  action: string;
  subject: string;
  time: string;
  image: string;
}

interface NotificationsDropdownProps {
  notifications: Notification[];
}

function NotificationsDropdown({ notifications }: NotificationsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
      >
        <RiNotification3Line className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute overflow-auto right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-20">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Notificaciones</h2>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">No hay notificaciones</p>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded"
                  >
                    <img
                      src={notification.image}
                      alt={notification.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{notification.user}</span>{" "}
                        {notification.action}{" "}
                        <span className="font-medium">
                          {notification.subject}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsDropdown;

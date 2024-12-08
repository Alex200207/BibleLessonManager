import { useState, useEffect, useRef } from "react";
import { RiNotification3Line } from "react-icons/ri";

interface Notification {
  user: string;
  action: string;
  subject: string;
  time: string;
  image: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
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
    <div className="relative">
      
      <button
        onClick={togglePanel}
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

      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg border-l border-gray-200 dark:border-gray-600 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-lg font-semibold">Notificaciones</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            X
          </button>
        </div>
        <div className="p-4 overflow-auto h-full">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No hay notificaciones</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification, index) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPanel;

import { RiMenu2Fill } from "react-icons/ri";
import DropdownUser from "./students/DropdownUser";
import { Clock } from "lucide-react";

interface HeaderProps {
  toggleAside: () => void;
}

function Header({ toggleAside }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-slate-200 dark:bg-slate-950 text-gray-800 dark:text-gray-200 shadow-md">
      <nav
        className="mx-auto flex items-center justify-between p-3 lg:px-8 shadow-sm"
        aria-label="Global"
      >
        <button onClick={toggleAside} className="h-8 w-auto">
          <RiMenu2Fill className="w-6 h-6" />
        </button>

        <div className="flex-1 flex justify-center lg:justify-start">
          <span className="text-lg ml-4 font-semibold text-gray-900 dark:text-gray-200">
            AlexApp
          </span>
        </div>

        <div className="flex lg:flex-1 justify-end">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Clock className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
          <DropdownUser />
        </div>
      </nav>
    </header>
  );
}

export default Header;

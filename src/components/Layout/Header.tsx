import { RiMenu2Fill } from "react-icons/ri";
import DropdownUser from "../Layout/DropdownUser";

interface HeaderProps {
  toggleAside: () => void;
}

function Header({ toggleAside }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <nav
        className="mx-auto flex items-center justify-between p-3 lg:px-8 shadow-sm"
        aria-label="Global"
      >
        <button onClick={toggleAside} className="h-8 w-auto">
          <RiMenu2Fill className="w-6 h-6" />
        </button>
        <div className="flex lg:flex-1">
          <span className="sr-only">Your Company</span>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
              aria-expanded="false"
            >
              AlexApp
            </button>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <DropdownUser />
        </div>
      </nav>
    </header>
  );
}

export default Header;

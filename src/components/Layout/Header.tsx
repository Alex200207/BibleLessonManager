import { RiMenu2Fill } from "react-icons/ri";
import { IoOptionsOutline } from "react-icons/io5";

interface HeaderProps {
  toggleAside: () => void;
}

function Header({ toggleAside }: HeaderProps) {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex  items-center justify-between p-3 lg:px-8 shadow-sm"
        aria-label="Global"
      >
        <button onClick={toggleAside} className="h-8 w-auto ">
          <RiMenu2Fill className="w-6 h-6" />
        </button>
        <div className="flex lg:flex-1">
          <span className="sr-only">Your Company</span>
        </div>
        <div className="flex lg:hidden">

        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              AlexApp

            </button>
          </div>
         
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button  className="text-sm font-semibold leading-6 text-gray-900rounded p-1">
          <IoOptionsOutline className="w-6 h-6" /> 
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;

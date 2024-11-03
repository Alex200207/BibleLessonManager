import { useState, useEffect, useRef } from "react";
import { RiFilterLine } from "react-icons/ri";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownUserProps {
  options: DropdownOption[];
  onSelect: (value: string) => void;
}

function DropdownUser({ options, onSelect }: DropdownUserProps) {
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

  const handleSelect = (option: DropdownOption) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center p-1 text-gray-700 dark:text-gray-300 focus:outline-none  dark:border-gray-600 rounded"
      >
       <RiFilterLine  className="h-6 w-6"/>
        
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 w-64 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 transition-opacity duration-200">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="block w-full text-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {option.label}
              
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownUser;

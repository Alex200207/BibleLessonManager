import React from "react";
import { IoMdClose } from "react-icons/io";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const AddModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg p-2 w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AddModal;

import React from "react";
import { Role } from "../../../Types";
import { IoCloseOutline } from "react-icons/io5";

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  roles: Role| null;

}

const RoleDetailModal: React.FC<StudentDetailModalProps> = ({
  isOpen,
  onClose,
  roles,
}) => {
  if (!isOpen || !roles) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/3 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Roles
        </h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong>Nombre:</strong> {roles.name}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Permisos:</strong> {roles.permissions?.length || 'no asignados'}
          </p>
          <hr />
          <p className="text-gray-700">
            <strong>Actualizado el:</strong> {roles.updated_at ? new Date(roles.updated_at).toLocaleDateString() : "No disponible"}
          </p>
          <hr />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="border border-red-500 text-red-500 py-2 px-4 rounded-lg shadow hover: transition duration-200"
            onClick={onClose}
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleDetailModal;

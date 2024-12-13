import "react-quill/dist/quill.snow.css";
import { useGroup } from "../../../hooks/useGroup";
import { useUser } from "../../../hooks/useUser";
import { useLesson } from "../../../hooks/useLesson";

interface FormAddGroupProps {
  onClose: () => void;
  reloadData: () => void;
}

const FormAddGroup: React.FC<FormAddGroupProps> = ({ onClose, reloadData }) => {
  const { newGroup, setNewGroup, handleSubmit, handleInputChange } = useGroup();
  const { userList } = useUser();
  const { lessons } = useLesson();

  return (
    <form
      className="max-w-2xl mx-auto  bg-white rounded-lg  dark:bg-gray-800 md:w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(() => {
          onClose();
          reloadData();
        });
      }}
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Agregar Grupo
      </h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newGroup.nombre}
          onChange={(e) =>
            setNewGroup((prev) => ({
              ...prev,
              nombre: e.target.value,
            }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Ingrese el nombre del grupo"
          required
        />
      </div>

      {/* Descripción con React-Quill */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Descripción
        </label>

        <textarea
          id="description"
          name="description"
          value={newGroup.descripcion}
          onChange={(e) =>
            setNewGroup((prev) => ({
              ...prev,
              descripcion: e.target.value,
            }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Ingrese la descripción del grupo"
          required
        />
      </div>

      <div className="mb-4 ">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Maestro
        </label>
        <select
          name="maestro_id" // Cambiar de "teacher_id" a "maestro_id"
          value={newGroup.maestro_id}
          onChange={(e) =>
            handleInputChange({
              target: { name: e.target.name, value: e.target.value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          <option value="">Seleccione un Maestro</option>
          {userList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Lección
        </label>
        <select
          name="leccion_id" // Cambiar de "teacher_id" a "leccion_id"
          value={newGroup.leccion_id}
          onChange={(e) =>
            handleInputChange({
              target: { name: e.target.name, value: e.target.value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        >
          <option value="">Seleccione una lección</option>
          {lessons.map((l) => (
            <option key={l.id} value={l.id}>
              {l.tema}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all text-sm dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormAddGroup;

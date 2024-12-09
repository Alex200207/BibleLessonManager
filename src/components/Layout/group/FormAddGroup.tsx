interface FormAddGroupProps {
  onClose: () => void;
}

const FormAddGroup: React.FC<FormAddGroupProps> = ({ onClose }) => {
  return (
    <form className="max-w-2xl mx-auto bg-white rounded-lg  dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Agregar Grupo
      </h2>

      {/* Nombre */}
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Ingrese el nombre del grupo"
          required
        />
      </div>

      {/* Descripción */}
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
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Agregue una descripción del grupo"
          required
        ></textarea>
      </div>

      {/* Maestro */}
      <div className="mb-4">
        <label
          htmlFor="teacher"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Maestro
        </label>
        <select
          id="teacher"
          name="teacher"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          required
        >
          <option value="">Seleccione un maestro</option>
          <option value="maestro1">Maestro 1</option>
          <option value="maestro2">Maestro 2</option>
        </select>
      </div>

      {/* Lección */}
      <div className="mb-4">
        <label
          htmlFor="lesson"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Lección
        </label>
        <select
          id="lesson"
          name="lesson"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          required
        >
          <option value="">Seleccione una lección</option>
          <option value="leccion1">Lección 1</option>
          <option value="leccion2">Lección 2</option>
        </select>
      </div>

      {/* Botones */}
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

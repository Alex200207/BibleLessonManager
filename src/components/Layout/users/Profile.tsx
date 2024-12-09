import { useState } from "react";

function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="shadow-lg rounded-lg bg-white">
        <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
          <h2 className="text-2xl font-semibold">Perfil del Maestro</h2>
        </div>
        <div className="p-6">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                placeholder="Ingrese su nombre"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                placeholder="Ingrese su correo electrónico"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Asignatura
              </label>
              <input
                type="text"
                id="subject"
                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                placeholder="Ingrese su asignatura"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                placeholder="Ingrese su teléfono"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Biografía
              </label>
              <textarea
                id="bio"
                className="w-full mt-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                rows={3}
                placeholder="Ingrese una breve biografía"
                disabled={!isEditing}
              />
            </div>
          </form>
        </div>
        <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end">
          {isEditing ? (
            <>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2 hover:bg-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Guardar
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setIsEditing(true)}
            >
              Editar Información
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;

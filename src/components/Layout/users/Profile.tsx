import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h2>Perfil del Maestro</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Ingrese su nombre"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Ingrese su correo electrónico"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Asignatura
              </label>
              <input
                type="text"
                id="subject"
                className="form-control"
                placeholder="Ingrese su asignatura"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Ingrese su teléfono"
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">
                Biografía
              </label>
              <textarea
                id="bio"
                className="form-control"
                rows={3}
                placeholder="Ingrese una breve biografía"
                disabled={!isEditing}
              />
            </div>
          </form>
        </div>
        <div className="card-footer text-end">
          {isEditing ? (
            <>
              <button
                className="btn btn-secondary me-2"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-success">Guardar</button>
            </>
          ) : (
            <button
              className="btn btn-primary"
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

import AuthLayout from "../../src/layout/AuthLayout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateFields = () => {
    let isValid = true;

    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre es requerido",
      });
      isValid = false;
    }
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo es requerido",
      });
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Formato de correo erróneo",
      });
      isValid = false;
    }

    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña es requerida",
      });
      isValid = false;
    }
    if (!confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La confirmación de la contraseña es requerida",
      });
      isValid = false;
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Registrado",
            text: "Registro exitoso. Redirigiendo al inicio de sesión...",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/login");
          });
        } else {
          const responseData = await response.json();
          Swal.fire({
            icon: "error",
            title: "Error",
            text: responseData.message || "Error al registrar el usuario",
          });
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en la conexión con el servidor",
        });
      }
    }
  };

  return (
    <AuthLayout>
      <div
        className="flex items-center justify-center h-screen"
        style={{
          background: "linear-gradient(to bottom, #0a0f40, #2569a9)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md w-full">
          <div className="p-6">
            <h4 className="text-2xl font-bold text-center">
              Registrarse en AlexStore
            </h4>
            <p className="text-center text-gray-600 mb-4">Ingrese tus datos</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition duration-200"
                >
                  Registrarse
                </button>
              </div>
              <div className="text-center mt-4">
                <label>
                  ¿Ya tienes cuenta?{" "}
                  <a href="/login" className="text-cyan-600 hover:underline">
                    Inicia sesión
                  </a>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;

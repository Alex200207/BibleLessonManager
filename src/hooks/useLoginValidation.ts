import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../src/utils/AuthProvider";

export const useLoginValidation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo es requerido",
      });
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Formato de correo erróneo",
      });
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña es requerida",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateEmail() && validatePassword()) {
      setLoading(true); // Inicia el loader

      try {
        await login({ email, password });
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Ingreso exitoso.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/home");
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Correo electrónico o contraseña incorrectos",
        });
      } finally {
        setLoading(false); // Detiene el loader al finalizar
      }
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    loading,
    validateEmail,
    validatePassword,
  };
};

import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { users } from "../Types";
import { useUser } from "./useUser";

const MySwal = withReactContent(Swal);

export const useUserModal = () => {
  const { createUser, reloadData } = useUser();
  const [newUser, setNewUser] = useState<users>({
    id: 0,
    name: '',
    email: '',
    password: '',
    role_id: 0,
   
  });

const handleInputChange = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
        ...prev,
        [name]: value,
    }));
};

  const handleSubmit = async (onClose: () => void) => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres agregar este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await createUser(newUser);
        await MySwal.fire({
          title: "¡Éxito!",
          text: "Usuario agregado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });

        setNewUser({
          id: 0,
          name: "",
          email: "",
          password: "",
          role_id:0,
        
        });

        reloadData();
        onClose();
      } catch (error) {
        await MySwal.fire({
          title: "Error",
          text: error instanceof Error ? error.message : "Error desconocido",
          icon: "error",
        });
      }
    }
  };

  return {
    newUser,
    handleInputChange,
    handleSubmit,
  };
};

import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser } from "../services/userService";
import { users } from "../Types";
import { useAuth } from "../utils/AuthProvider";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Swal from "sweetalert2"; // Importa SweetAlert2

interface UserDataToken extends JwtPayload {
  email: string;
  iat: number;
  id: number;
  name: string;
  role: string;
  permissions: string[];
}

const useUser = () => {
  const [userList, setUserList] = useState<users[]>([]);
  const [reload, setReload] = useState(false);
  const { token } = useAuth();
  const user = jwtDecode<UserDataToken>(token);


  useEffect(() => {
    fetchData();
  }, [reload]);



  const fetchData = async () => {
    try {
      const usersData = await getUsers();
      if (usersData) {
        setUserList(usersData);
      } else {
        console.warn("No se obtuvieron datos de usuarios");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const createUser = async (newUser: users) => {
    try {
      await addUser(newUser);
      reloadData();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };
  const updateUserData = async (id: users["id"], updatedUser: users) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas guardar los cambios realizados en este estudiante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await updateUser(id.toString(), updatedUser);
        Swal.fire("Guardado!", "Los cambios han sido guardados.", "success");
        const usersData = await getUsers();
        setUserList(usersData);
      } catch (error) {
        Swal.fire("Error!", "No se pudieron guardar los cambios.", "error");
        console.error("Error al editar el estudiante:", error);
      }
    } else {
      Swal.fire("Cancelado", "Los cambios no han sido guardados", "info");
    }
  };

   


  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    userList,
    createUser,
    reloadData,
    user,
    updateUserData
  };
};

export { useUser };

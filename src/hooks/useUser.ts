import { useEffect, useState } from "react";
import { getUsers, addUser } from "../services/userService";
import { users } from "../Types";
import { useAuth } from "../utils/AuthProvider";
import { jwtDecode, JwtPayload } from "jwt-decode";

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

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    userList,
    createUser,
    reloadData,
    user,
  };
};

export { useUser };

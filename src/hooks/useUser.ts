import { useEffect, useState } from "react";
import { getUsers, addUser } from "../services/userService";
import { users } from "../Types";

const useUser = () => {
  const [userList, setUserList] = useState<users[]>([]);
  const [currentUser, setCurrentUser] = useState<users | null>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  useEffect(() => {
    // Check localStorage for current user or use some authentication logic
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
      const user = userList.find((user) => user.id.toString() === userId);
      setCurrentUser(user || null);
    }
  }, [userList]);

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
    currentUser, // Returning the current user
    createUser,
    reloadData,
  };
};

export { useUser };

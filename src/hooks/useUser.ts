
import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import { users } from "../Types";

const useUser = () => {
  const [userList, setUserList] = useState<users[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

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

  return {
    userList,
  };
};

export { useUser };

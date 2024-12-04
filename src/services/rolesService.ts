import axios from "axios";
import { API_URL } from "../constant/index";

const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/role`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
};

const getRolesWithUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/role/rolesWithUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err, "No se pudo obtener los datos");
    return [];
  }
};

const getPermissions = async () => {
  try {
    const response = await axios.get(`${API_URL}/permissions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener permisos:", error);
    return [];
  }
};
import { Role } from "../Types";

const createRole = async (roleData: Role) => {
  try {
    const response = await axios.post(`${API_URL}/role/create`, roleData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.data) {
      throw new Error("Error al crear el rol");
    }

    return response.data;
  } catch (error) {
    console.error("Error al crear el rol:", error);
    return [];
  }
};
const editRole = async (id: Role["id"], updatedRole: Partial<Role>) => {
  try {
    const response = await axios.put(`${API_URL}/role/${id}`, updatedRole, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update role");
    }
  } catch (err) {
    console.log(err, "No se pudo actualizar los datos");
    throw err;
  }
};

export { getRoles, getPermissions, getRolesWithUser, createRole, editRole };

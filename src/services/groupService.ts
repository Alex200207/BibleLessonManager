import axios from "axios";
import { API_URL } from "../constant/index";
import { group } from "../Types/index";

const addGroup = async (newGroup: group) => {
  try {
    const response = await axios.post(`${API_URL}/group/`, newGroup, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add group");
    }
  } catch (err) {
    console.log(err, "No se pudo agregar los datos");
    throw err;
  }
};

const deleteGroup = async (id: group["id"]) => {
  try {
    const response = await axios.delete(`${API_URL}/group/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    throw `error al eliminar ${err} `;
  }
};

export { addGroup, deleteGroup };

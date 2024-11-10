import axios from "axios";
import { API_URL } from "../constant/index";

const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/role`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }); 
    if(response.status === 200){
      return response.data;
    }
    else{
      return [];
    }
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
}


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
}


export { getRoles , getPermissions };

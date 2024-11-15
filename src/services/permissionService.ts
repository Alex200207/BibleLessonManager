import axios from "axios";
import { API_URL } from "../constant/index";


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
  } catch (err) {
    console.log(err, "No se pudo obtener los datos");
    return [];
  }
};

const checkPermissions = async (
  id: string,
  action: string
): Promise<boolean> => {
  try {
    // Hacemos la petición GET al servidor para verificar el permiso
    const response = await axios.get(
      `${API_URL}/permissions/verificar-permiso/${id}/${action}`
    );

    // Verificamos que la respuesta sea exitosa y que tenga los datos esperados
    if (response.status === 200 && response.data) {
      return response.data.hasPermission; // Asumiendo que la respuesta contiene un campo `hasPermission`
    } else {
      console.warn("No se pudo verificar el permiso: respuesta no válida");
      return false;
    }
  } catch (err) {
    // Manejo de errores, por ejemplo si hay un problema con la conexión
    console.error("Error al verificar permisos:", err);
    return false;
  }
};

export { getPermissions, checkPermissions };

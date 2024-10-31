import axios from "axios";
import { kids } from "../Types/index";
import { API_URL } from "../constant/index";

const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`, {
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

const getStudentById = async (id: kids["id"]) => {
  try {
    const response = await axios.get(`${API_URL}/students/${id}`, {
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

const editStudent = async (id: kids["id"], updatedStudent: Partial<kids>) => {
  try {
    const response = await axios.put(`${API_URL}/students/${id}`, updatedStudent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update student");
    }
  } catch (err) {
    console.log(err, "No se pudo actualizar los datos");
    throw err;
  }
};

const deleteStudent = async (id: kids["id"]) => {
  try {
    const response = await axios.delete(`${API_URL}/students/${id}`, {
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

const getScore = async () => {
  try {
    const response = await axios.get(`${API_URL}/score`, {
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

const getGroup = async () => {
  try {
    const response = await axios.get(`${API_URL}/group`, {
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

const addKid = async (newKid: kids): Promise<kids> => {
  try {
    const response = await axios.post(`${API_URL}/students`, newKid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add new kid");
    }
  } catch (err) {
    console.log(err, "No se pudo agregar el nuevo niño");
    throw err;
  }
};

const addStudent = async (newStudent: kids) => {
  try {
    const response = await axios.post(`${API_URL}/students`, newStudent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (err) {
    console.error(err, "Error al agregar el estudiante");
    throw new Error("Error al agregar el estudiante");
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth`, {
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

export {
  getStudents,
  getStudentById,
  editStudent,
  getScore,
  getGroup,
  addKid,
  addStudent,
  getUsers,
  deleteStudent,
};

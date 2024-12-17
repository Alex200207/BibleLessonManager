import axios from "axios";
import { Evaluaciones } from "../Types";
import { API_URL } from "../constant";

const getEvaluations = async () => {
  try {
    const response = await axios.get(`${API_URL}/evaluation/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch evaluations");
    }
  } catch (err) {
    console.log(err, "No se pudo obtener los datos");
    throw err;
  }
};

const createEvaluation = async (newEvaluation: Evaluaciones) => {
  try {
    const response = await axios.post(`${API_URL}/evaluation/`, newEvaluation, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add evaluation");
    }
  } catch (err) {
    console.log(err, "No se pudo agregar los datos");
    throw err;
  }
};

export { getEvaluations, createEvaluation };

import axios from "axios";
import { kids } from "../Types/index";
import { API_URL } from "../constant/index";

 const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err, "No se pudo obtener los datos");
  }
};

 const getStudentById = async (id: kids["id"]) => {
  try {
    const response = await axios.get(`${API_URL}/students/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err, "No se pudo obtener los datos");
  }
};

const getScore = async () => {

  try{
    const response = await axios.get(`${API_URL}/score`);
    if(response.status === 200){
      return response.data;
    }else{
      return [];
    }
  }
  catch(err){
    console.log(err, "No se pudo obtener los datos");
  }
}


const getGroup = async () => {
  try {
    const response = await axios.get(`${API_URL}/group`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err, "No se pudo obtener los datos");
  }
}




export{
    getStudents,
    getStudentById,
    getScore,
    getGroup
}

import axios from "axios";
import { API_URL } from "../constant/index";
import { lesson } from "../Types/index";



const getLesson = async () => {
    try{
        const response = await axios.get(`${API_URL}/lessons`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if(response.status === 200){
            return response.data;
        }else{
            return [];
        }
    }
    catch(err){
        console.log(err, "No se pudo obtener los datos");
        return [];
    }

}

const deleteLesson = async (id: lesson["id"]) => {
    try {
        const response = await axios.delete(`${API_URL}/lessons/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to delete lesson");
        }
    } catch (err) {
        console.log(err, "No se pudo eliminar los datos");
        throw err;
    }
}


    const addLesson = async (newLesson: lesson) => {

        try {
            const response = await axios.post(`${API_URL}/lessons/`, newLesson, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error("Failed to add lesson");
            }
        } catch (err) {
            console.log(err, "No se pudo agregar los datos");
            throw err;
        }
    }

export{
    getLesson,
    addLesson,
    deleteLesson
}

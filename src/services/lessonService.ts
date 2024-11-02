import axios from "axios";
import { API_URL } from "../constant/index";



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
export{
    getLesson,
}

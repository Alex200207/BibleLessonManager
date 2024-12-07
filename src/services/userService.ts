import axios from 'axios';
import { API_URL } from '../constant/index';
import {users} from '../Types'


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

    

}

const addUser = async (newUser: users) => {

    try {
        const response = await axios.post(`${API_URL}/auth/register`, newUser, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error("Failed to add user");
        }
    } catch (err) {
        console.log(err, "No se pudo agregar los datos");
        throw err;
    }
}

const updateUser = async (id: string, updatedUser: users) => {
    try {
        const response = await axios.put(`${API_URL}/auth/${id}`, updatedUser, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update user');
        }
    } catch (err) {
        console.error('Error al actualizar el usuario:', err);
        throw new Error('No se pudo actualizar el usuario');
    }
};






export { getUsers , addUser , updateUser};
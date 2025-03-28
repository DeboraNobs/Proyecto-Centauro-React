import { User } from "../types/types";

const API_URL = 'http://localhost:5038/api/usuario';

export const UsersService = {
    async getUsers() : Promise<User[]> {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos los usuarios", error);
            throw new Error("Error al cargar los usuarios.");
        }
    },

    async deteleUser(id : string) : Promise<void> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error("Error al eliminar el usuario");
        } catch (error) {
            console.error("Error al eliminar el usuario", error);
            throw error;
        }
    },

    async getUserById (id : string) : Promise<User> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error("Error al obtener usuario por ID", error);
            throw error;
        }
    },

    async updateUser (id : string, userData : any) :  Promise<User> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || 
                                   errorData.errors?.join(', ') || 
                                   `Error ${response.status}: ${response.statusText}`;
                throw new Error(errorMessage);
            }
            return await response.json();

        }  catch (error) {
            console.error("Detalles del error al actualizar:", {
                id,
                userData,
                error
            });
            throw error;
        }
    },

    async createUser(userData: Partial<User>): Promise<User> {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
            return await response.json();

        } catch (error) {
            console.error("Error al crear usuario", error);
            throw error;
        }
    }


}
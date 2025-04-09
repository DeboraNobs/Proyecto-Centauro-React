import { Login, User } from "../types/types";

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

    async updateUser(id: string, userData: User): Promise<User> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
    
            if (!response.ok) {
                // Intenta extraer el error en formato JSON, pero maneja la posibilidad de que no haya cuerpo
                const errorData = await response.text(); // Obtener el cuerpo como texto
                let errorMessage = `Error ${response.status}: ${response.statusText}`;
                
                try {
                    const jsonError = JSON.parse(errorData);
                    errorMessage = jsonError.message || `Error ${response.status}: ${response.statusText}`;
                } catch {
                    console.warn("No se pudo parsear el error como JSON:", errorData);
                }
    
                throw new Error(errorMessage);
            }
    
            // Solo intentar parsear JSON si hay contenido en la respuesta
            const responseText = await response.text();
            return responseText ? JSON.parse(responseText) : {} as User;
    
        } catch (error) {
            console.error("Detalles del error al actualizar:", { id, userData, error });
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
    },
 
    async login(loginData: Login): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
    
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data.usuario;
            } else {
                throw new Error("No se recibió un token válido.");
            }
    
        } catch (error) {
            console.error("Error al hacer login", error);
            throw error;
        }
    }   

}
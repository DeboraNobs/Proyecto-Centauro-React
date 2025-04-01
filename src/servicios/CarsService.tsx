import { Car } from "../types/types";

const API_URL = 'http://localhost:5038/api/coche';

export const CarsService = {
    async getCars(): Promise<Car[]> {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos los coches", error);
            throw new Error("Error al cargar los coches.");
        }
    },

    async deleteCar(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error("Error al eliminar el coche");
        } catch (error) {
            console.error("Error al eliminar el coche", error);
            throw error;
        }
    },

    async getCarById(id: number): Promise<Car> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();
        } catch (error) {
            console.error("Error al obtener usuario por ID", error);
            throw error;
        }
    },

    async updateCar(id: number, carData: Car): Promise<Car> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });

            if (!response.ok) {
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
            return responseText ? JSON.parse(responseText) : {} as Car;

        } catch (error) {
            console.error("Detalles del error al actualizar:", { id, carData, error });
            throw error;
        }
    },
    /*
    async createCar(carData: Partial<Car>): Promise<Car> {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData)
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();

        } catch (error) {
            console.error("Error al crear coche", error);
            throw error;
        }
    }
    */
    async createCar(carData: Partial<Car>): Promise<Car> {
        try {
            const requestData = {
                marca: carData.marca,
                modelo: carData.modelo,
                descripcion: carData.descripcion,
                patente: carData.patente,
                tipo_coche: carData.tipo_coche,
                tipo_cambio: carData.tipo_cambio,
                num_puertas: carData.num_puertas,
                num_plazas: carData.num_plazas,
                num_maletas: carData.num_maletas,
                posee_aire_acondicionado: carData.posee_aire_acondicionado,
                GrupoId: carData.GrupoId ?? null,  
                SucursalId: carData.SucursalId ?? null, 
            };
    
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }
    
            return await response.json();
    
        } catch (error) {
            console.error("Error al crear coche", error);
            throw error;
        }
    }
    

}
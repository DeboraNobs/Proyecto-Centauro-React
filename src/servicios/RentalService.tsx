import { Rental } from "../types/types";

const API_URL = 'http://localhost:5038/api/alquiler';

export const RentalService = {

    async getRentals(): Promise<Rental[]> {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos los alquileres", error);
            throw new Error("Error al cargar los alquileres.");
        }
    },

    async deleteRental(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error("Error al eliminar el alquiler");
        } catch (error) {
            console.error("Error al eliminar el alquiler", error);
            throw error;
        }
    },

    async getRentalById(id: number): Promise<Rental> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error("Error al obtener alquiler por ID", error);
            throw error;
        }
    },

    async updateRental(id: number, rentalData: Rental): Promise<Rental> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rentalData)
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
            return responseText ? JSON.parse(responseText) : {} as Rental;

        } catch (error) {
            console.error("Detalles del error al actualizar:", { id, rentalData, error });
            throw error;
        }
    },


    async createUser(rentalData: Partial<Rental>): Promise<Rental> {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rentalData)
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            return await response.json();

        } catch (error) {
            console.error("Error al crear el alquiler", error);
            throw error;
        }
    },


}
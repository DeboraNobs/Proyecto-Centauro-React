import { Servicio } from "../types/types";

const API_URL = 'http://localhost:5038/api/servicio';

export const ServicesService = {
    async getServicios(): Promise<Servicio[]> {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos los servicios", error);
            throw new Error("Error al cargar las servicios.");
        }
    }
}
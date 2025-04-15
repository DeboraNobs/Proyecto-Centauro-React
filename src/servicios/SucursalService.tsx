import { Sucursal } from "../types/types";

const API_URL = 'http://localhost:5038/api/sucursal';

export const SucursalService = {
    async getSucursales(): Promise<Sucursal[]> {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos las sucursales", error);
            throw new Error("Error al cargar las sucursales.");
        }
    },

    async getSucursalById(id: number): Promise<Sucursal> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error("Error al obtener sucursal por ID", error);
            throw error;
        }
    },
}
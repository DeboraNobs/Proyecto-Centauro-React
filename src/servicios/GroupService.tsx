import { Group } from "../types/types";

const API_URL = 'http://localhost:5038/api/grupo';

export const GroupService = {
    async getGrupos() : Promise<Group[]> {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos los grupos", error);
            throw new Error("Error al cargar los grupos.");
        }
    }
}
import { Car } from "../types/types";

const API_URL = 'http://localhost:5038/api/coche';

export const CarsService = {
    async getCars(): Promise<Car[]> {
        try {
            const response = await fetch(`${API_URL}/con-grupo`);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos los coches", error);
            throw new Error("Error al cargar los coches.");
        }
    },

    async getCarsBySucursalId(sucursal_id : number): Promise<Car[]> {
        try {
            const response = await fetch(`${API_URL}/con-filtrado?sucursalId=${sucursal_id}`);
            const data = await response.json();
            return data.$values;
        } catch (error) {
            console.error("Error al obtener todos los coches con sucursal_id", error);
            throw new Error("Error al cargar los coches con sucursal_id.");
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
    
    async updateCar(id: number, carData: Car, file?: File): Promise<Car> {
        try {
            const formData = new FormData();
            
            const carProperties: Array<keyof Car> = [
                'id','marca', 'modelo', 'descripcion', 'patente',
                'tipo_coche', 'tipo_cambio', 'num_puertas',
                'num_plazas', 'num_maletas', 'posee_aire_acondicionado',
                'grupoId', 'SucursalId', 'imagen'
            ];
            carProperties.forEach(prop => {
                if (carData[prop] !== undefined) {
                    formData.append(prop, String(carData[prop]));
                }
            });
            if (file) {
                let base64Imagen: string | null = null;
                base64Imagen = await this.convertirArchivoABase64(file);
                formData.append('imagen', base64Imagen);
            }
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                body: formData
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }
            if (response.status === 204) {
                return  {} as Car; 
            }
            
            const responseText = await response.text();
            return responseText ? JSON.parse(responseText) :  {} as Car;
                        
        } catch (error) {
            console.error("Error al actualizar coche", error);
            throw error;
        }
    },
  
    async createCar(carData: Partial<Car>, file?: File): Promise<Car> {
        try {
            const formData = new FormData(); // uso un formData porque trato imagenes, se envia un encType="multipart/form-data"
            
            const carProperties: Array<keyof Car> = [
                'marca', 'modelo', 'descripcion', 'patente',
                'tipo_coche', 'tipo_cambio', 'num_puertas',
                'num_plazas', 'num_maletas', 'posee_aire_acondicionado',
                'grupoId', 'SucursalId'
            ];
            carProperties.forEach(prop => {
                if (carData[prop] !== undefined) { // si ninguna propiedad de carData es undefined entonces haz un append
                    formData.append(prop, String(carData[prop]));
                }
            });

            if (file) {
                let base64Imagen: string | null = null;
                base64Imagen = await this.convertirArchivoABase64(file);
                formData.append('imagen', base64Imagen);
            }
    
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData
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
    },
    
    async convertirArchivoABase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64ConPrefijo = reader.result as string;
                const soloBase64 = base64ConPrefijo.split(',')[1]; 
                resolve(soloBase64);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    },
    
}
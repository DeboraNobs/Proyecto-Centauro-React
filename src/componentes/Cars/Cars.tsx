import React, { useEffect, useState } from 'react'
import { Car } from '../../types/types'
import { Link, useNavigate } from 'react-router-dom';
import { CarsService } from '../../servicios/CarsService';

const Cars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [mensajeError, setMensajeError] = useState<string>('');
    const [mensajeExito, setMensajeExito] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        cargarCoches();
    }, []);

    const cargarCoches = async () => {
        setIsLoading(true);
        try {
            const cochesData = await CarsService.getCars();
            setCars(cochesData);
        } catch (error) {
            setMensajeError("No se ha podido obtener todos los coches");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    const borrarCoche = async (id: number) => {
        try {
            await CarsService.deleteCar(id);
            setMensajeExito("Coche eliminado");
            cargarCoches();
        } catch (error) {
            setMensajeError("Error al eliminar coche");
        } finally {
            setIsLoading(false);
        }
    }

    const editarCoche = (id: number) => {
        navigate(`/form-cars/${id}`);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Coches</h2>
            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

            <div className="text-end mb-3">
                <Link to="/form-cars"
                    style={{
                        color: "black",
                        padding: "7px",
                        backgroundColor: "beige",
                        border: "solid BurlyWood 2px",
                        borderRadius: "5px",
                        textDecoration: 'none'
                    }}>
                    Crear Coche
                </Link>
            </div>

            <table className="table table-striped" style={{ backgroundColor: "white" }}>
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Descripcion</th>
                        <th>Patente</th>
                        <th>Tipo</th>
                        <th>Plazas</th>
                        <th>Puertas</th>
                        <th>Maletas</th>
                        <th>Cambio</th>
                        <th>Aire acondicionado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.length > 0 ? (
                        cars.map((car) => (
                            <tr
                                key={car.id}>
                                <td>{car.marca} </td>
                                <td>{car.modelo}</td>
                                <td>{car.descripcion}</td>
                                <td>{car.patente}</td>
                                <td>{car.tipo_coche}</td>
                                <td>{car.num_plazas}</td>
                                <td>{car.num_puertas}</td>
                                <td>{car.num_maletas}</td>
                                <td>{car.tipo_cambio}</td>
                                <td>{car.posee_aire_acondicionado ? 'Sí' : 'No'}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-warning btn-sm"
                                        onClick={() => editarCoche(car.id)}>
                                        <span className="bi bi-pencil-square"></span>&nbsp;Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => borrarCoche(car.id)}>
                                        <span className="bi-trash"></span>&nbsp;Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">Cargando coches...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

}

export default Cars
import React, { useEffect, useState } from 'react'
import { Car } from '../../types/types'
import { Link, useNavigate } from 'react-router-dom';
import { CarsService } from '../../servicios/CarsService';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { confirmarEliminacion } from '../../utils/confirmDelete';

const Cars = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [mensajeError, setMensajeError] = useState<string>('');
    const [mensajeExito, setMensajeExito] = useState<string>('');
    const [, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState('');
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
            const confirmado = await confirmarEliminacion("¿Está seguro de que desea eliminar este coche?");
            if (!confirmado) return;

            await CarsService.deleteCar(id);
            setMensajeExito("Coche eliminado");
            cargarCoches();
        } catch (error) {
            setMensajeError("Error al eliminar coche");
            Swal.fire("Error al eliminar coche", "Inténtelo nuevamente más tarde", "error");
        } finally {
            setIsLoading(false);
        }
    }

    const editarCoche = (id: number) => {
        navigate(`/form-cars/${id}`);
    }

    const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setSearch(target.value);
    }

    let computadaCars: Car[] = [];
    if (!search) {
        computadaCars = cars;
    } else {
        computadaCars = cars.filter((dato) =>
            dato.marca.toLowerCase().includes(search.toLowerCase()) ||
            dato.modelo.toLowerCase().includes(search.toLowerCase())
        )
    }

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4 mt-4">Lista de Coches</h2>

            <div className="text-end mb-3 d-flex justify-content-center">
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

            <div className="input-group mb-3">
                <span className="input-group-text"><FaSearch /></span>
                <input type="text" className='form-control' placeholder='Introduzca su búsqueda'
                    value={search}
                    onChange={searcher}
                />
            </div>

            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

            <table className="table table-striped">
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
                    {computadaCars.length > 0 ? (
                        computadaCars.map((car) => (
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
                            <td colSpan={5} className="text-center">Ningún coche coincide con su búsqueda</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

}

export default Cars
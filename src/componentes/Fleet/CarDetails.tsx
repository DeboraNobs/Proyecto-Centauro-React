import React, { useState } from "react";
import { CarDetailsProps } from "../../types/types";
import Button from "../Elements/Button";
import { FaCar, FaExchangeAlt, FaMoneyBill, FaRegObjectGroup, FaSnowflake, FaUserFriends } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { MdOutlineLuggage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CarDetails: React.FC<CarDetailsProps> = ({
    coche,
    selectedSucursalId,
    sucursalDevolucion,
    fechainicio,
    fechaFin,
    selectedHorarioRecogida,
    selectedHorarioDevolucion
}) => {

    const sucursalIdValue = selectedSucursalId ?? '3';
    const sucursalDevolucionValue = sucursalDevolucion ?? '3';
    const fechainicioValue = fechainicio ?? new Date();
    const fechaFinValue = fechaFin ?? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // dos días después
    const horarioRecogidaValue = selectedHorarioRecogida ?? '10:00';
    const horarioDevolucionValue = selectedHorarioDevolucion ?? '12:00';

    const hacerReserva = async () => {
        const idUsuario = localStorage.getItem('id');

        const reserva = {
            LugarRecogida: sucursalIdValue.toString(),
            LugarDevolucion: sucursalDevolucionValue.toString(),
            Fechainicio: fechainicioValue.toISOString().split('T')[0],
            FechaFin: fechaFinValue.toISOString().split('T')[0],
            HorarioRecogida: horarioRecogidaValue,
            HorarioDevolucion: horarioDevolucionValue,

            usersId: idUsuario,
            grupoId: coche.grupoId,
        };
    
        try {
            const response = await fetch('http://localhost:5038/api/alquiler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reserva),
            });

            if (response.ok) {
                Swal.fire("Reserva creada!", "Muchas gracias por elegirnos!", "success");
            } else if (response.status === 400) { // No hay coches disponibles para dicho grupo seleccionado
                const data = await response.json();
                Swal.fire("No hay coches disponibles", data.message || "Alquile un grupo diferente o inténtelo más tarde", "error");
                navigate('/fleet');
            } else if (response.status === 401) { // Usuario no logueado
                const data = await response.json();
                Swal.fire("Acceso no autorizado", data.message || "Debe iniciar sesión", "error");
                navigate('/login');
            } else {
                const data = await response.json();
                Swal.fire("Error desconocido", data.message || "Ha ocurrido un error inesperado", "error");
            }
        } catch (error) {
            console.error('Error al reservar:', error);
            Swal.fire("Error de red", "No se pudo conectar al servidor", "error");
        }


    };

    const navigate = useNavigate();
    const [, setId] = useState<number>(0);

    const guardarCocheSeleccionado = () => {
        setId(coche.id);

        navigate(`/rentalsDetails?id=${coche.id}&grupoId=${coche.grupoId}&sucursalId=${sucursalIdValue}&sucursalDevolucion=${sucursalDevolucionValue}&fechainicio=${fechainicioValue.toISOString()}&fechaFin=${fechaFinValue.toISOString()}&horarioRecogida=${horarioRecogidaValue}&horarioDevolucion=${horarioDevolucionValue}`
        );

    }

    const imageSrc = coche.imagen ? `data:image/jpeg;base64,${coche.imagen}` : null;

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
                <h6> o similar</h6>

                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={`${coche.marca} ${coche.modelo}`}
                        className="card-img-top img-hover"
                        style={{ objectFit: "cover", width: "100%", height: "160px" }}
                    />
                )}

                <p className="card-text"> {coche.descripcion}</p>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <p className="card-text">
                            <MdOutlineLuggage />
                            {coche.num_maletas}
                        </p>
                    </div>

                    <div className="col-md-6">
                        <p className="card-text">
                            <FaSnowflake
                                color={!coche.posee_aire_acondicionado ? "#6c757d" : undefined}
                            />
                            {coche.posee_aire_acondicionado ? 'Sí' : 'No'}
                        </p>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <p className="card-text">
                            <FaCar /> {coche.tipo_coche}
                        </p>
                    </div>

                    <div className="col-md-6">
                        <p className="card-text">
                            <FaExchangeAlt /> {coche.tipo_cambio}
                        </p>
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-md-6">
                        <p className="card-text">
                            <GiCarDoor /> {coche.num_puertas}
                        </p>
                    </div>

                    <div className="col-md-6">
                        <p className="card-text">
                            <FaUserFriends /> {coche.num_plazas}
                        </p>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <p className="card-text">
                            <FaRegObjectGroup />
                            Grupo {coche.grupo ? coche.grupo.nombre : 'null'}
                        </p>
                    </div>

                    <div className="col-md-6">
                        <p className="card-text">
                            <FaMoneyBill />
                            Precio: {coche.grupo ? coche.grupo.precio : 'null'}
                        </p>
                    </div>
                </div>

            </div>
            <div className="card-footer">
                <Button
                    style={{
                        color: "black",
                        padding: "7px",
                        backgroundColor: "beige",
                        border: "solid BurlyWood 2px"
                    }}
                    texto="Ver detalles"
                    onClick={
                        () => guardarCocheSeleccionado()
                    }
                />

                <Button
                    style={{
                        color: "black",
                        padding: "7px",
                        backgroundColor: "beige",
                        border: "solid BurlyWood 2px"
                    }}
                    texto="Reservar"
                    onClick={
                        () => hacerReserva()
                    }
                />

            </div>
        </div>
    );
}

export default CarDetails;



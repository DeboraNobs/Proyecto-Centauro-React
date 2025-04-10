import React, { useState } from "react";
import { CarDetailsProps } from "../../types/types";
import Button from "../Elements/Button";
import { FaCar, FaExchangeAlt, FaLayerGroup, FaSnowflake, FaUserFriends } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { MdOutlineLuggage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CarDetails: React.FC<CarDetailsProps> = ({ coche }) => {

    /* para enviar el id del coche a rentalDetails */
    const navigate = useNavigate();
    const [, setId] = useState<number>(0);

    const guardarIdCocheSeleccionado = () => {
        setId(coche.id);
        console.log(coche.id);

        if (coche.id) {
            navigate(`/rentalsDetails?id=${coche.id}`);
        }
    }
    /* para enviar el id del coche a rentalDetails */

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

                { /*
                    <p className="card-text">
                        <FaLayerGroup />
                        {coche.grupo ? coche.grupo.nombre : `ID: ${coche.GrupoId} (Sin grupo)`}
                    </p>
                  */
                }

            </div>
            <div className="card-footer">
                <Button
                    style={{
                        color: "black",
                        padding: "7px",
                        backgroundColor: "beige",
                        border: "solid BurlyWood 2px"
                    }}
                    texto="Reservar"
                    onClick={
                        () => guardarIdCocheSeleccionado()
                    }

                />
            </div>
        </div>
    );
}

export default CarDetails;



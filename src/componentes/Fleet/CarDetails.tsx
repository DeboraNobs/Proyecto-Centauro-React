import React from "react";
import { CarDetailsProps } from "../../types/types";
import Button from "../Elements/Button";

// React.FC significa React Function Component
const CarDetails: React.FC<CarDetailsProps> = ({ coche }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{coche.marca} {coche.modelo}</h5>
                <h6> o similar</h6>
                <hr />
                <p className="card-text"><strong>Descripción:</strong> {coche.descripcion}</p>
                <p className="card-text"><strong>Matrícula:</strong> {coche.patente}</p>
                <p className="card-text"><strong>Tipo:</strong> {coche.tipo_coche}</p>
                <p className="card-text"><strong>Tipo cambio:</strong> {coche.tipo_cambio}</p>
                <p className="card-text"><strong>Puertas:</strong> {coche.num_puertas}</p>
                <p className="card-text"><strong>Plazas:</strong> {coche.num_plazas}</p>
                <p className="card-text"><strong>Aire acondicionado:</strong> {coche.posee_aire_acondicionado ? 'Sí' : 'No'}</p>
                <p className="card-text"><strong>Grupo:</strong> {coche.grupo ? coche.grupo.nombre : `ID: ${coche.GrupoId} (Sin grupo)`}</p>
                <p className="card-text"><strong>Descripción grupo:</strong> {coche.grupo ? coche.grupo.descripcion : `ID: ${coche.GrupoId} (Sin grupo)`}</p>

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
                />
            </div>
        </div>
    );
}

export default CarDetails;



import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Car } from '../../types/types';
import CarDetails from './CarDetails';
import Button from '../Elements/Button';

const Availability = () => {
  const [searchParams] = useSearchParams();
  const fechaInicio = searchParams.get('fechainicio') ? new Date(searchParams.get('fechainicio')!) : new Date();
  const fechaFin = searchParams.get('fechaFin') ? new Date(searchParams.get('fechaFin')!) : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const horarioRecogida = searchParams.get('horarioRecogida') || '10:00';
  const horarioDevolucion = searchParams.get('horarioDevolucion') || '12:00';
  const sucursalId = Number(searchParams.get('sucursalId') || '3');
  const sucursalDevolucion = Number(searchParams.get('sucursalDevolucion') || '3');

  const [coches, setCoches] = useState<Car[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (sucursalId) {
      fetch(`http://localhost:5038/api/coche/con-filtrado?sucursalId=${sucursalId}`)
        .then((res) => res.json())
        .then((data) => {
          setCoches(data.$values || []);
        });
    }
  }, [sucursalId]);

  const navegarListado = () => {
    navigate('/');
  }

    return (
        <div className='container'>
            <h2 className='mb-4'> Disponibilidad de coches </h2>

            <div className='row'>
                {coches.length > 0 ? (
                    coches.map((coche) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-3"
                            key={coche.id}
                        >
                        <CarDetails
                                coche={coche}
                                selectedSucursalId={sucursalId}
                                sucursalDevolucion={sucursalDevolucion}  
                                fechainicio={new Date(fechaInicio)}
                                fechaFin={new Date(fechaFin)}
                                selectedHorarioRecogida={horarioRecogida}
                                selectedHorarioDevolucion={horarioDevolucion} 
                        />
                        </div>
                    ))
                ) : (
                    <>
                    <p>Ningún coche coincide con su selección</p>
                    
                    <hr />
                        <div className="d-flex justify-content-center">
                            <Button
                                type="button"
                                style={{
                                    color: "black",
                                    padding: "7px",
                                    backgroundColor: "beige",
                                    border: "solid BurlyWood 2px"
                                }}
                                onClick={navegarListado}
                                texto="Volver a filtro de búsqueda" />
                        </div></>
                )}

            </div>
        </div>

    )

}
export default Availability;
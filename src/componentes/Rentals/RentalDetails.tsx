import React, { useEffect, useState } from 'react';
import { Car } from '../../types/types';
import { useLocation } from "react-router-dom";
import CarDetails from '../Fleet/CarDetails';

const RentalDetails = () => {

  const [auto, setAuto] = useState<Car | null>(null);
  const location = useLocation();
  const searchParams= new URLSearchParams(location.search);

  const id = Number(searchParams.get('id'));
  const sucursalId = Number(searchParams.get('sucursalId'));
   
  const fechaInicio = searchParams.get('fechainicio') ? new Date(searchParams.get('fechainicio')!) : new Date();
  const fechaFin = searchParams.get('fechaFin') ? new Date(searchParams.get('fechaFin')!) : new Date();

  const horarioRecogida = searchParams.get('horarioRecogida') || '';
  const horarioDevolucion = searchParams.get('horarioDevolucion') || '';

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5038/api/coche/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("no se ha podido encontrar el coche");
          }
          return res.json();
        })
        .then((data) => {
          setAuto(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [id]);

  if (!auto) {
    return <p>No se encontró el coche</p>;
  }

  return (
    <div className='container'>
      <h2 className='mb-4'>Detalles del coche que desea alquilar:</h2>
        <CarDetails
          coche={auto}
          selectedSucursalId={sucursalId}
          fechainicio={fechaInicio}
          fechaFin={fechaFin}
          selectedHorarioRecogida={horarioRecogida}
          selectedHorarioDevolucion={horarioDevolucion}
        />
    </div>
  );
}

export default RentalDetails;


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
  const sucursalDevolucion = Number(searchParams.get('sucursalDevolucion'));

  const fechaInicio = searchParams.get('fechainicio') ? new Date(searchParams.get('fechainicio')!) : new Date();
  const fechaFin = searchParams.get('fechaFin') ? new Date(searchParams.get('fechaFin')!) : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

  const horarioRecogida = searchParams.get('horarioRecogida') || '10:00';
  const horarioDevolucion = searchParams.get('horarioDevolucion') || '12:00';

  const msPorDia = 1000 * 60 * 60 * 24;
  const diferenciaEnMs = fechaFin.getTime() - fechaInicio.getTime();
  const cantidadDias = Math.ceil(diferenciaEnMs / msPorDia);
  
  // calculo precio total segun precio por día
  const precioPorDia = auto?.grupo?.precio;
  const total = cantidadDias * precioPorDia!;

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
    return <p>No se ha encontrado el coche</p>;
  }

  return (
    <div className='container d-flex justify-content-center'>
      <div style={{ maxWidth: '1200px', width: '100%' }}> 
        <h2 className='mb-4 text-center'>Detalles del coche que desea alquilar:</h2>
        
        <div className='row justify-content-between'>
          <div className='col-md-7 col-lg-8 mb-4'>
            <div className='card h-100'> 
              <div className='card-body'>
                <h5>Sucursal recogida:</h5>
                <p> Nº {sucursalId ?? auto.SucursalId}</p>
                
                <h5>Sucursal devolución:</h5>
                <p> Nº {sucursalDevolucion ?? auto.SucursalId}</p>
                
                <h5>Fecha inicio:</h5>
                <p>{fechaInicio.toLocaleDateString()}. </p>
                
                <h5>Fecha fin:</h5>
                <p>{fechaFin.toLocaleDateString()}. </p>
  
                <h5>Horario recogida:</h5>
                <p>{horarioRecogida} horas.</p>
  
                <h5>Horario devolución:</h5>
                <p>{horarioDevolucion} horas.</p>

                <hr />

                <h4>¿Desea contratar servicios extras?</h4>
                { /* <input type="radio" name="si" id="si" />Sí
                <input type="radio" name="no" id="no" />No
                */ }

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Sí
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    No
                  </label>
                </div>

                <h5>Precio total con servicios extras:</h5>
                <p> Alquiler: {total} €</p>
                <p> Extras: (+ extras) € </p>
                <p>Total: {total} + EXTRAS €</p>


<hr />

                <h5>Precio total sin servicios extras:</h5>
                <p> {total} €</p>

                
              </div>
            </div>
          </div>
          
          <div className='col-md-5 col-lg-4'>
              <CarDetails
                coche={auto}
                selectedSucursalId={sucursalId ?? auto.SucursalId}
                sucursalDevolucion={sucursalDevolucion ?? auto.SucursalId} 
                fechainicio={fechaInicio}
                fechaFin={fechaFin}
                selectedHorarioRecogida={horarioRecogida}
                selectedHorarioDevolucion={horarioDevolucion} 
              />
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default RentalDetails;
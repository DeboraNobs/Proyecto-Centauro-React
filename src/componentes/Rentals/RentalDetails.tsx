import React, { useEffect, useState } from 'react';
import { Car } from '../../types/types';
import { useLocation } from "react-router-dom";
import CarDetails from '../Fleet/CarDetails';

const RentalDetails = () => {

  const [auto, setAuto] = useState<Car | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

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

  // variables para desplegar opciones si quiere extras o directamente no mostrar nada si pone que no quiere
  const [quiereExtras, setQuiereExtras] = useState<null | boolean>(null);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState<string[]>([]);

  const serviciosExtras = [
    { nombre: 'Coche de bebé', precio: 10 },
    { nombre: 'Segundo conductor', precio: 15 },
    { nombre: 'GPS', precio: 15 },
    { nombre: 'Depósito lleno', precio: 200 },
    { nombre: 'Cobertura completa', precio: 100 },
    { nombre: 'Cadenas para la nieve', precio: 50 },
  ];

  const toggleExtra = (nombre: string) => {
    setExtrasSeleccionados(prev =>
      prev.includes(nombre)
        ? prev.filter(e => e !== nombre)
        : [...prev, nombre]
    );
  };

  const totalExtras = extrasSeleccionados
    .map(nombre => serviciosExtras.find(e => e.nombre === nombre)?.precio || 0)
    .reduce((acc, precio) => acc + precio, 0);

  const totalFinal = total + totalExtras;

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
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 className='mb-4 text-center'>Detalles del coche que desea alquilar:</h2>

        <div className='row justify-content-between'>
          <div className='col-md-6 col-lg-7 mb-3'>
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

                <div className="form-check" style={{ marginRight: '25rem' }}>
                  <input
                    className="form-check-input ms-4"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioSi"
                    onChange={() => setQuiereExtras(true)}
                    checked={quiereExtras === true}
                  />
                  <label className="form-check-label me-5" htmlFor="radioSi">
                    Sí
                  </label>
                </div>

                <div className="form-check" style={{ marginRight: '25rem' }}>
                  <input
                    className="form-check-input ms-4"
                    type="radio"
                    name="flexRadioDefault"
                    id="radioNo"
                    onChange={() => setQuiereExtras(false)}
                    checked={quiereExtras === false}
                  />
                  <label className="form-check-label me-5" htmlFor="radioNo">
                    No
                  </label>
                </div>

                <hr />

                {quiereExtras && (
                  <div className="mt-3">
                    <h5>Seleccione:</h5>
                    {serviciosExtras.map(extra => (
                      <div key={extra.nombre} className="form-check text-start ms-5">
                        <input
                          className="form-check-input text-start ms-4"
                          type="checkbox"
                          id={extra.nombre}
                          checked={extrasSeleccionados.includes(extra.nombre)}
                          onChange={() => toggleExtra(extra.nombre)}
                        />
                        <label className="form-check-label ms-2" htmlFor={extra.nombre}>
                          {extra.nombre} (+{extra.precio} €)
                        </label>
                      </div>
                    ))}

                    <h5 className="mt-3">Precio total con servicios extras:</h5>

                    <div className='text-start ms-5'>
                      <p className='ms-5'>Alquiler: {total} €</p>
                      <p className='ms-5'>Extras: + {totalExtras} €</p>
                      <hr className='w-50' />
                      <p className='ms-5'>Total: {totalFinal} €</p>
                    </div>

                  </div>
                )}

                {quiereExtras === false && (
                  <div className="mt-3">
                    <h5>Precio total sin servicios extras:</h5>
                    <hr />
                    <p> Total: {total} €</p>
                  </div>
                )}
              </div>

            </div>
          </div>


          <div className='col-md-5 col-lg-4 me-4'>
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
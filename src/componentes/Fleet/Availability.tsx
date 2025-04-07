import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Car } from '../../types/types';
import CarDetails from './CarDetails';

const Availability = () => {
  const [searchParams] = useSearchParams();
  const sucursalId = Number(searchParams.get('sucursalId'));
  const [coches, setCoches] = useState<Car[]>([]);

  useEffect(() => {
    if (sucursalId) {
      fetch(`http://localhost:5038/api/coche/con-filtrado?sucursalId=${sucursalId}`)
        .then((res) => res.json())
        .then((data) => {
          setCoches(data.$values);
        });
    }
  }, [sucursalId]);

    return (
        <div className='container'>
            <h2 className='mb-4'> Disponibilidad de coches </h2>

            <div className='row'>
                {coches.length > 0 ? (
                    coches.map((coche) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-3"
                            key={coche.id}
                        >
                            <CarDetails coche={coche} />
                        </div>
                    ))
                ) : (
                    <p>Ningún coche coincide con su selección</p>
                )}

            </div>
        </div>

    )

}
export default Availability;
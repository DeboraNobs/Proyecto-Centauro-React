import React, { useState, useEffect } from 'react'
import CarDetails from './CarDetails';
import { Car } from '../../types/types';

const Fleet = () => {
    const [coches, setCoches] = useState<Car[]>([]); // le paso un array de dependencias vacio
    useEffect(() => {
        fetch('http://localhost:5038/api/coche')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCoches(data.$values);
            })
            .catch(error => console.error('Error:', error));
    }, []); // este array vacío evita llamadas infinitas a la api

    return (
        <div className='container'>
            <div className='row'>

                {coches.length > 0 ? (
                    coches.map((coche) => (
                        <div 
                            className="col-md-4 mb-4" 
                            key={coche.id}
                        >
                            <CarDetails coche={coche} />
                        </div>
                    ))
                ) : (
                    <p>Cargando coches...</p>
                )}

            </div>
        </div>
    )
}

export default Fleet;
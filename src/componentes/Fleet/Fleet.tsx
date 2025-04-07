import React, { useState, useEffect } from 'react'
import CarDetails from './CarDetails';
import { Car } from '../../types/types';
import FleetFilter from '../Fleet/FleetFilter';

const Fleet = () => {

    const [coches, setCoches] = useState<Car[]>([]); // le paso un array de dependencias vacio

    const [selectedPlazas, setSelectedPlazas] = useState<number>(0);
    const [selectedTipoCambio, setSelectedTipoCambio] = useState('');
    const [selectedTipoCoche, setSelectedTipoCoche] = useState('');

    useEffect(() => {
        fetch('http://localhost:5038/api/coche') // si pruebo con el endpoint que trae grupos (/con-grupo) me muestra ls grupos pero los creados por form no
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCoches(data.$values);
            })
            .catch(error => console.error('Error: ', error));
    }, []); // este array vacío evita llamadas infinitas a la api

    const cochesFiltrados = coches.filter(coche => {
        const numPlazasCoincide = selectedPlazas ? coche.num_plazas === selectedPlazas : true; // si el valor de num_plazas seleccionado es = al num_plazas del coche.. true
        const tipoCambioCoincide = selectedTipoCambio ? coche.tipo_cambio === selectedTipoCambio : true;
        const tipoCocheCoincide = selectedTipoCoche ? coche.tipo_coche === selectedTipoCoche : true;

        return numPlazasCoincide && tipoCambioCoincide && tipoCocheCoincide;
    })

    return (
        <div className='container'>
            <h2> Flota de coches </h2>

            <FleetFilter 
                setSelectedPlazas={setSelectedPlazas}
                setSelectedTipoCambio={setSelectedTipoCambio}
                setSelectedTipoCoche={setSelectedTipoCoche}
             />
            
            <div className='row'>
                {cochesFiltrados.length > 0 ? (
                    cochesFiltrados.map((coche) => (
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

export default Fleet;
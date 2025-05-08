import React, { useState, useEffect } from 'react'
import CarDetails from './CarDetails';
import { Car } from '../../types/types';
import FleetFilter from '../Fleet/FleetFilter';
import { useSearchParams } from 'react-router-dom';
import SkeletonCard from '../Elements/SkeletonCard';

const Fleet = () => {

    const [coches, setCoches] = useState<Car[]>([]); // le paso un array de dependencias vacio

    const [selectedPlazas, setSelectedPlazas] = useState<number>(0);
    const [selectedTipoCambio, setSelectedTipoCambio] = useState('');
    const [selectedTipoCoche, setSelectedTipoCoche] = useState('');
    const [selectedSucursalId, setSelectedSucursalId] = useState<number>(0);

    const [searchParams] = useSearchParams();
    const fechaInicio = searchParams.get('fechainicio') ? new Date(searchParams.get('fechainicio')!) : new Date();
    const fechaFin = searchParams.get('fechaFin') ? new Date(searchParams.get('fechaFin')!) : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const horarioRecogida = searchParams.get('horarioRecogida') || '10:00';
    const horarioDevolucion = searchParams.get('horarioDevolucion') || '12:00';
    const sucursalId = Number(searchParams.get('sucursalId'));
    const sucursalDevolucion = Number(searchParams.get('sucursalDevolucion'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5038/api/coche/con-grupo') // si pruebo con el endpoint que trae grupos (/con-grupo) me muestra los grupos pero los creados por form no
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCoches(data.$values);
                setIsLoading(false);
            })
            .catch(error => console.error('Error: ', error));
    }, []); // este array vacío evita llamadas infinitas a la api

    const cochesFiltrados = coches.filter(coche => {
        const numPlazasCoincide = selectedPlazas ? coche.num_plazas === selectedPlazas : true; // si el valor de num_plazas seleccionado es = al num_plazas del coche.. true
        const tipoCambioCoincide = selectedTipoCambio ? coche.tipo_cambio === selectedTipoCambio : true;
        const tipoCocheCoincide = selectedTipoCoche ? coche.tipo_coche === selectedTipoCoche : true;
        const sucursalIdCoincide = selectedSucursalId ? coche.sucursal?.id === selectedSucursalId : true;

        return numPlazasCoincide && tipoCambioCoincide && tipoCocheCoincide && sucursalIdCoincide;
    })

    return (
        <div className='container'>
            <h2> Flota de coches </h2>

            <FleetFilter
                setSelectedPlazas={setSelectedPlazas}
                setSelectedTipoCambio={setSelectedTipoCambio}
                setSelectedTipoCoche={setSelectedTipoCoche}
                setSelectedSucursalId={setSelectedSucursalId}
            />

            <div className='row'>
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : cochesFiltrados.length > 0 ? (
                    cochesFiltrados.map((coche) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-3"
                            key={coche.id}
                        >
                            <CarDetails
                                coche={coche}
                                selectedSucursalId={sucursalId}
                                fechainicio={fechaInicio}
                                fechaFin={fechaFin}
                                selectedHorarioRecogida={horarioRecogida}
                                selectedHorarioDevolucion={horarioDevolucion}
                                sucursalDevolucion={sucursalDevolucion}
                            />
                        </div>
                    ))
                ) : (
                    <p>Ningún coche coincide con su selección</p>
                )
                }


            </div>
        </div>
    )
}

export default Fleet;

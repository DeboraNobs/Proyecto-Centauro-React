import React, { useState } from 'react';
import { FleetFilterProps } from '../../types/types';
import Button from '../Elements/Button';

const FleetFilter: React.FC<FleetFilterProps> = ({ setSelectedPlazas, setSelectedTipoCambio, setSelectedTipoCoche }) => {
    const [selectedPlazas, setPlaza] = useState<number>(0);
    const [selectedTipoCambio, setTipoCambio] = useState('');
    const [selectedTipoCoche, setTipoCoche] = useState('');

    const NumeroPlazas: number[] = [1, 2, 3, 4, 5];
    const TipoCambio: string[] = ['Automatico', 'Manual', 'Semi'];
    const TipoCoche: string[] = ['Familiar', 'Deportivo', 'Electrico'];

    const guardarPlazaSeleccionada = (plaza: number) => {
        setPlaza(plaza);
        setSelectedPlazas(plaza);
    }

    const guardarTipoCambioSeleccionado = (tipo_cambio: string) => {
        setTipoCambio(tipo_cambio);
        setSelectedTipoCambio(tipo_cambio);
    }

    const guardarTipoCocheSeleccionado = (tipo_coche: string) => {
        setTipoCoche(tipo_coche);
        setSelectedTipoCoche(tipo_coche);
    }

    const cancelarTodosFiltros = () => {
        setPlaza(0);
        setSelectedPlazas(0);

        setTipoCambio('');
        setSelectedTipoCambio('');
        
        setTipoCoche('');
        setSelectedTipoCoche('');
    }

    // Cancelar filtros parciales
    const cancelarFiltroPlaza = () => {
        setPlaza(0);
        setSelectedPlazas(0);
    }
    const cancelarFiltroTipoCambio = () => {
        setTipoCambio('');
        setSelectedTipoCambio('');
    }
    const cancelarFiltroTipoCoche = () => {
        setTipoCoche('');
        setSelectedTipoCoche('');
    }

    return (
        <div className="fleet-filter-container p-3 rounded d-flex justify-content-center mb-4">
            <div className="d-flex">

                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownPlazas"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                            backgroundColor: 'beige',
                            border: '2px solid BurlyWood',
                            color: 'black',
                            padding: '6.5px'
                        }}
                    >
                        {selectedPlazas || 'Nº plazas'}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownPlazas">
                    <button type="button" className="dropdown-item" onClick={() => cancelarFiltroPlaza()}>Cancelar</button>
                        {NumeroPlazas.map((numero) => (
                            <li key={numero}>
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={() => guardarPlazaSeleccionada(numero)}
                                >
                                    {numero}
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>


                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownCambio"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                            backgroundColor: 'beige',
                            border: '2px solid BurlyWood',
                            color: 'black',
                            padding: '6.5px'
                        }}
                    >
                        {selectedTipoCambio || 'Tipo Cambio'}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownTipoCambio">
                    <button type="button" className="dropdown-item" onClick={() => cancelarFiltroTipoCambio()}>Cancelar</button>
                        {TipoCambio.map((cambio) => (
                            <li key={cambio}>
                                <button
                                    className='dropdown-item'
                                    type='button'
                                    onClick={() => guardarTipoCambioSeleccionado(cambio)}
                                >
                                    {cambio}
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>


                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownCoche"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                            backgroundColor: 'beige',
                            border: '2px solid BurlyWood',
                            color: 'black',
                            padding: '6.5px'
                        }}
                    >
                        {selectedTipoCoche || 'Tipo Coche'}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownTipoCoche">
                    <button type="button" className="dropdown-item" onClick={() => cancelarFiltroTipoCoche()}>Cancelar</button>
                        {TipoCoche.map((tipo_coche) => (
                            <li key={tipo_coche}>
                                <button
                                    className='dropdown-item'
                                    type='button'
                                    onClick={() => guardarTipoCocheSeleccionado(tipo_coche)}
                                >
                                    {tipo_coche}
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>

                <Button
                    type="button"
                    onClick={() => cancelarTodosFiltros()}
                    style={{
                        color: "black",
                        padding: "6.5px",
                        backgroundColor: "beige",
                        border: "solid BurlyWood 2px"
                    }}
                    texto='Cancelar'
                />

            </div>
        </div>
    );
};

export default FleetFilter;



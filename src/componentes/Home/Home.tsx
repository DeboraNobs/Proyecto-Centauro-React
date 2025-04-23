import React, { useEffect, useState } from 'react';
import homeImg from '../../assets/home.webp';
import { SucursalService } from '../../servicios/SucursalService';
import Button from '../Elements/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [sucursales, setSucursales] = useState<{ id: string | number; nombre: string }[]>([]);

    const [selectedSucursalId, setSucursalId] = useState<number>(0);
    const [selectedSucursalDevolucionId, setSucursalDevolucionId] = useState<number>(0);

    const [selectedFechaInicio, setFechaInicio] = useState<Date>();
    const [selectedFechaFin, setFechaFin] = useState<Date>();

    const [minHoraRecogida, setMinHoraRecogida] = useState('');
    const [selectedHorarioRecogida, setHorarioRecogida] = useState('');
    const [selectedHorarioDevolucion, setHorarioDevolucion] = useState('');

    const navigate = useNavigate();

    const inputHorarioRecogida = document.getElementById('horariorecogida') as HTMLInputElement;

    useEffect(() => {
        const ahora = new Date();
        ahora.setHours(ahora.getHours() + 1);

        const horaFormateada = ahora.toTimeString().split(':').slice(0, 2).join(':');
        
        setMinHoraRecogida(horaFormateada);
    }, []);

    document.addEventListener('DOMContentLoaded', () => {
        const inputFechaInicio = document.getElementById('fechainicio') as HTMLInputElement;
        const inputFechaFin = document.getElementById('fechafin') as HTMLInputElement;

        const hoy = new Date().toISOString().split('T')[0];
        inputFechaInicio.min = hoy;
      
        inputFechaInicio.addEventListener('change', () => {
          inputFechaFin.min = inputFechaInicio.value; // cuando se selecciona una fechainicio, esa fecha pasa a ser el mínimo de fechafin
          inputFechaFin.value = ''; // limpia la fechafin seleccionada cuando cambia una fechainicio (para evitar que la fechafin sea menor a fechainicio)
        });
    });
    

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const sucursales = await SucursalService.getSucursales();
                setSucursales(sucursales);
            } catch (error) {
                console.error(error);
                setErrorMessage('No se pudieron cargar las sucursales.');
                setSucursales([]);
            }
        };
        fetchSucursales();
    }, []);

    // guardar datos seleccionados
    const guardarSucursalSeleccionada = (sucursal: number) => {
        setSucursalId(sucursal);
    }
    const guardarSucursalDevolucionSeleccionada = (sucursalDevolucion: number) => {
        setSucursalDevolucionId(sucursalDevolucion);
    }
    const guardarFechaInicioSeleccionada = (fechainicio: Date) => {
        setFechaInicio(fechainicio);
    }
    const guardarFechaFinSeleccionada = (fechaFin: Date) => {
        setFechaFin(fechaFin);
    }
    const guardarHorarioRecogidaSeleccionada = (horarioRecogida: string) => {
        setHorarioRecogida(horarioRecogida);
    }
    const guardarHorarioDevolucionSeleccionada = (horarioDevolucion: string) => {
        setHorarioDevolucion(horarioDevolucion);
    }

    const redirigirAvailability = () => {
        const fechaInicioFormateada = selectedFechaInicio ? selectedFechaInicio.toISOString() : '';
        const fechaFinFormateada = selectedFechaFin ? selectedFechaFin.toISOString() : '';
        
        if (!inputHorarioRecogida.validity.valid) {
            Swal.fire("La hora de recogida no es válida.", "Debe ser al menos con una hora de anticipación", "error");
            return;
        }

        // si la fechainicio es la misma que la fechafin entonces se debe controlar que la horarecogida sea menor que la horadevolucion

        if (selectedFechaInicio && selectedFechaFin && selectedFechaInicio.toDateString() === selectedFechaFin.toDateString()) {
            if (selectedHorarioRecogida >= selectedHorarioDevolucion) {
                Swal.fire(
                    "Horario inválido",
                    "Si la fecha de inicio y fin son la misma, la hora de recogida debe ser menor que la de devolución.",
                    "error"
                );
                return;
            }
        }

        navigate(`/availability?sucursalId=${selectedSucursalId}&sucursalDevolucion=${selectedSucursalDevolucionId}&fechainicio=${fechaInicioFormateada}&fechaFin=${fechaFinFormateada}&horarioRecogida=${selectedHorarioRecogida}&horarioDevolucion=${selectedHorarioDevolucion}`);
    }

    return (
        <div className="container-fluid d-flex justify-content-center">
            {errorMessage && (
                <div className="alert alert-danger mt-2" role="alert"> {errorMessage}</div>
            )}

            <div className="row shadow p-4 rounded-4 mt-5" style={{ maxWidth: '1000px', width: '100%', backgroundColor: 'rgb(245, 245, 234)' }}>

                <div className="col-md-7 d-flex flex-column justify-content-center">
                    <h2 className="text-center mb-4">Alquiler de coches</h2>

                    <label className="text-start mb-1">Sucursal recogida</label> 
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-outline-secondary text-black">
                            <i className="bi bi-arrow-down-right"></i>
                        </span>
                        <select
                            name="lugarRecogida"
                            className="form-select"
                            required
                            value={selectedSucursalId}
                            onChange={
                                (e) => guardarSucursalSeleccionada(Number(e.target.value))
                            }
                        >
                            <option value="">Seleccione un lugar de recogida</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre}
                                </option>
                            ))}
                           
                        </select>
                    </div>

                    <label className="text-start mb-1">Sucursal devolución</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-outline-secondary text-black">
                            <i className="bi bi-arrow-down-right"></i>
                        </span>
                        <select
                            name="lugarDevolucion"
                            className="form-select"
                            required
                            value={selectedSucursalDevolucionId}
                            onChange={
                                (e) => guardarSucursalDevolucionSeleccionada(Number(e.target.value))
                            }
                        >
                            <option value="">Seleccione un lugar de devolución</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="row">

                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Fecha inicio</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-calendar4-range"></i>
                                </span>
                                <input type="date" id="fechainicio" name="fechainicio" className="form-control"
                                    value={selectedFechaInicio ? selectedFechaInicio.toISOString().split('T')[0] : ''}
                                    onChange={
                                        (e) => guardarFechaInicioSeleccionada(new Date(e.target.value))
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Fecha fin</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-calendar4-range"></i>
                                </span>
                                <input type="date" id='fechafin' name="fechaFin" className="form-control"
                                    value={selectedFechaFin ? selectedFechaFin.toISOString().split('T')[0] : ''}
                                    onChange={
                                        (e) => guardarFechaFinSeleccionada(new Date(e.target.value))
                                    }
                                />
                            </div>
                        </div>

                    </div>

                    <div className='row'>

                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Hora inicio</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-clock"></i>
                                </span>
                                <input type="time" id='horariorecogida' name="horarioRecogida" className="form-control"
                                    value={selectedHorarioRecogida}
                                    min={minHoraRecogida}
                                    onChange={
                                        (e) => guardarHorarioRecogidaSeleccionada(e.target.value)
                                    }
                                />
                                <span className="validity"></span>
                                <span className='small'>Reserva con 1 hora de antelación </span>
                            </div>
                        </div>

                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Hora fin</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-clock"></i>
                                </span>
                                <input type="time" id='horariodevolucion' name="horarioDevolucion" className="form-control"
                                    value={selectedHorarioDevolucion}
                                    onChange={
                                        (e) => guardarHorarioDevolucionSeleccionada(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                    </div>

                    <div className="card-footer mb-4">
                        <Button
                            style={{
                                color: "black",
                                backgroundColor: "beige",
                                border: "solid BurlyWood 2px",
                                width: '30%',
                            }}
                            texto='Buscar'
                            onClick={redirigirAvailability}
                        >
                        </Button>
                    </div>

                </div>

                <div className="col-md-5 d-flex align-items-center justify-content-center">
                    <img src={homeImg} alt="home" className="img-fluid rounded-4" />
                </div>

            </div>
        </div>
    );
};

export default Home;




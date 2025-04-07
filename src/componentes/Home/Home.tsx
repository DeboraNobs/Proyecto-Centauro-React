import React, { useEffect, useState } from 'react';
import homeImg from '../../assets/home.webp';
import { SucursalService } from '../../servicios/SucursalService';
import Button from '../Elements/Button';

const Home = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [sucursales, setSucursales] = useState<{ id: string | number; nombre: string }[]>([]);

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const sucursales = await SucursalService.getSucursales();
                setSucursales(sucursales);
            } catch (error) {
                console.error(error);
                setErrorMessage('No se pudieron cargar las sucursales.');
            }
        };

        fetchSucursales();
    }, []);

    return (
        <div className="container-fluid d-flex justify-content-center">
            {errorMessage && (
                <div className="alert alert-danger mt-2" role="alert">
                    {errorMessage}
                </div>
            )}

            <div className="row shadow p-4 rounded-4" style={{ maxWidth: '1000px', width: '100%', backgroundColor: 'rgb(245, 245, 234)' }}>

                <div className="col-md-7 d-flex flex-column justify-content-center">
                    <h2 className="text-center mb-4">Alquiler de coches</h2>

                    <label className="text-start mb-1">Lugar de recogida</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-outline-secondary text-black">
                            <i className="bi bi-arrow-down-right"></i>
                        </span>
                        <select name="LugarRecogida" className="form-select" required>
                            <option value="">Seleccione una lugar recogida</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label className="text-start mb-1">Lugar de devolución</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-outline-secondary text-black">
                            <i className="bi bi-arrow-up-right"></i>
                        </span>
                        <select name="LugarDevolucion" className="form-select" required>
                            <option value="">Seleccione una lugar devolución</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="row"> { /* fechas */}
                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Fecha inicio</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-calendar4-range"></i>
                                </span>
                                <input type="date" name="FechaInicio" className="form-control" />
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Fecha fin</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-calendar4-range"></i>
                                </span>
                                <input type="date" name="FechaFin" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className='row'>  { /* horarios */}
                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Hora inicio</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-clock"></i>
                                </span>
                                <input type="time" name="HorarioRecogida" className="form-control" />
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <label className="form-label mt-1 text-start w-100">Hora fin</label>
                            <div className="input-group">
                                <span className="input-group-text bg-outline-secondary text-black">
                                    <i className="bi bi-clock"></i>
                                </span>
                                <input type="time" name="HorarioDevolucion" className="form-control" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-footer">
                        <Button 
                            style={{
                                color: "black",
                                backgroundColor: "beige",
                                border: "solid BurlyWood 2px",
                                width: '30%',
                            }}
                            texto='Buscar'>
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

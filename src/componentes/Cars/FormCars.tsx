import React, { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Elements/Button';
import { GroupService } from '../../servicios/GroupService';
import { SucursalService } from '../../servicios/SucursalService';
import { Car } from '../../types/types';
import { CarsService } from '../../servicios/CarsService';

const FormCars = () => {
 const { id } = useParams(); // siempre devuelve un string, hay que convertir a number porque id espera un number
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [grupos, setGrupos] = useState<{ id: string | number; nombre: string }[]>([]);
  const [sucursales, setSucursales] = useState<{ id: string | number; nombre: string }[]>([]);

  const NumeroPuertas: number[] = [1, 2, 3, 4, 5];
  const NumeroPlazas: number[] = [1, 2, 3, 4, 5];

  const [isEditing] = useState(!!id);

  const [formData, setFormData] = useState({
    id: 0,
    marca: '',
    modelo: '',
    descripcion: '',
    patente: '',
    tipo_coche: '',
    tipo_cambio: '',
    num_puertas: 0,
    num_plazas: 0,
    num_maletas: 0,
    posee_aire_acondicionado: false,
    GrupoId: 0,
    SucursalId: 0,
  });

  useEffect(() => {
    if (id) {
      const loadCarData = async () => {
        setIsLoading(true);
        try {
          const car = await CarsService.getCarById(Number(id));
          setFormData({
            id: car.id,
            marca: car.marca,
            modelo: car.modelo,
            descripcion: car.descripcion,
            patente: car.patente,
            tipo_coche: car.tipo_coche,
            tipo_cambio: car.tipo_cambio,
            num_puertas: car.num_puertas,
            num_plazas: car.num_plazas,
            num_maletas: car.num_maletas,
            posee_aire_acondicionado: car.posee_aire_acondicionado,
            GrupoId: car.GrupoId,
            SucursalId: car.SucursalId,
          });
          setErrorMessage('');

        } catch (error) {
          console.error('Error al cargar el coche:', error);
          setErrorMessage('No se pudo cargar la información del coche.');
        } finally {
          setIsLoading(false);
        }
      };
      loadCarData();
    }

    const fetchGrupos = async () => {
      try {
        const grupos = await GroupService.getGrupos();
        setGrupos(grupos);
      } catch (error) {
        console.error(error);
        setErrorMessage('No se pudieron cargar los grupos.');
      }
    };

    const fetchSucursales = async () => {
      try {
        const sucursales = await SucursalService.getSucursales();
        setSucursales(sucursales);
      } catch (error) {
        console.error(error);
        setErrorMessage('No se pudieron cargar las sucursales.');
      }
    };

    fetchGrupos();
    fetchSucursales();
  }, [id]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      let result: Car;

      if (isEditing && id) {
        result = await CarsService.updateCar(Number(id), formData);
      } else {
        result = await CarsService.createCar(formData)
      }
      console.log('Operación exitosa:', result);
      alert(`Coche ${isEditing ? 'editado' : 'creado'} correctamente`);
      navigate('/cars');

    } catch (error: any) {
      console.error('Error en la operación:', error);
      setErrorMessage(error.message || 'Error al crear el coche');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">Cargando formulario de coches...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ border: '1px solid BurlyWood' }}>
        <h2 className="text-center mb-4">{isEditing ? 'Edición' : 'Registro'} de Coches</h2>

        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-car-front"></i></span>
                <input
                  type="text"
                  name="marca"
                  placeholder="Marca"
                  value={formData.marca}
                  className="form-control"
                  required
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                <input
                  type="text"
                  name="modelo"
                  placeholder="Modelo"
                  value={formData.modelo}
                  className="form-control"
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                />
              </div>
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-file-text"></i></span>
                <input
                  type="text"
                  name="descripcion"
                  placeholder="Descripcion"
                  value={formData.descripcion}
                  className="form-control"
                  required
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-card-text"></i></span>
                <input
                  type="text"
                  name="patente"
                  placeholder="Patente"
                  value={formData.patente}
                  className="form-control"
                  onChange={(e) => setFormData({ ...formData, patente: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-car-front"></i></span>
                <select
                  name="tipo_coche"
                  value={formData.tipo_coche}
                  className="form-select"
                  required
                  onChange={(e) => setFormData({ ...formData, tipo_coche: e.target.value })}
                >
                  <option value="">Selecciona el tipo coche</option>
                  <option value="Familiar">Familiar</option>
                  <option value="Electrico">Eléctrico</option>
                  <option value="Deportivo">Deportivo</option>

                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-gear"></i></span>
                <select
                  name="tipo_cambio"
                  value={formData.tipo_cambio}
                  className="form-select"
                  required
                  onChange={(e) => setFormData({ ...formData, tipo_cambio: e.target.value })}
                >
                  <option value="">Selecciona el tipo de cambio</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatico">Automático</option>
                  <option value="Semi">Semi Automático</option>

                </select>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-door-open"></i></span>
                <select
                  name="num_puertas"
                  value={formData.num_puertas}
                  className="form-select"
                  required
                  onChange={(e) => setFormData({ ...formData, num_puertas: Number(e.target.value) })} // hay que colocarle number porque e.target.value siempre devuelve un string
                >
                  <option value="">Selecciona el número de puertas</option>

                  {NumeroPuertas.map((numero) => (
                    <option key={numero} value={numero}>
                      {numero}
                    </option>
                  ))}

                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-people"></i></span>
                <select
                  name="num_plazas"
                  value={formData.num_plazas}
                  className="form-select"
                  required
                  onChange={(e) => setFormData({ ...formData, num_plazas: Number(e.target.value) })}
                >
                  <option value="">Selecciona el número de plazas</option>

                  {NumeroPlazas.map((numero) => (
                    <option key={numero} value={numero}>
                      {numero}
                    </option>
                  ))}

                </select>
              </div>
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">¿Posee aire acondicionado?</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="aire_si"
                  name="posee_aire_acondicionado"
                  value="true"
                  checked={formData.posee_aire_acondicionado === true}
                  onChange={() => setFormData({ ...formData, posee_aire_acondicionado: true })}
                  className="form-check-input"
                  required
                />
                <label htmlFor="aire_si" className="form-check-label">
                  Sí
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="aire_no"
                  name="posee_aire_acondicionado"
                  value="false"
                  checked={formData.posee_aire_acondicionado === false}
                  onChange={() => setFormData({ ...formData, posee_aire_acondicionado: false })}
                  className="form-check-input"
                  required
                />
                <label htmlFor="aire_no" className="form-check-label">
                  No
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-collection"></i></span>
                <select
                  name="GrupoId"
                  className="form-select" required
                  value={formData.GrupoId}
                  onChange={(e) => setFormData({ ...formData, GrupoId: Number(e.target.value) })}
                >
                  <option value="">Selecciona un grupo</option>
                  {grupos.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                      {grupo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-shop"></i></span>
                <select
                  name="SucursalId"
                  className="form-select" required
                  value={formData.SucursalId}
                  onChange={(e) => setFormData({ ...formData, SucursalId: Number(e.target.value) })}
                >
                  <option value="">Selecciona una sucursal</option>
                  {sucursales.map((sucursal) => (
                    <option key={sucursal.id} value={sucursal.id}>
                      {sucursal.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-bag"></i></span>
                <select
                  name="num_maletas"
                  value={formData.num_maletas}
                  className="form-select"
                  required
                  onChange={(e) => setFormData({ ...formData, num_maletas: Number(e.target.value) })}
                >
                  <option value="">Número de maletas</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <Button
              type="button"
              style={{
                color: "black",
                padding: "7px",
                backgroundColor: "lightgray",
                border: "solid gray 2px"
              }}
              texto="Cancelar"
            />

            <Button
              type="submit"
              style={{
                color: "black",
                padding: "7px",
                backgroundColor: "beige",
                border: "solid BurlyWood 2px"
              }}
              texto={isEditing ? 'Editar' : 'Registrar'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCars;
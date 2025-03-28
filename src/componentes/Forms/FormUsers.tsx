import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FaUser, FaEnvelope, FaMobileAlt, FaLock, FaUserShield } from 'react-icons/fa';
import Button from '../Elements/Button';
import { User } from '../../types/types';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersService } from '../../servicios/UsersService';

const FormUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing] = useState(!!id);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    movil: '',
    password: '',
    rol: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Cargar datos del usuario si estamos editando
  useEffect(() => {
    if (id) {
      const loadUserData = async () => {
        setIsLoading(true);
        try {
          const user = await UsersService.getUserById(id);
          setFormData({
            nombre: user.nombre,
            apellidos: user.apellidos || '',
            email: user.email,
            movil: user.movil || '',
            password: '', // No cargamos la contraseña por seguridad
            rol: user.rol
          });
          setErrorMessage('');
        } catch (error) {
          console.error('Error al cargar usuario:', error);
          setErrorMessage('No se pudo cargar la información del usuario.');
        } finally {
          setIsLoading(false);
        }
      };
      loadUserData();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      let result: User;
      
      if (isEditing && id) {
        // Actualizar usuario existente
        result = await UsersService.updateUser(id, formData);
      } else {
        // Crear nuevo usuario
        result = await UsersService.createUser(formData);
      }

      console.log('Operación exitosa:', result);
      alert(`Usuario ${isEditing ? 'actualizado' : 'creado'} correctamente`);
      navigate('/users');
      
    } catch (error: any) {
      console.error('Error en la operación:', error);
      setErrorMessage(error.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el usuario`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ border: '1px solid BurlyWood' }}>
        <h2 className="text-center mb-4">{isEditing ? 'Editar Usuario' : 'Registro de Usuario'}</h2>
        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input 
                  type="text" 
                  name="nombre" 
                  placeholder="Nombre" 
                  value={formData.nombre} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input 
                  type="text" 
                  name="apellidos" 
                  placeholder="Apellidos" 
                  value={formData.apellidos} 
                  onChange={handleChange} 
                  className="form-control" 
                />
              </div>
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaMobileAlt /></span>
                <input 
                  type="tel" 
                  name="movil" 
                  placeholder="Móvil" 
                  value={formData.movil} 
                  onChange={handleChange} 
                  className="form-control" 
                />
              </div>
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Contraseña" 
                  value={formData.password} 
                  onChange={handleChange} 
                  className="form-control" 
                  required={!isEditing}
                  minLength={6}
                />
              </div>
              {isEditing && <small className="text-muted">Dejar en blanco para no cambiar</small>}
            </div>
            
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaUserShield /></span>
                <select 
                  name="rol" 
                  value={formData.rol} 
                  onChange={handleChange} 
                  className="form-select" 
                  required
                >
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Admin</option>
                  <option value="usuario">Usuario</option>
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
              texto={isLoading 
                ? (isEditing ? "Guardando..." : "Creando...") 
                : (isEditing ? "Guardar cambios" : "Registrar")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUsers;
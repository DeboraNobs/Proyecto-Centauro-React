import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaMobileAlt, FaLock, FaUserShield } from 'react-icons/fa';
import Button from '../Elements/Button';
import { User } from '../../types/types';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersService } from '../../servicios/UsersService';

import { useForm, SubmitHandler } from 'react-hook-form';

const FormUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing] = useState(!!id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();
  const onSubmit: SubmitHandler<User> = async data => {
      try {
        setIsLoading(true);
        if (isEditing && id) {
          await UsersService.updateUser(id, data);
        } else {
          await UsersService.createUser(data);
        }

        alert(`Usuario ${isEditing ? 'actualizado' : 'creado'} correctamente`);
        navigate('/users');
      } catch (error: any) {
          console.error('Error en la operación:', error);
          setErrorMessage(error.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el usuario`);
      } finally {
          setIsLoading(false);
      }
  };
  
  /*
  const [formData, setFormData] = useState({
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    movil: '',
    password: '',
    rol: ''
  });
*/
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        setIsLoading(true);
        try {
          const user = await UsersService.getUserById(id);
          reset(user); // rellena el usuario
          /*
          setFormData({
            id: user.id,
            nombre: user.nombre,
            apellidos: user.apellidos || '',
            email: user.email,
            movil: user.movil || '',
            password: user.password || '',
            rol: user.rol
          });
          */
        } catch (error) {
            console.error('Error al cargar usuario:', error);
            setErrorMessage('No se pudo cargar la información del usuario.');
        } finally {
            setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, reset]);


  /*const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  

  const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isEditing && id) {
        await UsersService.updateUser(id, formData);
      } else {
        await UsersService.createUser(formData);
      }

      alert(`Usuario ${isEditing ? 'actualizado' : 'creado'} correctamente`);
      navigate('/users');
      
    } catch (error: any) {
        console.error('Error en la operación:', error);
        setErrorMessage(error.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el usuario`);
    } finally {
        setIsLoading(false);
    }
  };
*/

  const navegarListado = () => {
    navigate('/users');
  }

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="text-center">Cargando formulario...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{ border: '1px solid BurlyWood' }}>
        <h2 className="text-center mb-4">{isEditing ? 'Editar Usuario' : 'Registro de Usuario'}</h2>
        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="row mb-3">
            
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input {...register('nombre', { required: 'El nombre es requerido', 
                                                 minLength: { 
                                                      value: 4,
                                                      message: 'El mínimo son 4 caracteres'
                                                    },
                                                  validate: valor => valor !== 'admin' ? true : 'No puede usar admin como nombre de usuario'
                                              })}
                  type="text"  
                  placeholder="Nombre" 
                  className="form-control" 
                  required 
                /> 
              </div>
              <p className='text-start text-danger'>{ errors.nombre?.message}</p>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <input {...register('apellidos', { required: 'Los apellidos son requeridos', 
                                                  minLength: { 
                                                      value: 2,
                                                      message: 'El mínimo son 2 caracteres'
                                                    },
                                                    maxLength: { 
                                                      value: 150,
                                                      message: 'El máximo son 150 caracteres'
                                                    },
                                                })}
                  type="text" 
                  placeholder="Apellidos" 
                  className="form-control" 
                />
              </div>
              <p className='text-start text-danger'>{ errors.apellidos?.message}</p>
            </div>

          </div>
          
          <div className="row mb-3">

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input {...register('email', { required: 'El email es requerido', 
                                                minLength: { 
                                                    value: 7,
                                                    message: 'El mínimo son 7 caracteres'
                                                },
                                                maxLength: { 
                                                  value: 150,
                                                  message: 'El máximo son 150 caracteres'
                                                },
                                              })}
                  type="email" 
                  placeholder="Email" 
                  className="form-control" 
                  required 
                />
              </div>
              <p className='text-start text-danger'>{ errors.email?.message}</p>
            </div>

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaMobileAlt /></span>
                <input {...register('movil', { required: 'El móvil es requerido', 
                                               pattern: {
                                                  value: /^[0-9]{9}$/,
                                                  message: "Debe ingresar 9 números, sin prefijo. Ejemplo: 645879898"
                                                },
                                             })}
                  type="tel" 
                  placeholder="Móvil" 
                  className="form-control" 
                />
              </div>
              <p className='text-start text-danger'>{ errors.movil?.message}</p>
            </div>

          </div>
          
          <div className="row mb-3">

            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input {...register('password', { required: 'La contraseña es requerida', 
                                                  pattern: {
                                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                                                    message: "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, y un número"
                                                  }
                                              })}
                  type="password"
                  placeholder="Contraseña" 
                  className="form-control" 
                />
              </div>
              <p className='text-start text-danger'>{ errors.password?.message}</p>
            </div>
            
            <div className="col-md-6">

              <div className="input-group">
                <span className="input-group-text"><FaUserShield /></span>
                <select {...register('rol', { required: 'El rol es requerido' })}
                  className="form-select" 
                  required
                >
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Admin</option>
                  <option value="usuario">Usuario</option>
                </select>
              </div>

            </div>
            <p className='text-start text-danger'>{ errors.rol?.message}</p>
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
              onClick={navegarListado}
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
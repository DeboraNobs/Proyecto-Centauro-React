import React, { useState } from 'react';
import logo from '../../assets/familia.jpeg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Login } from '../../types/types';
import { UsersService } from '../../servicios/UsersService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async data => {
    try {
        await UsersService.login({ Email: data.Email, Password: data.Password });
        navigate('/');
    } catch (error: any) {
        console.error('Error en la operación:', error);
        setErrorMessage(error.message);
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="login_bg" className="login__bg" />

      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <h1 className="login__title">Iniciar Sesión</h1>

        <div className="login__inputs">
          <div className="login__box">
            <input {...register('Email', { required: 'Email es obligatorio' })}
                type="email" placeholder="Email" required className="login__input" />
            <i className="ri-mail-fill"></i>
            <p className='text-start text-danger'>{ errors.Email?.message}</p>
         </div>

          <div className="login__box">
            <input {...register('Password', { required: 'La contraseña es obligatoria' })}
                type="password" placeholder="Password" required className="login__input" />
            <i className="ri-lock-2-fill"></i>
            <p className='text-start text-danger'>{ errors.Password?.message}</p>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-box">
            <input type="checkbox" className="login__check-input" id="user-check" />
            <label htmlFor="user-check" className="login__check-label">Recuérdame</label>
          </div>

        </div>

        <button type="submit" className="login__button">Login</button>

        <div className="login__register">
          No tienes cuenta? <a href="/form-users">Registrate</a>
        </div>

      </form>
    </div>
  );
};

export default LoginForm;

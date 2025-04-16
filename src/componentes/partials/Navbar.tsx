import React from 'react';
import logo from '../../assets/centauro_logo.png';
import ruedacopia from '../../assets/ruedacopia.png';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const irInicio = () => {
        navigate("/");
    }

    const logout = () => {
        localStorage.clear();
        localStorage.setItem('loggedIn', JSON.stringify(false));
        navigate('/');
    }

    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn') ?? 'false');
    const username = localStorage.getItem('username');
    
    return (
        <nav className="navbar-container d-flex align-items-center justify-content-between p-3 mb-3">
      
            <div className="d-flex flex-column" onClick={irInicio} style={{cursor: 'pointer'}}>
                <h2 className="mb-0 brand-title">Centauro</h2>
                <h4 className="mb-0 brand-subtitle">Be Roadlover</h4>
            </div>

            <a href="/"><img src={ruedacopia} alt="Centauro logo" className="wheel-logo" /></a>

            <div className="nav-links d-flex gap-3">
                <Link to="/" className="nav-item">Inicio</Link>
                <Link to="fleet" className="nav-item">Flota</Link>
                <Link to="cars" className="nav-item">Coches</Link>
                <Link to="users" className="nav-item">Usuarios</Link>
                <Link to="rentals" className='nav-item'>Rentals</Link>               
                <Link to="login" className='nav-item'>Login</Link>

                {isLoggedIn &&
                    <Link to="login" className='nav-item' onClick={logout}>Logout</Link>
                }
                {isLoggedIn &&
                    <p className='mt-3 brand-subtitle'> Hola {username} </p>
                }
            </div>

            <a href="/"><img src={logo} alt="Centauro logo" className="nav-logo" /></a>
        </nav>
    );
};

export default Navbar;


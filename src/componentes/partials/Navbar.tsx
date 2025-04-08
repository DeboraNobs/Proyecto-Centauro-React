import React from 'react';
import logo from '../../assets/centauro_logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const irInicio = () => {
        navigate("/");
    }

    return (
        <nav className="navbar-container d-flex align-items-center justify-content-between p-3 mb-3">
      
            <div className="d-flex flex-column" onClick={irInicio} style={{cursor: 'pointer'}}>
                <h2 className="mb-0 brand-title">Centauro</h2>
                <h4 className="mb-0 brand-subtitle">Rent a car</h4>
            </div>

            <div className="nav-links d-flex gap-3">
                <Link to="/" className="nav-item">Inicio</Link>
                <Link to="fleet" className="nav-item">Flota</Link>
                <Link to="cars" className="nav-item">Coches</Link>
                <Link to="users" className="nav-item">Usuarios</Link>
                <Link to="login" className='nav-item'>Login</Link>
            </div>

            <a href="/"><img src={logo} alt="Centauro logo" className="nav-logo" /></a>
        </nav>
    );
};

export default Navbar;


import React from 'react';
import logo from '../../assets/centauro_logo.png';

const Navbar = () => {
    return (
        <div className="Navbar d-flex align-items-center justify-content-between p-3">
            <div className="d-flex flex-column">
                <h1 className="mb-0">Centauro</h1>
                <h3 className="mb-0">Rent a car</h3>
            </div>
            <img src={logo} alt="Centauro logo" width={250} height={50} />
        </div>
    );
};

export default Navbar;

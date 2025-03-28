import './App.css';
import React from 'react';
import Cars from './componentes/Cars/Cars';
import CarDetails from './componentes/Cars/CarDetails';
import FormUsers from './componentes/Forms/FormUsers';
import Navbar from './componentes/Partials/Navbar';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Users from './componentes/Forms/Users';

function App() {
  return (
    <div className="App">
      <Navbar />
      

      <Routes>
     
        <Route path="/" element={
          <Cars>
            <CarDetails />
          </Cars>
        } />
        
        <Route path='/users' element={<Users />}></Route>
        <Route path="/form-users" element={<FormUsers />} />
        <Route path="/form-users/:id" element={<FormUsers />} />
        
      </Routes>
    </div>
  );
}

export default App;

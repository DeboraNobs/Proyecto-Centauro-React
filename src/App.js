import './App.css';
import React from 'react';
import Fleet from './componentes/Fleet/Fleet';
import CarDetails from './componentes/Fleet/CarDetails';
import FormUsers from './componentes/Users/FormUsers';
import Navbar from './componentes/Partials/Navbar';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Users from './componentes/Users/Users';
import Cars from './componentes/Cars/Cars';
import FormCars from './componentes/Cars/FormCars';
import FleetFilter from './componentes/Elements/FleetFilter';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
     
        <Route path="/" element={
          <Fleet>
            <FleetFilter />
            <CarDetails />
          </Fleet>
        } />
        
        <Route path='/users' element={<Users />}></Route>
        <Route path='/cars' element={<Cars />}></Route>

        <Route path="/form-users" element={<FormUsers />} />
        <Route path="/form-users/:id" element={<FormUsers />} />

        <Route path="/form-cars" element={<FormCars />}></Route>
        <Route path="/form-cars/:id" element={<FormCars />}> </Route>
        
      </Routes>
    </div>
  );
}

export default App;

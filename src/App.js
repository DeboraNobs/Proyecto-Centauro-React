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
import FleetFilter from './componentes/Fleet/FleetFilter';
import Home from './componentes/Home/Home';
import Availability from './componentes/Fleet/Availability';
import LoginForm from './componentes/Login/LoginForm';
import NotFound from './componentes/NotFound/NotFound';
import Rentals from './componentes/Rentals/Rentals';
import RentalDetails from './componentes/Rentals/RentalDetails';
import ErrorBoundary from './componentes/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/availability" element={<Availability />} />

          <Route path="/fleet" element={
            <Fleet>
              <FleetFilter />
              <Route path="/car-details" element={<CarDetails />} />
            </Fleet>
          } />

          <Route path="/users" element={<Users />}></Route>
          <Route path="/cars" element={<Cars />}></Route>

          <Route path="/form-users" element={<FormUsers />} />
          <Route path="/form-users/:id" element={<FormUsers />} />

          <Route path="/form-cars" element={<FormCars />}></Route>
          <Route path="/form-cars/:id" element={<FormCars />}></Route>

          <Route path="/login" element={<LoginForm />}></Route>

          <Route path="/rentals" element={<Rentals />}></Route>
          <Route path="/rentalsDetails" element={<RentalDetails />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>

      </ErrorBoundary>
    </div>
  );
}

export default App;

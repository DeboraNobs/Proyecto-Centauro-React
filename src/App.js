import './App.css';
import Cars from './componentes/coches/Cars';
import CarDetails from './componentes/coches/CarDetails';
import Navbar from './componentes/partials/Navbar';

function App() {
  return (
    <div className="App">
        
        <Navbar />

        <Cars>
          <CarDetails />
        </Cars>
    </div>
  );
}

export default App;

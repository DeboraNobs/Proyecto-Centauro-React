import React, { useEffect, useState } from 'react';
import { Car } from '../../types/types';
import { useLocation } from "react-router-dom";
import CarDetails from '../Fleet/CarDetails';

const RentalDetails = () => {

  const [auto, setAuto] = useState<Car | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5038/api/coche/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("no se ha podido encontrar el coche");
          }
          return res.json();
        })
        .then((data) => {
          setAuto(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [id]);

  if (!auto) {
    return <p>No se encontró el coche</p>;
  }

  return (
    <div className='container'>
      <h2 className='mb-4'>Detalles del coche que desea alquilar:</h2>
      <CarDetails coche={auto} />
    </div>
  );
}

export default RentalDetails;






{ /* 
  import React, { useEffect, useState } from 'react';
import { Car } from '../../types/types';
import { FaCar, FaExchangeAlt, FaSnowflake, FaUserFriends } from "react-icons/fa";
import { GiCarDoor } from "react-icons/gi";
import { MdOutlineLuggage } from "react-icons/md";
import { useLocation } from "react-router-dom";

const RentalDetails = () => {

  const [auto, setAuto] = useState<Car | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5038/api/coche/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("no se ha podido encontrar el coche");
          }
          return res.json();  
        })
        .then((data) => {
          setAuto(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [id]);



if (!auto) {
  return <p>No se encontró el coche</p>;
}

const imageSrc = auto.imagen ? `data:image/jpeg;base64,${auto.imagen}` : null;

return (
  <div className='container'>
    <h2 className='mb-4'> Detalles de su alquiler: </h2>

    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{auto.marca} {auto.modelo}</h5>
        <h6> o similar</h6>

        {imageSrc && (
          <img
            src={imageSrc}
            alt={`${auto.marca} ${auto.modelo}`}
            className="card-img-top img-hover"
            style={{ objectFit: "cover", width: "100%", height: "160px" }}
          />
        )}

        <p className="card-text"> {auto.descripcion}</p>

        <div className="row mb-3">
          <div className="col-md-6">
            <p className="card-text">
              <MdOutlineLuggage />
              {auto.num_maletas}
            </p>
          </div>

          <div className="col-md-6">
            <p className="card-text">
              <FaSnowflake
                color={!auto.posee_aire_acondicionado ? "#6c757d" : undefined}
              />
              {auto.posee_aire_acondicionado ? 'Sí' : 'No'}
            </p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <p className="card-text">
              <FaCar /> {auto.tipo_coche}
            </p>
          </div>

          <div className="col-md-6">
            <p className="card-text">
              <FaExchangeAlt /> {auto.tipo_cambio}
            </p>
          </div>
        </div>


        <div className="row mb-3">
          <div className="col-md-6">
            <p className="card-text">
              <GiCarDoor /> {auto.num_puertas}
            </p>
          </div>

          <div className="col-md-6">
            <p className="card-text">
              <FaUserFriends /> {auto.num_plazas}
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>

)
}

export default RentalDetails;

*/
}
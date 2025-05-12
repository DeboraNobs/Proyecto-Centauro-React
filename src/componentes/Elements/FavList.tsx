import React, { useEffect, useState } from 'react';
import { Car, Favorito } from '../../types/types';
import CarDetails from '../Fleet/CarDetails';

const FavList: React.FC = () => {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [cochesFavoritos, setCochesFavoritos] = useState<Car[]>([]);
 
  useEffect(() => {
    const usuarioIdRaw = localStorage.getItem('id');
    const favoritosRaw = sessionStorage.getItem('favoritos');

    const fetchCochesYFavoritos = async () => {
      try {
        const response = await fetch('http://localhost:5038/api/coche/con-grupo');
        const data = await response.json();
        const coches: Car[] = data.$values || data; 

        if (usuarioIdRaw && favoritosRaw) {
          const usuarioId = parseInt(usuarioIdRaw);
          const favoritosObjeto: Favorito[] = JSON.parse(favoritosRaw);
          const favoritosUsuario = favoritosObjeto.filter(fav => fav.usuarioId === usuarioId);

          setFavoritos(favoritosUsuario);

          const cochesFiltrados = coches.filter(coche =>
            favoritosUsuario.some(fav => fav.cocheId === coche.id)
          );

          setCochesFavoritos(cochesFiltrados);
        }
      } catch (error) {
        console.error('Error al cargar coches o favoritos:', error);
      }
    };

    fetchCochesYFavoritos();
  }, []);

  return (
    <div>
      <h2>Mis Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No hay coches favoritos.</p>
      ) : (
        <><div className='container'>
          <div className="row">
            {cochesFavoritos.map((coche, index) => (
              <div className="col-12 col-md-6 col-lg-4 mb-3" key={index}>
                <CarDetails
                  coche={coche}
                  selectedSucursalId={coche.SucursalId}
                  sucursalDevolucion={coche.SucursalId}
                  fechainicio={new Date()}
                  fechaFin={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
                  selectedHorarioRecogida="10:00"
                  selectedHorarioDevolucion="12:00" />
              </div>
            ))}
          </div>
        </div></>
      )}
    </div>
  );
};

export default FavList;

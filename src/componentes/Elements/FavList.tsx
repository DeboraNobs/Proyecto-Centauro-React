import React, { useEffect, useState } from 'react'
import { Favorito } from '../../types/types';

const FavList = () => {

  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  useEffect(() => {
    const favoritosRaw = sessionStorage.getItem('favoritos');
    if (favoritosRaw) {
      try {
        const favoritosObjeto: Favorito[] = JSON.parse(favoritosRaw); // convierto en objeto un json
        setFavoritos(favoritosObjeto);
      } catch (error) {
        console.error('Error al parsear favoritos', error);
      }
    }
  }, []);


  return (
    <div>
      <h2>Mis Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No hay coches favoritos.</p>
      ) : (
        <ul>
          {favoritos.map((fav, index) => (
            <li key={index}>
              Usuario ID: {fav.usuarioId}, Coche ID: {fav.cocheId}
            </li>
          ))}
        </ul>
      )}
    </div>

  )
}

export default FavList
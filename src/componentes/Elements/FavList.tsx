import React, { useEffect, useState } from 'react'
import { Favorito } from '../../types/types';

const FavList = () => {

  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  useEffect(() => {
    const usuarioIdRaw = localStorage.getItem('id');    
    const favoritosRaw = sessionStorage.getItem('favoritos');
      if (favoritosRaw && usuarioIdRaw) {
      try {
        const usuarioId = parseInt(usuarioIdRaw);
        const favoritosObjeto: Favorito[] = JSON.parse(favoritosRaw); // convierto en objeto un json

        const favoritosUsuario = favoritosObjeto.filter((fav) => fav.usuarioId == usuarioId);

        setFavoritos(favoritosUsuario);
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
          {favoritos.map((fav, index) => ( // map(valor/ indice)
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
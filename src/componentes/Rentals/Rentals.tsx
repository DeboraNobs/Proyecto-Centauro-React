import React, { useEffect, useState } from 'react'
import { Rental } from '../../types/types';
import { RentalService } from '../../servicios/RentalService';
import { FaSearch } from 'react-icons/fa';
import { confirmarEliminacion } from '../../utils/confirmDelete';

const Rentals = () => {

  const [rentals, setRentals] = useState<Rental[]>([]);
  const [mensajeError, setMensajeError] = useState<string>('');
  const [mensajeExito, setMensajeExito] = useState<string>('');
  const [, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    cargarRentals();
  }, []);

  const cargarRentals = async () => {
    setIsLoading(true);
    try {
      const response = await RentalService.getRentals();
      console.log(response);
      setRentals(response);
    } catch (error) {
      setMensajeError("Error al obtener todos los alquileres.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  const borrarRental = async (id: number) => {
    try {
      const confirmado = await confirmarEliminacion("¿Está seguro de que desea eliminar esta reserva?");
      if (!confirmado) return;

      await RentalService.deleteRental(id);
      setMensajeExito("Alquiler eliminado");
      cargarRentals();
    } catch (error) {
      setMensajeError("Error al eliminar el alquiler");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setSearch(target.value);
  }

  let computadaRentals: Rental[] = [];
  if (!search) {
    computadaRentals = Array.isArray(rentals) ? rentals : [];
  } else {
    computadaRentals = rentals.filter((dato) =>
      dato.lugarRecogida.toLowerCase().includes(search.toLowerCase()) ||
      dato.lugarDevolucion.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4 mt-2">Lista de Alquileres</h2>

      <div className="input-group mb-3">
        <span className="input-group-text"><FaSearch /></span>
        <input type="text" className='form-control' placeholder='Introduzca su búsqueda (lugar recogida o lugar devolución)'
          value={search}
          onChange={searcher}
        />
      </div>

      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

      <table className="table table-striped" style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Inicio - Fin</th>
            <th>Lugar recogida</th>
            <th>Lugar devolucion </th>
            <th>Hora recogida</th>
            <th>Hora devolucion</th>
            <th>Grupo</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {computadaRentals.length > 0 ? (
            computadaRentals.map((rental) => (
              <tr key={rental.id}>

                <td> {new Date(rental.fechainicio).toLocaleDateString()} - {new Date(rental.fechaFin).toLocaleDateString()} </td>
                <td>{rental.lugarRecogida}</td>
                <td>{rental.lugarDevolucion}</td>
                <td>{String(rental.horarioRecogida).slice(0, 5)}</td>
                <td>{String(rental.horarioDevolucion).slice(0, 5)}</td>
                <td>{rental.grupoId}</td>
                <td>{rental.usersId}</td>

                <td>

                  {
                    /*
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => editarRental((rental.id))}>
                      <span className="bi bi-pencil-square"></span>&nbsp;Editar
                    </button>
                      */
                  }
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => borrarRental((rental.id))}>
                    <span className="bi-trash"></span>&nbsp;Eliminar
                  </button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">Alquiler no encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Rentals
import React, { useState, useEffect } from 'react';
import { User } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { UsersService } from '../../servicios/UsersService';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { confirmarEliminacion } from '../../utils/confirmDelete';

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [mensajeError, setMensajeError] = useState<string>('');
    const [mensajeExito, setMensajeExito] = useState<string>('');
    const [, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        setIsLoading(true);
        try {
            const usersData = await UsersService.getUsers();
            setUsers(usersData);
        } catch (error) {
            setMensajeError("Error al obtener todos los usuarios.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const borrarUsuario = async (id: string) => {
        try {
            const confirmado = await confirmarEliminacion("¿Está seguro de que desea eliminar este usuario?");
            if (!confirmado) return;

            await UsersService.deteleUser(id);
            setMensajeExito("Usuario eliminado");
            cargarUsuarios();
        } catch (error) {
            setMensajeError("Error al eliminar el usuario.")
            Swal.fire("Error al eliminar el usuario", "Inténtelo nuevamente más tarde", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const editarUsuario = (id: string) => {
        navigate(`/form-users/${id}`);
    };

    const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setSearch(target.value);
    }

    let computadaUsuarios: User[] = [];
    if (!search) {
        computadaUsuarios = users;
    } else {
        computadaUsuarios = users.filter((dato) =>
            dato.nombre.toLowerCase().includes(search.toLowerCase()) ||
            dato.apellidos.toLowerCase().includes(search.toLowerCase())
        )
    }

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4 mt-2">Lista de Usuarios</h2>

            <div className="text-end mb-3 d-flex justify-content-center">
                <Link to="/form-users"
                    style={{
                        color: "black",
                        padding: "7px",
                        backgroundColor: "beige",
                        border: "solid BurlyWood 2px",
                        borderRadius: "5px",
                        textDecoration: 'none'
                    }}>
                    Crear Usuario
                </Link>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text"><FaSearch /></span>
                <input type="text" className='form-control' placeholder='Introduzca su búsqueda'
                    value={search}
                    onChange={searcher}
                />
            </div>

            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

            <table className="table table-striped" style={{ backgroundColor: "white" }}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Móvil</th>
                        <th>Rol</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {computadaUsuarios.length > 0 ? (
                        computadaUsuarios.map((user) => (
                            <tr key={user.id}>
                                <td>{user.nombre} {user.apellidos}</td>
                                <td>{user.email}</td>
                                <td>{user.movil}</td>
                                <td>{user.rol}</td>
                                <td>

                                    <button
                                        type="button"
                                        className="btn btn-outline-warning btn-sm"
                                        onClick={() => editarUsuario(String(user.id))}>
                                        <span className="bi bi-pencil-square"></span>&nbsp;Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => borrarUsuario(String(user.id))}>
                                        <span className="bi-trash"></span>&nbsp;Eliminar
                                    </button>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">Usuario no encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;

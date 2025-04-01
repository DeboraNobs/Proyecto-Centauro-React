import React, { useState, useEffect } from 'react';
import { User } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { UsersService } from '../../servicios/UsersService';

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [mensajeError, setMensajeError] = useState<string>(''); 
    const [mensajeExito, setMensajeExito] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
            await UsersService.deteleUser(id);
            setMensajeExito("Usuario eliminado");
            cargarUsuarios();
        } catch (error) {
            setMensajeError("Error al eliminar el usuario.")
        } finally {
            setIsLoading(false);
        }
    };

     const editarUsuario = (id: string) => {
        navigate(`/form-users/${id}`);
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Usuarios</h2>
            {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

            <div className="text-end mb-3">
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
                    {users.length > 0 ? (
                        users.map((user) => (
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
                            <td colSpan={5} className="text-center">Cargando usuarios...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;

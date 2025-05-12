import React, { Dispatch, SetStateAction } from "react";

export type Car = {
    id: number;
    marca: string;
    modelo: string;
    descripcion: string;
    patente: string;
    tipo_coche: string;
    tipo_cambio: string;
    num_puertas: number;
    num_plazas: number;
    num_maletas: number;
    posee_aire_acondicionado: boolean;
    imagen?: File | string;
    grupoId: number;
    grupo?: Group;
    SucursalId: number;
    sucursal?: Sucursal;
}

export type Group = {
    id: string | number;
    nombre: string;
    descripcion: string;
    precio: number;
}

export type User = {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    movil: string;
    password: string;
    rol: string;
}

export type Sucursal = {
    id: string | number;
    nombre: string;
}

export type Servicio = {
    id: number;
    nombre: string;
    precio: number;
    porcentajeDescuento: number | null;
}

export type Rental = {
    id: number;
    fechainicio: Date; // fechainicio esta en minuscula la i de inicio porque sino debo hacer una migracion en backend
    fechaFin: Date;
    lugarRecogida: string; 
    lugarDevolucion: string; 
    horarioRecogida: Date;
    horarioDevolucion: Date;

    usersId?: number;
    grupoId?: number;
}

export type Borrar = {
    texto: string;
    className: string;
    color?: string;
}

export type Login = {
    Email: string;
    Password: string;
}

export type Favorito = {
  usuarioId: number;
  cocheId: number;
}

/* PROPS */
export type CarDetailsProps = {
    coche: Car;
    selectedSucursalId: number;
    sucursalDevolucion: number;
    fechainicio: Date;
    fechaFin: Date;
    selectedHorarioRecogida: string;
    selectedHorarioDevolucion: string;
    extrasSeleccionados?: string[];
    serviciosDisponibles?: Servicio[];
}

export type ButtonProps = {
    type?: 'submit' | 'reset' | 'button';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    style: React.CSSProperties;
    texto: string; // para agregar el texto del botón.
    className?: string;
    to?: string; // para agregar Links
}

export type FleetFilterProps = {
    setSelectedPlazas: Dispatch<SetStateAction<number>>;
    setSelectedTipoCambio: Dispatch<SetStateAction<string>>;
    setSelectedTipoCoche: Dispatch<SetStateAction<string>>;
    setSelectedSucursalId: Dispatch<SetStateAction<number>>;
}

export type LikeProps = {
  cocheId: number;
}
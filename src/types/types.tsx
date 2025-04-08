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
    GrupoId: number;
    grupo?: Group;
    SucursalId: number;
    sucursal?: Sucursal;
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

export type Group = {
    id: string | number;
    nombre: string;
    descripcion: string;
}

export type Sucursal = {
    id: string | number;
    nombre: string;
}

export type Rental = {
    id: number | string;
    fecha_inicio: Date;
    fecha_fin: Date;
    
    user_id: number | string;
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

/* PROPS */
export type CarDetailsProps = {
    coche: Car;
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
}

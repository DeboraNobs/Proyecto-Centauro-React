import React from "react";

export type Car = {
    id: string;
    marca: string;
    modelo: string;
    descripcion: string;
    patente: string;
    tipo_coche: string;
    tipo_cambio: string;
    num_puertas: number;
    num_plazas: number;
    posee_aire_acondicionado: boolean;
}

export type CarDetailsProps = {
    coche : Car;
}

export type Borrar = {
    texto : string;
    className: string;
    color?: string;
}

export type ButtonProps = {
    style: React.CSSProperties;
    texto: string; // para agregar el texto del botón.
    className?: string;
}
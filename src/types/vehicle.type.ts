export interface VehicleSwapi {
    cargo_capacity:         string;
    consumables:            string;
    cost_in_credits:        string;
    created:                string;
    crew:                   string;
    edited:                 string;
    length:                 string;
    manufacturer:           string;
    max_atmosphering_speed: string;
    model:                  string;
    name:                   string;
    passengers:             string;
    pilots:                 any[];
    films:                  string[];
    url:                    string;
    vehicle_class:          string;
}

export interface VehicleSpanish {
    capacidad_carga:         number;
    consumibles:            string;
    costo_en_creditos:        number;
    flota:                   number;
    tamaño:                 number;
    fabricante:           string;
    velocidad_atmosferica_maxima: number;
    modelo:                  string;
    nombre:                   string;
    pasajeros:             number;
    pilotos:                 any[];
    peliculas:                  string[];
    url:                    string;
    clase_vehiculo:          string;
}

export interface VehicleSpanishDb {
    id: string;
    creadoEn: string;
    editadoEn: string | null;
    capacidad_carga:         number;
    consumibles:            string;
    costo_en_creditos:        number;
    flota:                   number;
    tamaño:                 number;
    fabricante:           string;
    velocidad_atmosferica_maxima: number;
    modelo:                  string;
    nombre:                   string;
    pasajeros:             number;
    pilotos:                 any[];
    peliculas:                  string[];
    url:                    string;
    clase_vehiculo:          string;
}

export type VehicleSpanishList = Array<VehicleSpanishDb>;

export interface CreateVehicleDto {
    capacidad_carga:         number;
    consumibles:            string;
    costo_en_creditos:        number;
    flota:                   number;
    tamaño:                 number;
    fabricante:           string;
    velocidad_atmosferica_maxima: number;
    modelo:                  string;
    nombre:                   string;
    pasajeros:             number;
    pilotos:                 any[];
    peliculas:                  string[];
    url:                    string;
    clase_vehiculo:          string;
}

export interface Vehicle {
    id?:                    string;
    cargo_capacity:         string;
    consumables:            string;
    cost_in_credits:        string;
    created:                Date;
    crew:                   string;
    edited:                 Date;
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
    id?:                    string;
    capacidad_carga:         string;
    consumibles:            string;
    costo_en_creditos:        string;
    creadoEn:                Date;
    flota:                   string;
    editadoEn:                 Date;
    tamaño:                 string;
    fabricante:           string;
    velocidad_atmosferica_maxima: string;
    modelo:                  string;
    nombre:                   string;
    pasajeros:             string;
    pilotos:                 any[];
    peliculas:                  string[];
    url:                    string;
    clase_vehiculo:          string;
}

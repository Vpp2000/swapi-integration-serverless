import z from "zod";

export const VehicleSchema = z.object({
  "capacidad_carga": z.string().nonempty(),
  "consumibles": z.string().nonempty(),
  "costo_en_creditos": z.string().nonempty(),
  "flota": z.string().nonempty(),
  "tamaño": z.string().nonempty(),
  "fabricante": z.string().nonempty(),
  "velocidad_atmosferica_maxima": z.string().nonempty(),
  "modelo": z.string().nonempty(),
  "nombre": z.string().nonempty(),
  "pasajeros": z.string().nonempty(),
  "pilotos": z.array(z.string().nonempty()),
  "peliculas": z.array(z.string().nonempty()),
  "url": z.string().nonempty(),
  "clase_vehiculo": z.string().nonempty(),
});

import z from "zod";

export const VehicleSchema = z.object({
  "capacidad_carga": z.number().gt(0),
  "consumibles": z.string().nonempty(),
  "costo_en_creditos": z.number().gt(0),
  "flota": z.number().gt(0),
  "tamaño": z.number().gt(0),
  "fabricante": z.string().nonempty(),
  "velocidad_atmosferica_maxima": z.number().gt(0),
  "modelo": z.string().nonempty(),
  "nombre": z.string().nonempty(),
  "pasajeros": z.number().gt(0),
  "pilotos": z.array(z.string().nonempty()),
  "peliculas": z.array(z.string().nonempty()),
  "url": z.string().nonempty(),
  "clase_vehiculo": z.string().nonempty(),
});

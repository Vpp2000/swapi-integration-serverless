import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import z from "zod"
import {CreateVehicleDto, VehicleSwapi, VehicleSpanish} from "./types/vehicle.type";
import {VehicleService} from "./services/vehicle.service";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "VehiclesTable";
const headers = {
  "content-type": "application/json",
};

const EntitySchema = z.object({
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18),
});

export const VehicleSchema = z.object({
  "capacidad_carga": z.string().nonempty(),
  "consumibles": z.string().nonempty(),
  "costo_en_creditos": z.string().nonempty(),
  "creadoEn": z.string().nonempty(),
  "flota": z.string().nonempty(),
  "editadoEn": z.string().nonempty(),
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


class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

export const listVehicles = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const vehicleService = new VehicleService();
  const data: VehicleSpanish[] = await vehicleService.getAll();

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };
};

export const createVehicle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string) as CreateVehicleDto;
    VehicleSchema.parse(reqBody);

    const vehicleService = new VehicleService();
    const vehicleInserted = await vehicleService.createVehicle(reqBody);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(vehicleInserted),
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(e),
    };
  }
};

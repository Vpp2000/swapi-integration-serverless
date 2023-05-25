import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateVehicleDto, VehicleSwapi, VehicleSpanish, VehicleSpanishDb } from "./types/vehicle.type";
import {VehicleService} from "./services/vehicle.service";
import { VehicleSchema } from "./helpers/validators-schemas";
import { ErrorsHandler } from "./errors/errors.handler";
import { HEADERS, VEHICLES_TABLE_NAME } from "./helpers/constants";
import { SwapiClient } from "./client/swapi.client";
import { DynamoClient } from "./client/dynamo.client";

const swapiClient = new SwapiClient<VehicleSwapi>("vehicles");
const dynamoClient = new DynamoClient<VehicleSpanishDb>(VEHICLES_TABLE_NAME, "nombre", "id");


export const listVehicles = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const vehicleService = new VehicleService(swapiClient, dynamoClient);
  const data: VehicleSpanish[] = await vehicleService.getAll();

  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify(data),
  };
};

export const createVehicle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string) as CreateVehicleDto;
    VehicleSchema.parse(reqBody);

    const vehicleService = new VehicleService(swapiClient, dynamoClient);
    const vehicleInserted = await vehicleService.createVehicle(reqBody);

    return {
      statusCode: 201,
      headers: HEADERS,
      body: JSON.stringify(vehicleInserted),
    };
  } catch (e: any) {
    return ErrorsHandler.handleError(e);
  }
};

export const getVehicleById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const vehicleService = new VehicleService(swapiClient, dynamoClient);
    const vehicleId = event.pathParameters?.id as string;
    const vehicle: VehicleSpanishDb = await vehicleService.getVehicleById(vehicleId);

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(vehicle),
    };
  } catch (e: any) {
    return ErrorsHandler.handleError(e);
  }
}

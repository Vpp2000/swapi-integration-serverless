import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {CreateVehicleDto, VehicleSwapi, VehicleSpanish} from "./types/vehicle.type";
import {VehicleService} from "./services/vehicle.service";
import { VehicleSchema } from "./helpers/validators-schemas";
import { ErrorsHandler } from "./errors/errors.handler";
import { HEADERS } from "./helpers/constants";

export const listVehicles = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const vehicleService = new VehicleService();
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

    const vehicleService = new VehicleService();
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

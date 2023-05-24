import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import z from "zod"
import {Vehicle} from "./types/vehicle.type";
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

class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

export const listEntities = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const vehicleService = new VehicleService();
  const data: Vehicle[] = await vehicleService.getAll();

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  };
};

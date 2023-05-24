import {Vehicle} from "../types/vehicle.type";
import {SwapiClient} from "../client/swapi.client";
import {DynamoRepository} from "../repositories/dynamo.repository";
import {VEHICLES_TABLE_NAME} from "../helpers/constants";

export class VehicleService {
    public async getAll(): Promise<Vehicle[]>{
        const swapiClient = new SwapiClient<Vehicle>("vehicles");
        const dynamoRepository = new DynamoRepository<Vehicle>(VEHICLES_TABLE_NAME);

        let swapiData: Vehicle[] = await swapiClient.getAll();
        let dynamoData: Vehicle[] = await dynamoRepository.listAll();

        return [
            ...swapiData,
            ...dynamoData
        ];
    }
}

import {CreateVehicleDto, VehicleSwapi, VehicleSpanish, VehicleSpanishDb} from "../types/vehicle.type";
import {SwapiClient} from "../client/swapi.client";
import {DynamoClient} from "../client/dynamo.client";
import {VEHICLES_TABLE_NAME} from "../helpers/constants";
import {v4} from "uuid";

export class VehicleService {
    public async getAll(): Promise<VehicleSpanishDb[]>{
        const swapiClient = new SwapiClient<VehicleSwapi>("vehicles");
        const dynamoRepository = new DynamoClient<VehicleSpanishDb>(VEHICLES_TABLE_NAME);

        const swapiData: VehicleSwapi[] = await swapiClient.getAll();
        const dynamoData: VehicleSpanishDb[] = await dynamoRepository.listAll();

        const swapiDataSpanish: VehicleSpanishDb[] = swapiData.map((vehicle) => <VehicleSpanishDb> {
            capacidad_carga: vehicle.cargo_capacity,
            consumibles: vehicle.consumables,
            costo_en_creditos: vehicle.cost_in_credits,
            creadoEn: vehicle.created,
            flota: vehicle.crew,
            editadoEn: vehicle.edited,
            tamaño: vehicle.length,
            fabricante: vehicle.manufacturer,
            velocidad_atmosferica_maxima: vehicle.max_atmosphering_speed,
            modelo: vehicle.model,
            nombre: vehicle.name,
            pasajeros: vehicle.passengers,
            pilotos: vehicle.pilots,
            peliculas: vehicle.films,
            url: vehicle.url,
            clase_vehiculo: vehicle.vehicle_class,
            id: ""
        })

        const spanishData = [
            ...swapiDataSpanish,
            ...dynamoData
        ]

        return spanishData;
    }


    public async createVehicle(vehicleToCreate: CreateVehicleDto): Promise<VehicleSpanishDb>{
        const dynamoRepository = new DynamoClient<VehicleSpanishDb>(VEHICLES_TABLE_NAME);
        const vehicle: VehicleSpanishDb = {
            ...vehicleToCreate,
            id: v4(),
        };
        await dynamoRepository.insert(vehicle);
        return vehicle;
    }
}

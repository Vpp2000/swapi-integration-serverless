import {Vehicle, VehicleSpanish} from "../types/vehicle.type";
import {SwapiClient} from "../client/swapi.client";
import {DynamoRepository} from "../repositories/dynamo.repository";
import {VEHICLES_TABLE_NAME} from "../helpers/constants";

export class VehicleService {
    public async getAll(): Promise<VehicleSpanish[]>{
        const swapiClient = new SwapiClient<Vehicle>("vehicles");
        const dynamoRepository = new DynamoRepository<Vehicle>(VEHICLES_TABLE_NAME);

        const swapiData: Vehicle[] = await swapiClient.getAll();
        const dynamoData: Vehicle[] = await dynamoRepository.listAll();
        const data: Vehicle[] = [
            ...swapiData,
            ...dynamoData
        ];

        const spanishData: VehicleSpanish[] = data.map((vehicle)=> <VehicleSpanish> {
            id: vehicle.id,
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
            clase_vehiculo: vehicle.vehicle_class
        })

        return spanishData;
    }
}

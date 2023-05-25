import {CreateVehicleDto, VehicleSwapi, VehicleSpanish, VehicleSpanishDb} from "../types/vehicle.type";
import {SwapiClient} from "../client/swapi.client";
import {DynamoClient} from "../client/dynamo.client";
import {VEHICLES_TABLE_NAME} from "../helpers/constants";
import {v4} from "uuid";
import { HttpError } from "../errors/http_error";

export class VehicleService {
    private swapiClient: SwapiClient<VehicleSwapi>;
    private dynamoClient: DynamoClient<VehicleSpanishDb>;

    constructor(swapiClient: SwapiClient<VehicleSwapi>, dynamoClient: DynamoClient<VehicleSpanishDb>) {
        this.swapiClient = swapiClient;
        this.dynamoClient = dynamoClient;
    }

    public async getAll(): Promise<VehicleSpanishDb[]>{
        const swapiData: VehicleSwapi[] = await this.swapiClient.getAll();
        const dynamoData: VehicleSpanishDb[] = await this.dynamoClient.listAll();

        const swapiDataSpanish: VehicleSpanishDb[] = swapiData.map((vehicle) => <VehicleSpanishDb> {
            capacidad_carga: Number(vehicle.cargo_capacity),
            consumibles: vehicle.consumables,
            costo_en_creditos: Number(vehicle.cost_in_credits),
            creadoEn: vehicle.created,
            flota: Number(vehicle.crew),
            editadoEn: vehicle.edited,
            tamaño: Number(vehicle.length),
            fabricante: vehicle.manufacturer,
            velocidad_atmosferica_maxima: Number(vehicle.max_atmosphering_speed),
            modelo: vehicle.model,
            nombre: vehicle.name,
            pasajeros: Number(vehicle.passengers),
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
        const elementExists = await this.checkIfVehicleExists(vehicleToCreate);
        if (elementExists) {
            throw new HttpError(404, "Vehicle already exists");
        }

        const vehicle: VehicleSpanishDb = {
            ...vehicleToCreate,
            id: v4(),
            creadoEn: Date.now().toString(),
            editadoEn: null
        };
        await this.dynamoClient.insert(vehicle);
        return vehicle;
    }

    public async getVehicleById(vehicleId: string): Promise<VehicleSpanishDb> {
        const vehicle = await this.dynamoClient.getElementByPrimaryKey(vehicleId);

        if(!vehicle){
            throw new HttpError(404, "Vehicle not found");
        }

        return vehicle;
    }

    private async checkIfVehicleExists(vehicleToCreate: CreateVehicleDto){
        let elementExists = false
        const itemsResponse: any[] = await this.dynamoClient.getElementByUniqueKey(vehicleToCreate.nombre);
        if(itemsResponse.length > 0) elementExists = true;
        return elementExists;
    }

}

import axios from "axios";
import {PagedResponse} from "../types/swapi.interface";

export class SwapiClient<E> {
    private baseUrl: string = "https://swapi.py4e.com/api"
    private readonly entity!: string

    constructor(entity: string) {
        this.entity = entity;
    }

    public async getAll(): Promise<E[]>{
        return await this.getDataFromPagedResponse();
    }

    private async getDataFromPagedResponse(): Promise<E[]>{
        let res = await axios.get(`${this.baseUrl}/${this.entity}`)
        let dataPaged = res.data as PagedResponse<E>;
        return dataPaged.results;
    }
}

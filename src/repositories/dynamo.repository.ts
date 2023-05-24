import AWS from "aws-sdk";
import {VEHICLES_TABLE_NAME} from "../helpers/constants";

export class DynamoRepository<E> {
    private tableName: string;
    private dynamoClient: any;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.dynamoClient = new AWS.DynamoDB.DocumentClient();
    }

    public async listAll(): Promise<E[]>{
        const output = await this.dynamoClient
            .scan({
                TableName: this.tableName,
            })
            .promise();
        const data = output.Items as E[];
        return data;
    }

    public async insert(item: E): Promise<E>{
        await this.dynamoClient
            .put({
                TableName: VEHICLES_TABLE_NAME,
                Item: item,
            })
            .promise();
        return item;
    }
}

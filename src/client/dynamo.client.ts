import AWS from "aws-sdk";
import {VEHICLES_TABLE_NAME} from "../helpers/constants";
import { HttpError } from "../errors/http_error";

export class DynamoClient<E> {
    private tableName: string;
    private uniqueKey: string;
    private dynamoClient: any;
    private primaryKey: string;

    constructor(tableName: string, uniqueKey: string, primaryKey: string) {
        this.tableName = tableName;
        this.uniqueKey = uniqueKey;
        this.primaryKey = primaryKey;
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
        const result = await this.dynamoClient
            .put({
                TableName: this.tableName,
                Item: item,
            })
            .promise();
        return item;
    }

    public async getElementByPrimaryKey(id: string): Promise<E> {
      const result = await this.dynamoClient
        .get({
          TableName: this.tableName,
          Key: { id },
        })
        .promise();

      const vehicle = result.Item;

      return vehicle;
    }

    public async getElementByUniqueKey(uniqueKeyValue: string): Promise<any>{
      const params = {
        TableName: this.tableName, // Replace with your actual table name
        ExpressionAttributeValues: {
          ":search": uniqueKeyValue
        },
        FilterExpression: `${this.uniqueKey} = :search`,
        ProjectionExpression: this.uniqueKey,

      };

        const result = await this.dynamoClient.scan(params).promise();

        console.log(params);
        console.log(`Result: ${JSON.stringify(result.Items)}`)

        if (!result.Items) {
            throw new HttpError(404, "Zero elements were scanned");
        }

        return result.Items;
    }
}

import { DynamoDB } from 'aws-sdk';
import dynamoDbConfig from '../utils/dynamoDbConfig';
import { EventData } from '../interfaces/eventLog';


const dynamoDb = new DynamoDB.DocumentClient(dynamoDbConfig);


class EventRepository {
    async createEvent(eventData: EventData): Promise<void> {
        console.log(":::eventData",eventData)
        const params = {
            TableName: 'EventLogs',
            Item: eventData
        };
        await dynamoDb.put(params).promise();
    }

    async getEventsByFilters(eventType: string, startDate: string, endDate: string): Promise<DynamoDB.DocumentClient.ScanOutput> {
        const params = {
            TableName: 'EventLogs',
            FilterExpression: 'eventType = :eventType AND eventDate BETWEEN :startDate AND :endDate',
            ExpressionAttributeValues: {
                ':eventType': eventType,
                ':startDate': startDate,
                ':endDate': endDate
            }
        };
        return await dynamoDb.scan(params).promise();
    }
}

export default new EventRepository();

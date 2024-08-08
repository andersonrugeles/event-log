import { Request, Response } from "express";
import eventService from "../services/eventService";
import AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from 'uuid';
import isValidDate from "../utils/utils";


const dynamoDb = new AWS.DynamoDB.DocumentClient();

class EventController {
  async registerEvent(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        console.error("No body provided in request");
        res.status(400).send({ message: "Bad Request: Body is required" });
        return;
      }
      const { description, eventType } = req.body;

      if (!description?.trim() || !eventType?.trim()) {
        console.error("No body provided in request");
        res.status(400).send({ message: "Bad Request: description and eventType is required" });
        return;
      }

      const newEvent = {
          eventId: uuidv4(),
          description,
          eventType,
          eventDate: new Date().toISOString(),
      };

      await eventService.registerEvent(newEvent);
      res.status(201).send({ message: "Event registered successfully" });
    } catch (error) {
      console.error("Error registering event:", error);
      res.status(500).send({ error: "Failed to register event" });
    }
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      let dateFilter = ["eventDate >= :startDate","eventDate <= :endDate"]
      const params: DocumentClient.ScanInput = {
        TableName: process.env.EVENT_LOGS_TABLE || "EventLogs",
      };

      console.log('request sending::',req)

      if (req.query) {
        const { eventType, startDate, endDate } = req.query;

        const filterExpressions: string[] = [];
        const expressionAttributeValues: DocumentClient.ExpressionAttributeValueMap =
          {};

        console.log("req.query", req.query);
        if (eventType) {
          filterExpressions.push("eventType = :eventType");
          expressionAttributeValues[":eventType"] = eventType;
        }

        if (startDate && endDate) {
          if(!isValidDate(startDate.toString()) || !isValidDate(endDate.toString())){
            res.status(400).send({ message: "Bad Request: date format invalid" });
            return;
          }
          dateFilter.forEach((filter)=>{
            filterExpressions.push(filter);
          })
          expressionAttributeValues[":startDate"] = startDate;
          expressionAttributeValues[":endDate"] = endDate;
        }

        if(filterExpressions.length > 0){
          params.FilterExpression = filterExpressions.join(" AND ");
          params.ExpressionAttributeValues = expressionAttributeValues;
        }
        console.log('Params::',params)
      }

      const data = await dynamoDb.scan(params).promise();
      res.status(200).send(data.Items);
    } catch (error) {
      console.error("Error querying events:", error);
      res.status(500).send({ error: "Failed to query events" });
    }
  }
}

export default new EventController();

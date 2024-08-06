import eventRepository from "../repositories/eventRepository";


interface EventData {
    eventId: string;
    eventDate: string;
    eventType: string;
    description: string;
}

class EventService {
    async registerEvent(eventData: EventData): Promise<void> {
        await eventRepository.createEvent(eventData);
    }

    async getEvents(eventType: string, startDate: string, endDate: string): Promise<any> {
        return await eventRepository.getEventsByFilters(eventType, startDate, endDate);
    }
}

export default new EventService();

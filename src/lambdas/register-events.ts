import eventController from '../controllers/eventController';

exports.handler = async (event: any): Promise<any> => {
    const req = {
        body: JSON.parse(event.body || '{}'),
        headers: event.headers,
        method: event.httpMethod,
        path: event.path,
        queryStringParameters: event.queryStringParameters
    };
    
    const res = {
        statusCode: 200,
        headers: {},
        body: "",
        status: (statusCode: number) => {
            res.statusCode = statusCode;
            return res;
        },
        send: (body: any) => {
            console.log(':::body',body)
            res.body = JSON.stringify(body);
            return res;
        }
    };

    
    try {
        await eventController.registerEvent(req as any, res as any);
        console.log('Response object before sending',res)
        return res;
    } catch (error) {
        console.error('Error in handler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }


};

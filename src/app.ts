import express from 'express';
import bodyParser from 'body-parser';
import eventController from './controllers/eventController';

const app = express();
app.use(bodyParser.json());

app.post('/events/register', (req, res) => eventController.registerEvent(req, res));
app.get('/events', (req, res) => eventController.getEvents(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

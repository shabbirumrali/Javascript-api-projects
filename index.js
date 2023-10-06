const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();

app.listen(3000, () => console.log('port running at 3000'));
app.use(express.static('public'));

app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err) {
            response.end();
            return;
        }
        response.json(data);
    })
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const data = request.params.latlon.split(',');
    const lat = data[0];
    const lon = data[1];
    console.log(lat, lon);
    const weather_response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=22.7195687&lon=75.8577258&appid=f46dd63eb43eb352210709170cc08a57`);
    const weather_json = await weather_response.json();
    response.json(weather_json);
})
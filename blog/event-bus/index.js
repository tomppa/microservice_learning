const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

function postEvent(port, event) {
  axios.post(`http://localhost:${port}/events`, event).catch((err) => {
    console.log(err.message);
  });
}

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  postEvent(4000, event);
  postEvent(4001, event);
  postEvent(4002, event);
  postEvent(4003, event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005.');
});

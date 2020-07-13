const http = require('http');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const cors = require('cors');
const hostname = '127.0.0.1';
const port = 3000;

app.use(cors());
require('./database/db');

app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.get('/', (request, response) => {
    response.json({ info: 'Default' })
});


const userRoutes = require('./routes/user');
userRoutes(app);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

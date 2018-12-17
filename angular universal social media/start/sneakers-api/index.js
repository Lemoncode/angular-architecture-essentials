const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    routesConfig = require('./route.config');
    app = express();

const initApp= (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
};

initApp(app);
routesConfig.initRoutes(app);


const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);

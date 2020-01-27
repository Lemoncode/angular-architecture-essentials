// import * as express from 'express';
const express = require('express');
// import { join } from 'path';
const { join } = require('path');

// import { ngExpressEngine } from '@nguniversal/express-engine';
const { ngExpressEngine } = require('@nguniversal/express-engine');
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const PORT = process.env.PORT || 8080;
const staticRoot = join(process.cwd(), 'dist', 'sneakers');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/sneakers-server/main');

const app = express();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', staticRoot);

app.get('*.*', express.static(staticRoot));
app.get('*', (req, res) => res.render('index', { req }));

app.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}`));

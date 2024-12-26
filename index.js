const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRoutes = require('./route');
const knex = require('./db');

const app = express();
const port = 3000;
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

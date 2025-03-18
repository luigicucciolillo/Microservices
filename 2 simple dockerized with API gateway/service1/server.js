const express = require('express');
const bodyParser = require('body-parser');
const service1Routes = require('./routes/service1Routes');

const app = express();
app.use(bodyParser.json());

app.use('/service1', service1Routes);

app.listen(3001, () => {
  console.log('Service1 listening on port 3001');
});
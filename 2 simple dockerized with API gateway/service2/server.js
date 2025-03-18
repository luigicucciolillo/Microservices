const express = require('express');
const bodyParser = require('body-parser');
const service2Routes = require('./routes/service2Routes');

const app = express();
app.use(bodyParser.json());

app.use('/service2', service2Routes);

app.listen(3002, () => {
  console.log('Service2 listening on port 3002');
});
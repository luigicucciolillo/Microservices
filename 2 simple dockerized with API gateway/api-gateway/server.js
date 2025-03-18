const express = require('express');
const bodyParser = require('body-parser');
const apiGatewayRoutes = require('./routes/apiGatewayRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api', apiGatewayRoutes);

app.listen(3000, () => {
  console.log('API Gateway listening on port 3000');
});
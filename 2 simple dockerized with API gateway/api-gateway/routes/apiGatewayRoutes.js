const express = require('express');
const router = express.Router();
const http = require('http');

router.post('/service1/show', (req, res) => {
  const options = {
    hostname: 'service1',
    port: 3001,
    path: '/service1/show',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const reqService1 = http.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      res.send(data);
    });
  });

  reqService1.write(JSON.stringify(req.body));
  reqService1.end();
});

router.post('/service2/show', (req, res) => {
  const options = {
    hostname: 'service2',
    port: 3002,
    path: '/service2/show',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const reqService2 = http.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      res.send(data);
    });
  });

  reqService2.write(JSON.stringify(req.body));
  reqService2.end();
});

module.exports = router;
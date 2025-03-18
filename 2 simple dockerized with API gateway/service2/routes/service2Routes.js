const express = require('express');
const router = express.Router();
const service2Controller = require('../controller/service2Controller');

router.post('/show', service2Controller.showMessage);

module.exports = router;
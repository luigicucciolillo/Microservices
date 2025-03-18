const express = require('express');
const router = express.Router();
const service1Controller = require('../controller/service1Controller');

router.post('/show', service1Controller.showMessage);

module.exports = router;
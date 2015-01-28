'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/read', controller.read);

router.post('/', controller.upload);
router.post('/write', controller.write);

module.exports = router;

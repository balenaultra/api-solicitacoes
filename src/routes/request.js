'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/request');
const authService = require('../services/auth');

router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.get('/', authService.authorize, controller.get);

module.exports = router;
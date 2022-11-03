const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.route('/')
    .get(controller.getAllFlights)
    .post(controller.addNewFlight)
    .put(controller.updateFlight)
    .delete(controller.deleteFlight)

router.route('/:id')
    .get(controller.getFlight)

module.exports = router;


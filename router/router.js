const router = require('express').Router()
const controller = require('../controller/controller')

router
    .get('/itineraries/all', controller.getAllItineraries)
    .get('/itineraries', controller.getItineraryList)
    .get('/itinerary/:ID', controller.getItineraryByID)

module.exports = router
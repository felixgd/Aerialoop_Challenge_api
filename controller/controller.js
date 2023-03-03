const service = require('../service/service')

module.exports = {
    getItineraryList,
    getItineraryByID,
    getAllItineraries
}

async function getAllItineraries(req, res) {
    let data = await service.GetItineraries()
    res.status(200).json(data)
    return
}

async function getItineraryByID(req, res) {
    let ID = req.params.ID

    let data = await service.GetItineraries(ID)
    res.status(200).json(data)
    return
}

async function getItineraryList(req, res) {
    let data = await service.GetItinerariesList()
    res.status(200).json(data)
    return
}
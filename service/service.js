const csv = require('csvtojson')
const Itinerary = require('../domain/itinerary/itinerary')
const filesPath = './Data/'
const itineraryFileName = 'itineraries.csv'

module.exports = {
    GetItineraries,
    GetItinerariesList
}

async function GetItineraries(ID) {
    const data = await csv()
    .fromFile(filesPath + itineraryFileName)
    .then(async (itineraries) => {
        for (let i = 0; i < itineraries.length; i++) {
            if (ID) {
                if (ID == itineraries[i]['itinerary ID']) {
                    itineraries[i]['flight data'] = await getFlightData(itineraries[i], ID)
                    return itineraries[i]
                }
            }
            itineraries[i]['flight data'] = await getFlightData(itineraries[i], ID)
        }
        
        return itineraries
    })
    .then(async (mappedData) => {
        if (!mappedData.length) {
            for (let i = 0; i < mappedData['flight data'].length; i++) {
                mappedData['flight data'][i]['PowerConsumption'] =  await calculatePowerConsumption(mappedData['flight data'][i]['BATT_VFilt'], mappedData['flight data'][i]['BATT_CFilt'])
            }

            return mappedData
        }
        for (let i = 0; i < mappedData.length; i++) {
            for (let j = 0; j < mappedData[i]['flight data'].length; j++) {
                mappedData[i]['flight data'][j]['PowerConsumption'] =  await calculatePowerConsumption(mappedData[i]['flight data'][j]['BATT_VFilt'], mappedData[i]['flight data'][j]['BATT_CFilt'])
            }
        }
        return mappedData
    })
    .then(async (mappedData) => {
        let mappedStruct = new Array()
        if (!mappedData.length) {
            return await mapStructure(mappedData)
        }
        for (let i = 0; i < mappedData.length; i++) {
            mappedStruct.push(await mapStructure(mappedData[i]))
        }
        return mappedStruct
    })
    
    return data
}

async function GetItinerariesList() {
    const data = await csv()
    .fromFile(filesPath + itineraryFileName)
    .then(async (itineraries) => {
        let mappedStruct = new Array()
        for (let i = 0; i < itineraries.length; i++) {
            mappedStruct.push(await mapStructure(itineraries[i]))
        }
        return mappedStruct
    })

    return data
}

async function calculatePowerConsumption(voltage, current) {
    return voltage * current
}

async function mapStructure(itinerary) {
    return new Itinerary(itinerary['itinerary ID'], itinerary['day starting time in milliseconds since midnight'], itinerary['from location'], itinerary['to location'], itinerary['flight data'])
}

async function getFlightData(itineraries) {
    return await csv()
    .fromFile(filesPath + itineraries['flight data file'])
}
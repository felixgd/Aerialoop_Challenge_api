module.exports = (
    Itinerary
)

function Itinerary(ID, startTime, fromLocation, toLocation, flightData) {
    this.ID = ID
    this.StartTime = startTime
    this.FromLocation = fromLocation
    this.ToLocation = toLocation
    if (flightData) {
        this.FlightData = flightData
    }
}
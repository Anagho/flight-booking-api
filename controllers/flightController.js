// exports.example = (req, res) => {
//     console.log("example")
//     res.send("Flight example")
// }

const flightsDB = {
    flights: require('../models/flights.json'),
    setFlights: function (data) { this.flights = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

// Get all flights
const getAllFlights = (req, res) => {
    res.json(flightsDB.flights)
}

// Add/Book flight
const addNewFlight = async (req, res) => {
    try {
        const newFlight = {
            id: flightsDB.flights[flightsDB.flights.length - 1].id + 1 || 1,
            title: req.body.title,
            time: req.body.time,
            price: req.body.price,
            date: req.body.date
        }
        
        if (!newFlight.title || !newFlight.time || !newFlight.price || !newFlight.date) {
            return res.status(400).json({ 'message': 'All Flight details are required!'});
        }
        
        flightsDB.setFlights([...flightsDB.flights, newFlight]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'flights.json'),
            JSON.stringify(flightsDB.flights)
        );
        res.status(201).json(flightsDB.flights);
    } catch (err) {
        res.status(500).json({ 'message': err.message})
    }
}


// Update flight
const updateFlight = async (req, res) => {
    try {
        const flight = flightsDB.flights.find(trip => trip.id === parseInt(req.body.id));
        if (!flight) {
            return res.status(400).json({ "message": `Flight ID ${req.body.id} not found` });
        }
        if (req.body.title) flight.title = req.body.title;
        if (req.body.time) flight.time = req.body.time;
        if (req.body.price) flight.price = req.body.price;
        if (req.body.date) flight.date = req.body.date;

        const filteredArray = flightsDB.flights.filter(trip => trip.id !== parseInt(req.body.id));
        const unsortedArray = [...filteredArray, flight];
        flightsDB.setFlights(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'flights.json'),
            JSON.stringify(flightsDB.flights)
        )
        res.json({ 'message': `${flight.title} was updated successfully`});
        res.json(flightsDB.flights);
    } catch (err) {
        res.status(500).json({ 'message': err.message})
    }
    
}

// Delete flight
const deleteFlight = async (req, res) => {
    try {
        const flight = flightsDB.flights.find(trip => trip.id === parseInt(req.body.id));
        if (!flight) {
            return res.status(400).json({ "message": `Flight ID ${req.body.id} not found` });
        }

        const filteredArray = flightsDB.flights.filter(trip => trip.id !== parseInt(req.body.id));
        flightsDB.setFlights([...filteredArray]);
        
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'flights.json'),
            JSON.stringify(flightsDB.flights)
        )
        res.json({ 'message': `${flight.title} was deleted successfully`}, );
        res.json(flightsDB.flights)
    } catch (err) {
        res.status(500).json({ 'message': err.message})
    }
}

// Get single flight
const getFlight = (req, res) => {
    const flight = flightsDB.flights.find(trip => trip.id === parseInt(req.params.id));
    if (!flight) {
        return res.status(400).json({ "message": `Flight ID ${req.params.id} not found` });
    }
    res.json(flight);
}

module.exports = {
    getAllFlights,
    addNewFlight,
    updateFlight,
    deleteFlight,
    getFlight
}
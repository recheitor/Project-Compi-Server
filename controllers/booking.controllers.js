const Booking = require("../models/Booking.model")
const { getBookingData, getNewBookingData } = require("../utils/booking.utils")

const createBooking = (req, res, next) => {

    const bookingData = getBookingData(req.body)

    Booking
        .create(bookingData)
        .then((booking) => res.json(booking))
        .catch(err => next(err))
}

const getAllBookings = (req, res, next) => {

    Booking
        .find()
        .then((bookings) => res.json(bookings))
        .catch(err => next(err))
}

const getAllRoomBookings = (req, res, next) => {

    const { room_id } = req.params

    Booking
        .find()
        .then((bookings) => res.json(bookings))
        .catch(err => next(err))
}

const getOneBooking = (req, res, next) => {

    const { booking_id } = req.params

    Booking
        .findById(booking_id)
        .then((booking) => res.json(booking))
        .catch(err => next(err))
}

const editBooking = (req, res, next) => {

    const { booking_id } = req.params
    const newBookingData = getNewBookingData(req.body)

    Booking
        .findByIdAndUpdate(booking_id, newBookingData)
        .then(() => res.status(200).json({ message: "Booking edited" }))
        .catch(err => next(err))
}

const deleteBooking = (req, res, next) => {

    const { booking_id } = req.params

    Booking
        .findByIdAndDelete(booking_id)
        .then(() => res.status(200).json({ message: "Booking deleted" }))
        .catch(err => next(err))
}


module.exports = {
    createBooking,
    getAllBookings,
    getAllRoomBookings,
    getOneBooking,
    editBooking,
    deleteBooking
}
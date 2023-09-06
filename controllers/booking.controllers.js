const Booking = require("../models/Booking.model")
const Room = require("../models/Room.model")

const { getBookingData, getNewBookingData } = require("../utils/booking.utils")

const createBooking = (req, res, next) => {

    const bookingData = getBookingData(req.body, req.payload)
    const { room } = req.body

    Booking
        .create(bookingData)
        .then(({ _id: bookingId }) => {
            return Room.findByIdAndUpdate(room, { $push: { bookings: bookingId } })
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

const getAllBookings = (req, res, next) => {

    Booking
        .find()
        .then((bookings) => res.json(bookings))
        .catch(err => next(err))
}

const getAllMyBookings = (req, res, next) => {
    const { user_id: user } = req.params
    Booking
        .find({ user })
        .populate('room')
        .then((bookings) => res.json(bookings))
        .catch(err => next(err))
}

const getAllRoomBookings = (req, res, next) => {

    const { room_id: room } = req.params

    Booking
        .find({ room })
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
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

const deleteBooking = (req, res, next) => {

    const { booking_id } = req.params

    Booking
        .findByIdAndDelete(booking_id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}


module.exports = {
    createBooking,
    getAllBookings,
    getAllMyBookings,
    getAllRoomBookings,
    getOneBooking,
    editBooking,
    deleteBooking
}
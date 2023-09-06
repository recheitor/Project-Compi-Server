const router = require("express").Router();

const {
    createBooking,
    getAllBookings,
    getAllRoomBookings,
    getAllMyBookings,
    getOneBooking,
    editBooking,
    deleteBooking
} = require("../controllers/booking.controllers");
const { verifyToken } = require('../middleware/verifyToken');


router.post('/create-booking', verifyToken, createBooking)

router.get("/get-all-bookings", getAllBookings)

router.get("/get-all-room-bookings/:room_id", getAllRoomBookings)

router.get("/get-all-my-bookings/:user_id", getAllMyBookings)

router.get("/:booking_id", getOneBooking)

router.post("/:booking_id/edit", editBooking)

router.post("/:booking_id/delete", deleteBooking)

module.exports = router;
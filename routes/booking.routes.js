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
router.get("/get-all-bookings", verifyToken, getAllBookings)
router.get("/get-all-room-bookings/:room_id", verifyToken, getAllRoomBookings)
router.get("/get-all-my-bookings/:user_id", verifyToken, getAllMyBookings)
router.get("/:booking_id", verifyToken, getOneBooking)
router.post("/:booking_id/edit", verifyToken, editBooking)
router.post("/:booking_id/delete", verifyToken, deleteBooking)

module.exports = router;
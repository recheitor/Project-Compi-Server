const router = require("express").Router();
const {
    createBooking,
    getAllBookings,
    getOneBooking,
    editBooking,
    deleteBooking
} = require("../controllers/booking.controllers");


router.post('/create-booking', createBooking)

router.get("/get-all-bookings", getAllBookings)

router.get("/:booking_id", getOneBooking)

router.post("/:booking_id/edit", editBooking)

router.post("/:booking_id/delete", deleteBooking)

module.exports = router;
const router = require("express").Router()
const { createRoom, getAllRooms, getOneRoom, editRoom, deleteRoom } = require("../controllers/room.controllers")


router.post('/create-room', createRoom)

router.get("/get-all-rooms", getAllRooms)

router.get("/:room_id", getOneRoom)

router.post("/:room_id/edit", editRoom)

router.post("/:room_id/delete", deleteRoom)

module.exports = router
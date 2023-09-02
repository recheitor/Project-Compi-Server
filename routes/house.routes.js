const router = require("express").Router()
const { createHouse, getAllHouses, getHousesbyType, getHousesbyOwnerId, getOneHouse, getOneHouseRoom, editHouse, deleteHouse } = require("../controllers/house.controllers")
const { verifyToken } = require("../middleware/verifyToken")

// falta testear accomodationServices + adress googlemaps + owner
router.post('/create-house', verifyToken, createHouse)

router.get("/get-all-houses", verifyToken, getAllHouses)

router.get("/get-houses/:rent_type", verifyToken, getHousesbyType)

router.get("/get-my-houses/:user_id", verifyToken, getHousesbyOwnerId)

router.get("/get-house/:house_id", verifyToken, getOneHouse)

router.get("/get-rooms-house/:house_id", verifyToken, getOneHouseRoom)

router.post("/:house_id/edit", verifyToken, editHouse)

router.post("/:house_id/delete", verifyToken, deleteHouse)

module.exports = router
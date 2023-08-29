const router = require("express").Router()
const { createHouse, getAllHouses, getHousesbyType, getHousesbyOwnerId, getOneHouse, editHouse, deleteHouse } = require("../controllers/house.controllers")
const { verifyToken } = require("../middleware/verifyToken")

// falta testear accomodationServices + adress googlemaps + owner
router.post('/create-house', verifyToken, createHouse)

router.get("/get-all-houses", getAllHouses)

router.get("/get-houses/:rent_type", getHousesbyType)

router.get("/get-my-houses/:user_id", getHousesbyOwnerId)

router.get("/:house_id", getOneHouse)

router.post("/:house_id/edit", editHouse)

router.post("/:house_id/delete", deleteHouse)

module.exports = router
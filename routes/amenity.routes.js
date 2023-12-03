const router = require("express").Router();
const {
    createAmenity,
    getAllAmenities,
    getOneAmenity,
    editAmenity,
    deleteAmenity
} = require("../controllers/amenity.controllers");

router.post("/create-amenity", createAmenity)
router.get("/get-all-amenities", getAllAmenities)
router.get("/:amenity_id", getOneAmenity)
router.post("/:amenity_id/edit", editAmenity)
router.post("/:amenity_id/delete", deleteAmenity)

module.exports = router;

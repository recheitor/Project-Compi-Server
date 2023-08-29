const router = require("express").Router();
const { createRating, deleteRating } = require("../controllers/rating.controllers");


router.post('/rate', createRating)

router.post("/:rating_id/delete", deleteRating)

module.exports = router;
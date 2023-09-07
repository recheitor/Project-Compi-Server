const router = require("express").Router();
const { createRating, deleteRating } = require("../controllers/rating.controllers");
const { verifyToken } = require("../middleware/verifyToken");


router.post('/rate', verifyToken, createRating)

router.post("/:rating_id/delete", verifyToken, deleteRating)

module.exports = router;
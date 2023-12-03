const router = require("express").Router()
const uploaderMiddleware = require('../middleware/uploader.middleware')
const { uploadImage, uploadImages } = require("../controllers/upload.controllers")

router.post('/image', uploaderMiddleware.single('imageData'), uploadImage)
router.post('/images', uploaderMiddleware.array('imagesData', 12), uploadImages)

module.exports = router

const router = require("express").Router()
const uploaderMiddleware = require('../middleware/uploader.middleware')

router.post('/image', uploaderMiddleware.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error loading file' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})

router.post('/images', uploaderMiddleware.array('imagesData', 12), (req, res) => {

    if (!req.files) {
        res.status(500).json({ errorMessage: 'Error loading file' })
        return
    }
    const urls = req.files.map(file => file.path)
    res.json({ cloudinary_urls: urls })
})

module.exports = router

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
    console.log(req.files)
    // let imageUrlList = []

    // for (let i = 0; i < req.files.length; i++) {
    //     const localFilePath = req.files[i].path
    //     const result = 

    //     imageUrlList.push(result.url)
    // }


    // res.json({ cloudinary_url: req.files.path })
})

module.exports = router

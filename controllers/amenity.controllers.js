const Amenity = require("../models/Amenity.model")
const { getAmenityData, getNewAmenityData } = require("../utils/amenity.utils")

const createAmenity = (req, res, next) => {

    const amenityData = getAmenityData(req.body)

    Amenity
        .create(amenityData)
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

const getAllAmenities = (req, res, next) => {

    Amenity
        .find()
        .then((amenities) => res.json(amenities))
        .catch(err => next(err))
}

const getOneAmenity = (req, res, next) => {

    const { amenity_id } = req.params

    Amenity
        .findById(amenity_id)
        .then((amenity) => res.json(amenity))
        .catch(err => next(err))
}

const editAmenity = (req, res, next) => {

    const { amenity_id } = req.params
    const newAmenityData = getNewAmenityData(req.body)

    Amenity
        .findByIdAndUpdate(amenity_id, newAmenityData)
        .then(() => res.status(200).json({ message: "Amenity edited" }))
        .catch(err => next(err))
}

const deleteAmenity = (req, res, next) => {

    const { amenity_id } = req.params

    Amenity
        .findByIdAndDelete(amenity_id)
        .then(() => res.status(200).json({ message: "Amenity deleted" }))
        .catch(err => next(err))
}

module.exports = {
    createAmenity,
    getAllAmenities,
    getOneAmenity,
    editAmenity,
    deleteAmenity
}
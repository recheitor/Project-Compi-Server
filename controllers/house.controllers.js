const House = require("../models/House.model")
const User = require("../models/User.model")

const { getHouseData, getNewHouseData } = require("../utils/house.utils")

const createHouse = (req, res, next) => {

    const houseData = getHouseData(req.body, req.payload)

    House
        .create(houseData)
        .then((house) => res.status(201).json(house))
        .catch(err => next(err))
}

const getAllHouses = (req, res, next) => {

    House
        .find()
        .then((houses) => res.json(houses))
        .catch(err => next(err))
}

const getHousesbyType = (req, res, next) => {

    const { rent_type } = req.params
    const queryType = rent_type === 'entire' ? [] : { $not: { $eq: [] } }
    let query = { rooms: queryType }
    let sortBy = ''


    let { beds } = req.query
    if (beds) {
        const bedsObj = { "info.beds": { $gte: beds } }
        query = { ...query, ...bedsObj }
    }

    let { bathrooms } = req.query
    if (bathrooms) {
        const bathroomObj = { "info.bathrooms": { $gte: bathrooms } }
        query = { ...query, ...bathroomObj }
    }

    let { maxGuests } = req.query
    if (maxGuests) {
        const maxGuestsObj = { "info.maxGuests": { $gte: maxGuests } }
        query = { ...query, ...maxGuestsObj }
    }

    let { rooms } = req.query
    if (rooms) {
        const roomsObj = { "info.rooms": { $gte: rooms } }
        query = { ...query, ...roomsObj }
    }

    let { price } = req.query
    if (price) {
        const priceObj = { "price.housePrice": { $lte: price } }
        query = { ...query, ...priceObj }
    }


    House
        .find(query)
        .populate(['rooms',
            'rating',
            {
                path: 'owner', populate: {
                    path: 'rating'
                }
            },
            'amenities.amenity'
        ])
        .then((houses) => res.json(houses))
        .catch(err => next(err))
}

const getHousesbyOwnerId = (req, res, next) => {

    const { user_id: owner } = req.params

    House
        .find({ owner })
        .populate('rooms')
        .then((houses) => res.json(houses))
        .catch(err => next(err))
}

const getOneHouse = (req, res, next) => {

    const { house_id } = req.params

    House
        .findById(house_id)
        .populate([
            'rating',
            {
                path: 'owner', populate: {
                    path: 'rating'
                }
            },
            'amenities.amenity'
        ])
        .then((house) => res.json(house))
        .catch(err => next(err))
}

const getOneHouseRoom = (req, res, next) => {

    const { house_id } = req.params

    House
        .findById(house_id)
        .populate(['rooms',
            'rating',
            {
                path: 'owner', populate: {
                    path: 'rating'
                }
            },
            'amenities.amenity'
        ])
        .then((house) => res.json(house))
        .catch(err => next(err))
}

const editHouse = (req, res, next) => {

    const { house_id } = req.params

    const newHouseData = getNewHouseData(req.body)

    House
        .findByIdAndUpdate(house_id, newHouseData)
        .then(() => res.status(200).json({ message: "House edited" }))
        .catch(err => next(err))
}

const addFavoriteHouse = (req, res, next) => {

    const { house_id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $push: { favorites: house_id } })
        .then(() => res.status(200).json({ message: "User favorites updated" }))
        .catch(err => next(err))
}

const deleteFavoriteHouse = (req, res, next) => {

    const { house_id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $pull: { favorites: house_id } })
        .then(() => res.status(200).json({ message: "User favorites updated" }))
        .catch(err => next(err))
}

const deleteHouse = (req, res, next) => {

    const { house_id } = req.params

    House
        .findByIdAndDelete(house_id)
        .then(() => res.status(200).json({ message: "House deleted" }))
        .catch(err => next(err))
}

module.exports = {
    createHouse,
    getAllHouses,
    getHousesbyType,
    getHousesbyOwnerId,
    getOneHouse,
    getOneHouseRoom,
    editHouse,
    addFavoriteHouse,
    deleteFavoriteHouse,
    deleteHouse
}
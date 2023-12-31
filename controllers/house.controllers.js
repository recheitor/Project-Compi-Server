const House = require("../models/House.model")
const User = require("../models/User.model")
const { getHouseData, getNewHouseData } = require("../utils/house.utils")
const { getQueryData } = require("../utils/query.utils")

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
        .populate(['rooms',
            'rating',
            {
                path: 'owner',
                populate: {
                    path: 'rating'
                }
            },
            'amenities.amenity'
        ])
        .then((houses) => res.json(houses))
        .catch(err => next(err))
}

const getHousesbyType = (req, res, next) => {

    const { rent_type } = req.params
    const queryType = rent_type === 'entire' ? [] : { $not: { $eq: [] } }

    let query = { rooms: queryType }



    House
        .find(getQueryData(req.query, query, req.payload))
        .populate(['rooms',
            'rating',
            {
                path: 'owner',
                populate: {
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
                path: 'owner',
                populate: {
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
        .populate([
            {
                path: 'rating',
                populate: {
                    path: 'userId'
                }
            },
            {
                path: 'rooms',
                populate: {
                    path: 'bookings',
                    populate: {
                        path: 'user',
                        populate: {
                            path: 'rating'
                        }
                    }
                }
            },
            {
                path: 'owner',
                populate: {
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
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const addFavoriteHouse = (req, res, next) => {

    const { house_id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $push: { favorites: house_id } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteFavoriteHouse = (req, res, next) => {

    const { house_id } = req.params
    const { _id } = req.payload

    User
        .findByIdAndUpdate(_id, { $pull: { favorites: house_id } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteHouse = (req, res, next) => {

    const { house_id } = req.params

    House
        .findByIdAndDelete(house_id)
        .then(() => res.sendStatus(204))
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
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

    // TODO: MOVER A UTILS
    let query = { rooms: queryType }
    let sortBy = ''


    let { beds, bathrooms, maxGuests, rooms, price } = req.query

    beds && (query = { ...query, ...{ "info.beds": { $gte: beds } } })
    bathrooms && (query = { ...query, ...{ "info.bathrooms": { $gte: bathrooms } } })
    maxGuests && (query = { ...query, ...{ "info.maxGuests": { $gte: maxGuests } } })
    rooms && (query = { ...query, ...{ "info.rooms": { $gte: rooms } } })
    price && (query = { ...query, ...{ "price.housePrice": { $lte: price } } })

    House
        .find(query)
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
            'rating',
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
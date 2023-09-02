const House = require("../models/House.model")
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

    let { price } = req.query
    if (price) {
        query = { ...query, ...{ "price.housePrice": price } }
    }

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

    let { sort } = req.query
    if (sort === 'beds') {
        sortBy = { "info.beds": 1 }
    }
    console.log(query)


    // let { title } = req.query;
    // if (title) {
    //     query.title = title
    // }

    // let { description } = req.query;
    // if (description) {
    //     query.description = description
    // }

    House
        .find(query)
        .sort(sortBy)
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
    deleteHouse
}
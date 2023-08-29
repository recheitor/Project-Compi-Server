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

    House
        .find({ rooms: queryType })
        .populate('rooms')
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
    editHouse,
    deleteHouse
}
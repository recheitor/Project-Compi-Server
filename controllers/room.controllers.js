const House = require("../models/House.model")
const Room = require("../models/Room.model")
const { getRoomData, getNewRoomData } = require("../utils/room.utils")

const createRoom = (req, res, next) => {


    const roomsData = getRoomData(req.body)
    const { house_id } = req.body

    Room
        .create(roomsData)
        .then(({ _id }) => House.findByIdAndUpdate(house_id, { $push: { rooms: _id } }))
        .then((house) => res.status(201).json(house))
        .catch(err => next(err))
}

const getAllRooms = (req, res, next) => {

    Room
        .find()
        .then((rooms) => res.json(rooms))
        .catch(err => next(err))
}

const getOneRoom = (req, res, next) => {

    const { room_id } = req.params

    Room
        .findById(room_id)
        .then((room) => res.json(room))
        .catch(err => next(err))
}

const editRoom = (req, res, next) => {

    const { room_id } = req.params

    const newRoomsData = getNewRoomData(req.body)

    Room
        .findByIdAndUpdate(room_id, newRoomsData)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteRoom = (req, res, next) => {

    const { room_id } = req.params
    const { house_id } = req.body

    //TODO PROMISE ALL
    House
        .findByIdAndUpdate(house_id, { $pull: { rooms: room_id } })
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
    Room
        .findByIdAndDelete(room_id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

module.exports = {
    createRoom,
    getAllRooms,
    getOneRoom,
    editRoom,
    deleteRoom
}
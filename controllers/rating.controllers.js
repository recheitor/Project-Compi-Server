const Rating = require("../models/Rating.model")
const House = require("../models/House.model")
const Room = require("../models/Room.model")
const User = require("../models/User.model")

const createRating = (req, res, next) => {

    const { score, comment, user, referedTo, referedToId } = req.body

    const ratingData = { score, comment, userId: user }

    let referedModel
    referedTo === 'House' ? referedModel = House : referedTo === 'Room' ? referedModel = Room : referedModel = User

    referedModel
        .findById(referedToId)
        .populate('rating')
        .select({ rating: 1 })
        .then(({ rating }) => {

            let thisUserRated = false
            rating.forEach(({ userId }) => {
                if (userId.toHexString() === user) {
                    thisUserRated = true
                }
            })
            return !thisUserRated ?

                Rating
                    .create(ratingData)
                    .then((rating) =>
                        referedModel.findByIdAndUpdate(referedToId, { $push: { rating: rating._id } }))
                    .then(() => res.json({ message: `${referedTo} rated` }))
                    .catch(err => next(err))
                :
                res.json({ message: `${referedTo} already rated by this user` })
        })
        .catch(err => next(err))
}

const deleteRating = (req, res, next) => {

    const { rating_id } = req.params

    Rating
        .findByIdAndDelete(rating_id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

module.exports = {
    createRating,
    deleteRating
}
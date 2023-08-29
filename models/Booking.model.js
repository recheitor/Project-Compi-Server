const { Schema, model } = require("mongoose");

const bookingsSchema = new Schema(
    {
        house: {
            type: Schema.Types.ObjectId,
            ref: 'House'
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        bookingDates: {
            entry: {
                type: Date,
            },
            exit: {
                type: Date,
            }
        },
        guestsNumber: {
            type: Number,
        },
        price: {
            type: Number,
        },
        rating: [{
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }],
    },
    {
        timestamps: true
    }
);

const Bookings = model("Bookings", bookingsSchema);

module.exports = Bookings;

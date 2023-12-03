const { Schema, model } = require("mongoose");

const bookingsSchema = new Schema(
    {
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
        price: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

const Bookings = model("Bookings", bookingsSchema);

module.exports = Bookings;

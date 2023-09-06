const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            lowercase: true,
            trim: true
        },
        gallery: {
            type: [String],
            validate: {
                validator: value => value.length > 0,
                message: 'Mínimo una foto'
            }
        },
        description: {
            type: String,
            required: [true, 'Description is required.'],
            lowercase: true,
            trim: true
        },
        info: {
            maxGuests: {
                type: Number,
                required: [true, 'Select number of maximum guests'],
            },
            beds: {
                type: Number,
                required: [true, 'Select number of beds'],
            },
            bathroom: {
                type: String,
                enum: ['Shared', 'Private'],
                required: [true, 'Select type of bathroom'],
            },
        },
        price: {
            roomPrice: {
                type: Number,
                required: [true, 'Price is required'],
            },
            cleaningPrice: {
                type: Number,
                required: [true, 'Cleaning price is required'],
            }
        },
        bookings: [{
            type: Schema.Types.ObjectId,
            ref: 'Bookings'
        }],
        rating: [{
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }],
    },
    {
        timestamps: true
    }
);


const Room = model("Room", roomSchema);

module.exports = Room;

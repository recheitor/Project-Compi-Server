const { Schema, model } = require("mongoose");

const houseSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],

            trim: true
        },
        gallery: {
            type: [String],
            validate: {
                validator: value => value.length > 0,
                message: 'One photo is required.'
            }
        },
        description: {
            type: String,
            required: [true, 'description is required.'],

            trim: true
        },
        info: {
            maxGuests: {
                type: Number,
                required: [true, 'Select number of maximum guests'],
            },
            rooms: {
                type: Number,
                required: [true, 'Select number of rooms'],
            },
            beds: {
                type: Number,
                required: [true, 'Select number of beds'],
            },
            bathrooms: {
                type: Number,
                required: [true, 'Select number of bathrooms'],
            },
        },
        price: {
            housePrice: {
                type: Number,
                required: [true, 'Price is required'],
            },
            cleaningPrice: {
                type: Number,
                required: [true, 'Cleaning price is required'],
            }
        },
        address: {
            street: String,
            number: Number,
            zipcode: Number,
            city: String,
            province: String,
            country: String
        },
        location: {
            type: {
                type: String,
                default: 'Point'
            },
            coordinates: {
                type: [Number]
            }
        },
        amenities: [{
            amenity: {
                type: Schema.Types.ObjectId,
                ref: 'Amenity'
            },
            included: {
                type: Boolean,
            }
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: [{
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }],
        rooms: [{
            type: Schema.Types.ObjectId,
            ref: 'Room',
        }],
    },
    {
        timestamps: true
    }
);

houseSchema.index({ location: '2dsphere' })

const House = model("House", houseSchema);

module.exports = House;

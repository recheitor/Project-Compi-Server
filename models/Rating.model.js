const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(

    {
        score: {
            type: Number,
            requiered: true
        },
        comment: {
            type: String,
            default: 'no comment'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true
    }
);


const Rating = model("Rating", ratingSchema);

module.exports = Rating;

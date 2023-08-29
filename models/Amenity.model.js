const { Schema, model } = require("mongoose");

const AmenitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Accommodation name is required.'],
      lowercase: true,
      trim: true
    },
    icon: {
      type: String,
      required: [true, 'Image for the accommodation is required.'],
      lowercase: true,
      trim: true
    },
  },
  {
    timestamps: true
  }
);

const Amenity = model("Amenity", AmenitySchema);

module.exports = Amenity;

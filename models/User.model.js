const { Schema, model } = require("mongoose");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    role: {
      type: String,
      enum: ['ADMIN', 'GUEST', 'OWNER'],
      default: 'GUEST'
    },
    rating:
      [{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
      }],
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [2, 'Password min length is 2 characters']
    },
    bio: {
      type: String,
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: 'House'
    }]
  },
  {
    timestamps: true
  }
);


userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})


userSchema.methods.signToken = function () {
  const { _id, role, firstName, email, favorites } = this
  const payload = { _id, role, firstName, email, favorites }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema);

module.exports = User;

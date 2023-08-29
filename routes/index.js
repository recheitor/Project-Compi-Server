module.exports = app => {

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

    const usersRoutes = require("./user.routes")
    app.use("/api/users", usersRoutes)

    const housesRoutes = require("./house.routes")
    app.use("/api/houses", housesRoutes)

    const roomsRoutes = require("./room.routes")
    app.use("/api/rooms", roomsRoutes)

    const bookingsRoutes = require("./booking.routes")
    app.use("/api/bookings", bookingsRoutes)

    const amenitiesRoutes = require("./amenity.routes")
    app.use("/api/amenities", amenitiesRoutes)

    const ratingsRoutes = require("./rating.routes")
    app.use("/api/ratings", ratingsRoutes)

    const uploadsRoutes = require("./upload.routes")
    app.use("/api/uploads", uploadsRoutes)
}
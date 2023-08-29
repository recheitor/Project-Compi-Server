const getBookingData = ({ house, room, user, entry, exit, guestsNumber, price }) => {

    const bookingDates = { entry, exit }
    const bookingData = { house, room, user, bookingDates, guestsNumber, price }

    return bookingData
}

const getNewBookingData = ({ house, room, user, entry, exit, guestsNumber, price }) => {

    const bookingDates = { entry, exit }
    const newBookingData = { house, room, user, bookingDates, guestsNumber, price }

    return newBookingData
}

module.exports = {
    getBookingData,
    getNewBookingData
}
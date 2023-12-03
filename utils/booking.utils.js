const getBookingData = ({ room, user, entry, exit, price }, { _id }) => {

    const bookingDates = { entry, exit }
    const bookingData = { room, user, bookingDates, price }
    bookingData.user = _id

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
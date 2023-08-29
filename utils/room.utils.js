const getRoomData = ({ title, gallery, description, maxGuests, beds, bathroom, roomPrice, cleaningPrice }) => {

    const price = { roomPrice, cleaningPrice }
    const info = { maxGuests, beds, bathroom }
    const roomsData = { title, gallery, description, info, price }

    return roomsData
}

const getNewRoomData = ({ title, gallery, description, maxGuests, beds, bathroom, roomPrice, cleaningPrice }) => {

    const price = { roomPrice, cleaningPrice }
    const info = { maxGuests, beds, bathroom }
    const newRoomsData = { title, gallery, description, info, price }

    return newRoomsData
}

module.exports = {
    getRoomData,
    getNewRoomData
}
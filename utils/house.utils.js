const getHouseData = ({
    title,
    gallery,
    description,
    maxGuests,
    rooms,
    beds,
    bathrooms,
    housePrice,
    cleaningPrice,
    street,
    number,
    zipcode,
    city,
    country,
    amenities
}, { _id: owner }) => {

    const price = { housePrice, cleaningPrice }
    const address = { street, number, zipcode, city, country }
    const info = { maxGuests, rooms, beds, bathrooms }
    const houseData = { title, gallery, description, info, price, address, owner, amenities }


    return houseData
}

const getNewHouseData = ({
    title,
    gallery,
    description,
    maxGuests,
    rooms,
    beds,
    bathrooms,
    housePrice,
    cleaningPrice,
    street,
    number,
    zipcode,
    city,
    country,
    amenity,
    included }) => {

    const price = { housePrice, cleaningPrice }
    const address = { street, number, zipcode, city, country }
    const info = { maxGuests, rooms, beds, bathrooms }
    const amenities = { amenity, included }
    const newHouseData = { title, gallery, description, info, price, address, amenities }

    return newHouseData
}

module.exports = {
    getHouseData,
    getNewHouseData
}
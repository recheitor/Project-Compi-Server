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
    province,
    country,
    amenities,
    coordinates
}, { _id: owner }) => {

    const price = { housePrice, cleaningPrice }
    const address = { street, number, zipcode, city, province, country }
    const info = { maxGuests, rooms, beds, bathrooms }
    const location = { coordinates }
    const houseData = { title, gallery, description, info, price, address, owner, amenities, location }


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
    amenities,
    included }) => {

    const price = { housePrice, cleaningPrice }
    const address = { street, number, zipcode, city, country }
    const info = { maxGuests, rooms, beds, bathrooms }

    const newHouseData = { title, gallery, description, info, price, address, amenities }

    return newHouseData
}

module.exports = {
    getHouseData,
    getNewHouseData
}
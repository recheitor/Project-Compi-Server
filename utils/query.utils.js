const getQueryData = ({ beds, bathrooms, maxGuests, rooms, price, city }, query) => {
    beds && (query = { ...query, ...{ "info.beds": { $gte: beds } } })
    bathrooms && (query = { ...query, ...{ "info.bathrooms": { $gte: bathrooms } } })
    maxGuests && (query = { ...query, ...{ "info.maxGuests": { $gte: maxGuests } } })
    rooms && (query = { ...query, ...{ "info.rooms": { $gte: rooms } } })
    city && (query = { ...query, ...{ "address.city": city } })
    price && (query = { ...query, ...{ "price.housePrice": { $lte: price } } })
    return query
}

module.exports = {
    getQueryData,

}
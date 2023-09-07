const getQueryData = ({ beds, bathrooms, maxGuests, rooms, price, province, userFavorites }, query, { favorites }) => {
    beds && (query = { ...query, ...{ "info.beds": { $gte: beds } } })
    bathrooms && (query = { ...query, ...{ "info.bathrooms": { $gte: bathrooms } } })
    maxGuests && (query = { ...query, ...{ "info.maxGuests": { $gte: maxGuests } } })
    rooms && (query = { ...query, ...{ "info.rooms": { $gte: rooms } } })
    province && (query = { ...query, ...{ "address.province": province } })
    price && (query = { ...query, ...{ "price.housePrice": { $lte: price } } })
    price && (query = { ...query, ...{ "price.housePrice": { $lte: price } } })
    if (userFavorites === 'true') {
        (query = { ...query, ...{ _id: { $in: favorites } } })
    }



    return query
}

module.exports = {
    getQueryData,

}
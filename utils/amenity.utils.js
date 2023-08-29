const getAmenityData = ({ name, icon }) => {

    const amenityData = { name, icon }

    return amenityData
}

const getNewAmenityData = ({ name, icon }) => {

    const newAmenityData = { name, icon }

    return newAmenityData
}

module.exports = {
    getAmenityData,
    getNewAmenityData
}
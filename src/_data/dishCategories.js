const fetch = require('node-fetch')

module.exports = async () => {
    return await fetch("https://admin.schwarz-micha.de/dish-categories")
    .then(res => res.json())
}

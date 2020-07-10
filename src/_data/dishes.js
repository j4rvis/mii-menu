const fetch = require('node-fetch')

module.exports = async () => {
    return await fetch("https://admin.schwarz-micha.de/dishes")
    .then(res => res.json())
}

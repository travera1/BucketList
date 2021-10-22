require ('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 4000, 
    mongoUri: process.env.MONGO_URI,
}

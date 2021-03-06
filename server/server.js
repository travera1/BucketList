const express = require('express')
const app = express()
const { PORT, mongoUri } = require('../config')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const bucketListItemRoutes = require('./routes/api/bucketListItems')

//middle ware 
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database connected ...'))
    .catch((err) => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`app listening at http:localhost:${PORT}`))
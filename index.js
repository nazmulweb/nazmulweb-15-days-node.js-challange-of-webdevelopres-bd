const express = require('express')
const { connectDB } = require('./db/dbConnection')
const noteRoutes = require('./routes/noteRoute')
const userRoutes = require('./routes/userRoutes')
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = 3000;
const { error } = require('../middleware/error')

require('dotenv').config({ path: "./config/config.env" })

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors())
// db connection 
connectDB();

app.use('/note', noteRoutes)
app.use('/users', userRoutes)
app.use(error)

app.get('*', (req, res) => {
    res.status(404).send('Page not found 404')
})

app.listen(port, () => {
    console.log('Server connect with port:', port)
})
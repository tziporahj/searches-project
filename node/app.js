const express = require('express');
const searchRoter = require('./api/routes/searches')
const usersRoter = require('./api/routes/users')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authMiddleware = require("./api/middlewares/auth-middleware");


dotenv.config()

mongoose.connect('mongodb://localhost:27017/projectDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express();
app.listen(3000);

app.use(express.json())


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next()
})

app.use('/search', searchRoter)
// app.use('/search', (req, res) => {
//     console.log(req.headers.authorization)
// })

// app.use('/search', authMiddleware)
app.use('/users', usersRoter)



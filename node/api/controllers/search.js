const User = require('../models/users')
const Search = require('../models/search')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

module.exports = {
    saveWeatherSearch: (async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY).user
        if (!decoded) {
            return res.status(403).json({
                message: 'the token is wrong you have to login again'
            })
        }
        const { search } = req.body;

        User.findOne({ email: decoded.email, password: decoded.password }).then((userfound) => {
            if (!userfound) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }
            const newSearch = new Search({
                _id: mongoose.Types.ObjectId(),
                name: search.name,
                description: search.description,
                main: search.main,
                icon: search.icon
            })

            newSearch.save()
            userfound.searches.push(newSearch._id)
            userfound.save()
            res.status(200).json({
                userfound,
                message: 'search was pushed'
            })
        }).catch(error => {
            res.status(500).json({
                message: 'push search failed'
            })
        })
    }),
    getSearches: (async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY).user
        console.log(decoded)

        await User.findOne({ email: decoded.email, password: decoded.password }).populate('searches').then((users) => {
            console.log(users)
            res.status(200).json({
                users
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }),

    getUserById: (async (req, res) => {
        const { email } = req.body;
        User.findOne({ email }).then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }
            console.log(user)
        }).catch(error => {
            res.status(500).json({
                message: 'push search failed'
            })
        })
    })
}
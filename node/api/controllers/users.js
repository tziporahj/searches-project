const mongoose = require('mongoose')
const User = require('../models/users');
const jwt = require('jsonwebtoken')

module.exports = {
    saveUser: (async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password)
        User.find({ email, password }).then((users) => {
            if (users.length >= 1)
                return res.status(409).json({
                    message: "email and password exists"
                })
        })
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            email, password, searches: []
        })
        user.save().then(() => {
            const serverToken = jwt.sign({ user }, process.env.JWT_KEY)

            res.status(200).json({
                serverToken,
                message: 'user saved'
            })

        }).catch(error => {
            res.status(500).json({
                message: 'user save failed'
            })
        })
    }),
    login: (async (req, res) => {
        const { email, password } = req.body
        User.find({ email, password }).then((user) => {
            if (user.length === 0) {
                return res.status(403).json({
                    message: "no such user"
                })
            }
            const serverToken = jwt.sign({ user }, process.env.JWT_KEY)
            res.status(200).json({
                serverToken,
                user,
                message: "user found"
            })
        }).catch(error => {
            res.status(500).json({
                message: 'find user  failed'
            })
        })
    })
}
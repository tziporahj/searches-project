const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: { type: String, required: true },
    password: { type: String, required: true },
    searches: [
        { type: mongoose.Types.ObjectId, ref: 'Search' }
    ]
})

module.exports = mongoose.model('User', usersSchema)
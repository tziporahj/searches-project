const mongoose = require('mongoose');

const searchSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    description: String,
    main: String,
    icon: String

})

module.exports = mongoose.model('Search', searchSchema)
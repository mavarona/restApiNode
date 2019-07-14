const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: 'Añada un nombre'
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', usersSchema);
const mongoose = require('mongoose')

const ContestSchema = new mongoose.Schema({
    image: {
        data: Buffer, // Binary data for the image
        contentType: String // Content type of the image (e.g., 'image/jpeg')
    },
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    date: {
        type: Date,
        required: [true, 'Please provide date'],
    },
    time: {
        type: String,
        required: [true, 'Please provide time'],
    }
},
{ timestamps: true })
module.exports = mongoose.model('Contest', ContestSchema);
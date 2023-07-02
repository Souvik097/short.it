const mongoose = require('mongoose');

// Schema declaration for the Short URL format to store it into the database

const shortUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [{
        timestamp: { type: Number }
    }],
    totalClicks: {
        type: Number,
        required: true,
        default: 0
    }
},
    { timestamps: true });

const ShortUrl = mongoose.model('ShortURL', shortUrlSchema);

module.exports = ShortUrl;
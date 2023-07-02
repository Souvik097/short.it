const ShortUrl = require('../models/shortURL');

// Custom function to generate a Short Id having the length of 'length'

const generateShortId = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortId += characters[randomIndex];
    }
    return shortId;
}

// API to create the ShortUrl object and store it into the database

const generateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.longUrl) {
        return res.status(400).json({ message: 'URL is required' });
    }
    let shortId;
    do {
        shortId = generateShortId(8);
    } while (!(await ShortUrl.find({ shortUrl: shortId })));
    const newShortUrl = await ShortUrl.create({
        originalUrl: body.longUrl,
        shortUrl: shortId,
        visitHistory: [],
        totalClicks: 0
    });

    return res.status(200).json({ originalUrl: newShortUrl.originalUrl, shortUrl: newShortUrl.shortUrl });
};

module.exports = {
    generateNewShortURL
};
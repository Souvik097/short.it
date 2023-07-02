const express = require('express');
const path = require('node:path');
const mongoose = require('mongoose');
const ShortUrl = require('./api/models/shortURL');
const { generateNewShortURL } = require('./api/controllers/url')

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/views')));
app.use(express.static(path.join(__dirname, './public')));

// Connect to MongoDB server

mongoose.connect('mongodb://127.0.0.1:27017/short-URLs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

// Create a new URL

app.post('/api/shorten/', async (req, res) => {
    const { longUrl } = req.body;

    // Check if the URL already exists

    const existingUrl = await ShortUrl.findOne({ originalUrl: longUrl });
    if (existingUrl) {
        return res.status(200).json({ originalUrl: existingUrl.originalUrl, shortUrl: existingUrl.shortUrl });
    }

    // Generate a short URL

    const shortUrl = generateNewShortURL(req, res);
});

// Redirect to the original URL

app.get('/:shortId', async (req, res) => {
    const url = await ShortUrl.findOne({ shortUrl: req.params.shortId });
    if (!url) {
        return res.status(404).json({ message: 'Invalid URL' });
    }
    url.totalClicks++;
    url.visitHistory.push({
        timestamp: Date.now()
    });
    url.save();

    res.redirect(url.originalUrl);
});

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
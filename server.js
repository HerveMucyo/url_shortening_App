const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;
const path = require('path');
app.use(express.json());

app.set('view engine', 'ejs')
app.get('/', async(req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post("/shorten", async(req, res) => {
    const longUrl = req.body.long_url;
    const apiKey = "dad69e0ef323fa0781f3c82d2ab198c694ea1787";
    const apiUrl = "https://api-ssl.bitly.com/v4/shorten";

    // app.get('/', function(req, res) {
    //     res.send('Hello World');
    // });

    // app.get('/', function(req, res) {
    //     res.render('index.html');
    // });

    try {
        const response = await axios.post(apiUrl, {
            long_url: longUrl
        }, {
            headers: {
                "Authorization": "Bearer " + apiKey,
                "Content-Type": "application/json"
            }
        });

        res.json({
            shortUrl: response.data.id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "An error occurred"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
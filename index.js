require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(bodyParser.json());

const handleSend = (req, res) => {
    const secret_key = process.env.RECAPTCHA_SECRET_KEY;
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    fetch(url, {
        method: 'post'
    })
        .then(response => response.json())
        .then(google_response => res.json({ google_response }))
        .catch(error => res.json({ error }));
};

app.post('/send', handleSend);

app.listen(port, () => console.log(`Listening on port ${port}!`));
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(bodyParser.json());

const handleSend = (req, res) => {
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    const token = req.body.token;
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.PROJECT_NAME}/assessments?key=${process.env.PROJECT_API_KEY}`

    fetch(url, {
        method: 'post',
        body: JSON.stringify({
            event: { siteKey, token }
        }),
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(google_response => res.json({ google_response }))
        .catch(error => res.json({ error }));
};

app.post('/send', handleSend);

app.listen(port, () => console.log(`Listening on port ${port}!`));
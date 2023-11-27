require('dotenv').config(); // At the top of your file

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();

const port = 8000;

// Serve static files from the "public" directory
var publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());


app.post('/chat', async (req, res) => {
    // Construct the payload for the external API
    const payload = {
        // Your payload structure...
        data: req.body.data,
        session_id: req.body.session_id,
        stateful: req.body.stateful,
        user_id: req.body.user_id
    };

    try {
        const apiResponse = await axios.post('https://api.zerowidth.ai/process/ZO3Hxr4tQQvKDUugRQ9I/1ZCoYea03WPAJSJycaXu', payload, {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.BEARER_TOKEN}` // Use the token here
            }
        });

        // Send the response data back to the client
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error calling external API:', error);
        res.status(500).send('Error processing request');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Chatbot server running on http://localhost:${port}`);
});


///mock api response
/*
app.post('/chat', async (req, res) => {
    try {
        console.log("Received message:", req.body);

        // Instead of calling an external API, just return a mock response
        const mockApiResponse = {
            data: {
                message: {
                    content: "This is a mock response",
                    role: "bot"
                }
            },
            session_id: "testSessionID",
            stateful: true,
            user_id: "testUserID"
        };

        res.json(mockApiResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing request');
    }
});
*/
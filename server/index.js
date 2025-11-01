const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // We'll run the backend on a different port

// Middleware
app.use(cors()); // Allows requests from your frontend
app.use(express.json()); // Allows the server to understand JSON data from requests

// --- API Endpoints ---

// POST endpoint to generate a birth chart
app.post('/api/generate-chart', (req, res) => {
    // 1. Get user's birth data from the request
    const { name, dateOfBirth, timeOfBirth, placeOfBirth } = req.body;
    console.log('Received birth data:', { name, dateOfBirth, timeOfBirth, placeOfBirth });

    // 2. **TODO**: Use an astrology library to calculate the chart data.
    // For now, we will return mock data, just like the frontend.
    const mockChartData = {
        sunSign: 'Leo',
        moonSign: 'Cancer',
        ascendant: 'Scorpio',
        planets: [
            { name: 'Sun', sign: 'Leo', house: 10 },
            { name: 'Moon', sign: 'Cancer', house: 7 },
            { name: 'Mercury', sign: 'Virgo', house: 11 },
        ],
    };

    // 3. Send the calculated data back to the frontend
    res.json(mockChartData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Nakshatra AI server is running on http://localhost:${PORT}`);
});
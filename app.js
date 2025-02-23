import express from 'express';
import gplay from 'google-play-scraper';
import fs from 'fs';

const app = express();
const port = 3000;
const filePath = './app.json';

// Route to fetch app details and store in app.json
app.get('/app/:appId', async (req, res) => {
    const { appId } = req.params;

    try {
        // Fetch app details
        const appDetails = await gplay.app({ appId });
        console.log('Fetched App Details:', appDetails);

        // Check if data is valid
        if (Object.keys(appDetails).length === 0) {
            throw new Error('No data fetched from Google Play.');
        }

        // Append data to app.json
        let existingData = [];
        if (fs.existsSync(filePath)) {
            existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        existingData.push(appDetails);

        // Save updated data to app.json
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 4));
        console.log('Data saved to app.json');

        // Send success response
        res.json({ message: 'Data saved to app.json', data: appDetails });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
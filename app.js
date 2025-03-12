import express from 'express';
import gplay from 'google-play-scraper';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const filePath = path.join(__dirname, 'app.json');

// Initialize app.json if it doesn't exist
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 4));
}

// Serve static files from public directory and dist
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// Add middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add new route to check if app exists
app.get('/api/checkApp/:appId', (req, res) => {
  try {
    const { appId } = req.params;
    const data = fs.readFileSync(filePath, 'utf8');
    const apps = JSON.parse(data);
    const exists = apps.some(app => app.appId === appId);
    res.json({ exists });
  } catch (error) {
    console.error('Error checking app:', error);
    res.status(500).json({ error: 'Failed to check app' });
  }
});

// Add new route to get specific app details
app.get('/api/app/:appId', async (req, res) => {
  const { appId } = req.params;
  try {
    // First check if app exists in our database
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const appsData = fileContent ? JSON.parse(fileContent) : [];
    const existingApp = appsData.find(app => app.appId === appId);

    if (existingApp) {
      return res.json(existingApp);
    }

    // If not found, fetch from Play Store
    const appDetails = await gplay.app({ appId });
    
    if (!appDetails || Object.keys(appDetails).length === 0) {
      throw new Error('No data fetched from Google Play.');
    }

    // Add to database
    appsData.push({
      ...appDetails,
      fetchedAt: new Date().toISOString()
    });

    fs.writeFileSync(filePath, JSON.stringify(appsData, null, 4));
    res.json(appDetails);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Add route for manual app submissions
app.post('/api/manual', (req, res) => {
  try {
    const appData = req.body;
    
    // Read existing data
    const data = fs.readFileSync(filePath, 'utf8');
    const apps = JSON.parse(data);

    // Check if app with same appId already exists
    const existingAppIndex = apps.findIndex(app => app.appId === appData.appId);
    
    if (existingAppIndex !== -1) {
      // Update existing app
      apps[existingAppIndex] = {
        ...apps[existingAppIndex],
        ...appData,
        updated: Date.now(),
        fetchedAt: new Date().toISOString()
      };
    } else {
      // Add new app
      apps.push({
        ...appData,
        fetchedAt: new Date().toISOString()
      });
    }

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(apps, null, 4));

    res.json({ success: true, message: 'App data saved successfully' });
  } catch (error) {
    console.error('Error saving app data:', error);
    res.status(500).json({ error: 'Failed to save app data' });
  }
});

// Route to get all apps - move this before the catch-all route
app.get('/api/getApps', (req, res) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const apps = JSON.parse(data);
    res.header('Content-Type', 'application/json');
    res.json(apps);
  } catch (error) {
    console.error('Error reading apps:', error);
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});

// Add routes for the new pages
app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Move catch-all route to the end
app.get('*', (req, res) => {
  // Try public directory first, then dist
  const publicPath = path.join(__dirname, 'public', 'index.html');
  const distPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(publicPath)) {
    res.sendFile(publicPath);
  } else if (fs.existsSync(distPath)) {
    res.sendFile(distPath);
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
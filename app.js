const express = require('express'); // Import Express
const sqlite3 = require('sqlite3').verbose(); // Import SQLite library
const app = express(); // Initialize Express app
const itemRoutes = require('./routes/itemRoutes'); // Import item routes

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (for example, if you have a 'public' folder for frontend assets)
app.use(express.static('public'));

// Use item routes
app.use('/api/items', itemRoutes);

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        // Create the 'items' table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

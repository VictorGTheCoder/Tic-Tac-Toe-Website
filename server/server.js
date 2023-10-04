const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const app = express();
const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity. You can use a file-based DB for persistence.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database with a users table
db.serialize(() => {
    db.run("CREATE TABLE users (id INT, username TEXT, password TEXT)");
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
        if (row) {
            return res.status(400).send({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user details in the database
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
            if (err) {
                return res.status(500).send({ message: "Error registering user" });
            }
            res.send({ message: "User registered successfully" });
        });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
        if (!row) {
            return res.status(400).send({ message: "User not found" });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, row.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid password" });
        }

        // If successful, create a session or JWT (for simplicity, we're just sending a success message)
        res.send({ message: "Logged in successfully" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = 'mongodb://localhost:2701mongodb://localhost:27017/'; // Replace with your MongoDB URI
const client = new MongoClient(uri);
const dbName = 'Bookshop_Automation'; // Replace with your database name

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

// API Endpoint to Add Items to Cart
app.post('/add-to-cart', async (req, res) => {
    const { book, price } = req.body;

    try {
        const cartCollection = db.collection('cart');
        await cartCollection.insertOne({ book, price });
        res.status(200).send('Item added to cart');
    } catch (error) {
        res.status(500).send('Error adding item to cart');
    }
});

// API Endpoint to Get Cart Items
app.get('/cart-items', async (req, res) => {
    try {
        const cartCollection = db.collection('cart');
        const items = await cartCollection.find().toArray();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).send('Error fetching cart items');
    }
});

// API Endpoint for Admin Login
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;

    // Replace with your actual admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'password123';

    if (username === adminUsername && password === adminPassword) {
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send({ message: 'Invalid username or password' });
    }
});

// Search Books Endpoint
app.get('/search-books', async (req, res) => {
    const query = req.query.q; // Get the search query from the request
    if (!query) {
        return res.status(400).send({ error: 'Search query is required' });
    }

    try {
        const booksCollection = db.collection('Books'); // Replace with your collection name
        const results = await booksCollection
            .find({ title: { $regex: query, $options: 'i' } }) // Case-insensitive search
            .toArray();

        res.status(200).send(results);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).send({ error: 'An error occurred while searching for books' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
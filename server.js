const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI and database name
const uri = 'mongodb://localhost:27017/'; // Replace with your MongoDB URI
const dbName = 'Bookshop_Automation'; // Replace with your database name

// Create a MongoClient instance
const client = new MongoClient(uri);

let db;

// Function to connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect(); // Connect to the MongoDB server
        db = client.db(dbName); // Select the database
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Call the function to connect
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

// API Endpoint to Register User
app.post('/register-user', async (req, res) => {
    const { name, address, zipcode, phone, email, password } = req.body;

    try {
        const usersCollection = db.collection('Customers'); // Replace 'users' with your desired collection name
        await usersCollection.insertOne({ name, address, zipcode, phone, email, password });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ error: 'An error occurred while registering the user' });
    }
});

// API Endpoint to Get Sales Report
app.get('/sales-report', async (req, res) => {
    const { start, end } = req.query;

    // Replace this with actual database queries
    const salesData = {
        dailySales: 500,
        monthlySales: 15000,
        yearlySales: 180000,
        dates: ['2025-04-01', '2025-04-02', '2025-04-03'], // Example dates
        sales: [200, 300, 500], // Example sales data
    };

    res.json(salesData);
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
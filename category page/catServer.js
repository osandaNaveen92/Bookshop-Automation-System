const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const dbName = 'Bookshop_Automation';

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db(Bookshop_Automation);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

// Endpoint to fetch books by category
app.get('/books', async (req, res) => {
    const category = req.query.category;
    if (!category) {
        return res.status(400).send({ error: 'Category is required' });
    }

    try {
        const booksCollection = db.collection('books');
        const books = await booksCollection.find({ category }).toArray();
        res.status(200).send(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send({ error: 'An error occurred while fetching books' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
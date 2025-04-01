// Get the category from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Update the page title and banner
document.getElementById('category-title').textContent = category;
document.getElementById('category-banner').style.backgroundImage = `url('images/${category.toLowerCase()}.jpg')`;

// Fetch books from the MongoDB database
async function fetchBooksByCategory(category) {
    try {
        const response = await fetch(`http://localhost:3000/books?category=${encodeURIComponent(category)}`);
        if (response.ok) {
            const books = await response.json();
            displayBooks(books);
        } else {
            console.error('Failed to fetch books');
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Display books in the books container
function displayBooks(books) {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = ''; // Clear previous content

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
        `;
        booksContainer.appendChild(bookItem);
    });
}

// Fetch books for the selected category
fetchBooksByCategory(category);
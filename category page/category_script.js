// Get the category from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Quotes for each category
const categoryQuotes = {
    Fiction: "“A reader lives a thousand lives before he dies.” – George R.R. Martin",
    Science: "“Science is a way of thinking much more than it is a body of knowledge.” – Carl Sagan",
    History: "“Those who cannot remember the past are condemned to repeat it.” – George Santayana",
    Technology: "“Technology is best when it brings people together.” – Matt Mullenweg",
    Comics: "“With great power comes great responsibility.” – Spider-Man",
    Biographies: "“A life is not important except in the impact it has on other lives.” – Jackie Robinson",
    Mystery: "“The world is full of obvious things which nobody by any chance ever observes.” – Sherlock Holmes",
    Romance: "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.” – Dr. Seuss"
};

// Update the page title and banner
document.getElementById('category-title').textContent = category;
document.getElementById('category-banner').style.backgroundImage = `url('images/${category.toLowerCase()}.jpg')`;

// Display the quote for the selected category
const categoryDescription = document.getElementById('category-description');
if (categoryQuotes[category]) {
    categoryDescription.textContent = categoryQuotes[category];
} else {
    categoryDescription.textContent = "Explore the best books in this category!";
}

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
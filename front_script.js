// Search Function
async function searchBook() {
    let query = document.getElementById("searchBox").value;
    if (!query) {
        alert("Please enter a book name to search.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/search-books?q=${encodeURIComponent(query)}`);
        if (response.ok) {
            const books = await response.json();
            if (books.length > 0) {
                // Display search results
                let resultsDiv = document.getElementById("searchResults");
                resultsDiv.innerHTML = ""; // Clear previous results
                books.forEach(book => {
                    let div = document.createElement("div");
                    div.textContent = `${book.title} - ${book.author}`;
                    resultsDiv.appendChild(div);
                });
            } else {
                alert("No books found.");
            }
        } else {
            alert("Failed to fetch search results.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while searching for books.");
    }
}

// Handle Book Categories
function selectCategory(category) {
    alert("Selected category: " + category);
}

// Open Login Modal
function openLoginOptions() {
    document.getElementById("loginModal").style.display = "flex";
}

// Close Login Modal
function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

// Handle Login
function login(type) {
    if (type === 'user') {
        alert("Redirecting to User Login...");
        // Redirect to user login page
        window.location.href = "user_login.html";
    } else if (type === 'admin') {
        alert("Redirecting to Admin Login...");
        // Redirect to admin login page
        window.location.href = "admin_login.html";
    }
}

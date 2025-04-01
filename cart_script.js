let cart = [];

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
        window.location.href = "user_login.html";
    } else if (type === 'admin') {
        window.location.href = "admin_login.html";
    }
}

// Add Book to Cart
async function addToCart(book, price) {
    try {
        const response = await fetch('http://localhost:3000/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book, price }),
        });

        if (response.ok) {
            alert(`${book} added to cart!`);
        } else {
            alert('Failed to add item to cart');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Load Cart Items
async function loadCart() {
    try {
        const response = await fetch('http://localhost:3000/cart-items');
        const items = await response.json();

        let cartItemsDiv = document.getElementById('cart-items');
        let totalPrice = 0;

        cartItemsDiv.innerHTML = ''; // Clear previous items
        items.forEach(item => {
            let div = document.createElement('div');
            div.textContent = `${item.book} - $${item.price}`;
            cartItemsDiv.appendChild(div);
            totalPrice += item.price;
        });

        document.getElementById('total-price').textContent = totalPrice;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Checkout
function checkout() {
    alert('Proceeding to payment...');
}

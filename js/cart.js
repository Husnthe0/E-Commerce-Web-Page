let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id, name, price, image) {

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            qty: 1
        });
    }

    saveCart();
}

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);
    saveCart();

    renderCart();
}

function updateQty(id, action) {

    let item = cart.find(i => i.id === id);

    if (!item) return;

    if (action === "plus") {
        item.qty += 1;
    }

    if (action === "minus") {
        item.qty -= 1;
        if (item.qty <= 0) {
            removeFromCart(id);
            return;
        }
    }

    saveCart();
    renderCart();
}

function updateCartCount() {

    let count = cart.reduce((total, item) => total + item.qty, 0);

    let cartIcon = document.querySelector(".cart-count");

    if (cartIcon) {
        cartIcon.textContent = count;
    }
}

function renderCart() {

    let container = document.querySelector(".cart-items");

    if (!container) return;

    container.innerHTML = "";

    cart.forEach(item => {

        container.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" />

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p>$${item.price}</p>

                    <div class="qty">

                        <button onclick="updateQty(${item.id}, 'minus')">-</button>

                        <span>${item.qty}</span>

                        <button onclick="updateQty(${item.id}, 'plus')">+</button>

                    </div>

                </div>

                <button onclick="removeFromCart(${item.id})">Remove</button>

            </div>
        `;

    });
}

updateCartCount();
renderCart();
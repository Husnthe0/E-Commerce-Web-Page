let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function calculateTotal() {
    const current = JSON.parse(localStorage.getItem("cart")) || [];
    return current.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0), 0);
}

function renderCheckout() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!container || !totalEl) return;
    container.innerHTML = "";
    const current = JSON.parse(localStorage.getItem("cart")) || [];
    if (current.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Add products to continue shopping</p>
                <a href="shop.html" class="continue-btn">Go to Shop</a>
            </div>
        `;
        totalEl.innerText = "$0";
        return;
    }
    current.forEach(item => {
        const price = Number(item.price) || 0;
        const qty = Number(item.qty) || 0;
        container.innerHTML += `
            <div class="order-item">
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <small>$${price.toFixed(2)}</small>
                </div>
                <div class="qty-controls">
                    <button onclick="decreaseQty(${item.id})">-</button>
                    <span>${qty}</span>
                    <button onclick="increaseQty(${item.id})">+</button>
                </div>
                <div class="item-total">$${(price * qty).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeItem(${item.id})"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;
    });
    totalEl.innerText = "$" + calculateTotal().toFixed(2);
    saveCart();
}

function increaseQty(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += 1;
    renderCheckout();
}

function decreaseQty(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty -= 1;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    renderCheckout();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCheckout();
}

document.querySelector(".place-order")?.addEventListener("click", function () {
    const email = document.getElementById("email")?.value;
    const firstName = document.getElementById("firstName")?.value;
    const lastName = document.getElementById("lastName")?.value;
    const address = document.getElementById("address")?.value;
    const city = document.getElementById("city")?.value;
    const postal = document.getElementById("postal")?.value;

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!email || !firstName || !lastName || !address || !city || !postal) {
        alert("Please fill all required fields!");
        return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cart");
    location.reload();
});

window.addEventListener('DOMContentLoaded', function(){ renderCheckout(); });
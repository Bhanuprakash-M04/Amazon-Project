export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  const selectElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  let val = 1;
  if (selectElement) {
    val = Number(selectElement.value);
  }
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) matchingItem = cartItem;
  });
  if (matchingItem) {
    matchingItem.quantity += val;
  } else {
    cart.push({
      productId: productId,
      quantity: val,
      deliveryOptionId: "1",
      UpdateStatus: false,
    });
  }
  saveToStorage();
}

export function removeFromcart(productId) {
  let newcart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newcart.push(cartItem);
    }
  });
  cart = newcart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) matchingItem = cartItem;
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

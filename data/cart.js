export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "1",
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "2",
  },
];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  const selectElement = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  let val = Number(selectElement.value);
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

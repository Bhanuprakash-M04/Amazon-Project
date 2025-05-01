class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(
      localStorage.getItem(this.#localStorageKey)
    ) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
        UpdateStatus: false,
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
        UpdateStatus: false,
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const selectElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    let val = 1;
    if (selectElement) {
      val = Number(selectElement.value);
    }
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) matchingItem = cartItem;
    });
    if (matchingItem) {
      matchingItem.quantity += val;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: val,
        deliveryOptionId: "1",
        UpdateStatus: false,
      });
    }
    this.saveToStorage();
  }

  removeFromcart(productId) {
    let newcart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newcart.push(cartItem);
      }
    });
    this.cartItems = newcart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) matchingItem = cartItem;
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("business-cart");

cart.addToCart("5968897c-4d27-4872-89f6-5bcb052746d7");
console.log(cart);
console.log(businessCart);

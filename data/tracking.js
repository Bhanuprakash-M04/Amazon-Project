import { products, loadProducts } from "./products.js";
import { orders } from "./orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { calculateCartQuantity } from "./cart.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");
loadProducts(renderEntireTrackingPage);

function renderEntireTrackingPage() {
  renderTrackingHeader();
  renderTrackingPage();
}

function renderTrackingPage() {
  const order = orders.find((eachOrder) => eachOrder.id === orderId);

  const product = order.products.find(
    (eachProduct) => eachProduct.productId === productId
  );

  const originalProduct = products.find((product) => product.id === productId);

  const deliveryDate = product.estimatedDeliveryTime;
  const dateString = dayjs(deliveryDate).format("dddd, MMMM, D");

  let html = `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">${dateString}</div>

        <div class="product-info">
          ${originalProduct.name}
        </div>

        <div class="product-info">Quantity: ${product.quantity}</div>

        <img
          class="product-image"
          src="${originalProduct.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;

  document.querySelector(".js-tracking").innerHTML = html;
}

function renderTrackingHeader() {
  let headerHtml = `
  <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo" src="images/amazon-logo-white.png" />
          <img
            class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png"
          />
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar" type="text" placeholder="Search" />

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png" />
          <div class="cart-quantity">${calculateCartQuantity()}</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
  `;
  document.querySelector(".js-amazon-track-header").innerHTML = headerHtml;
}

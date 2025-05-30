import { cart, saveToStorage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { currencyFormat } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQunatity = 0;
  cart.forEach((cartItem) => {
    cartQunatity += cartItem.quantity;
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
        <div>Items (${cartQunatity}):</div>
        <div class="payment-summary-money">$${currencyFormat(
          productPriceCents
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${currencyFormat(
          shippingPriceCents
        )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${currencyFormat(
          totalBeforeTaxCents
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${currencyFormat(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${currencyFormat(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      if (cart.length !== 0) {
        try {
          const response = await fetch(
            "https://supersimplebackend.dev/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cart: cart,
              }),
            }
          );
          const order = await response.json();
          addOrder(order);
        } catch (error) {
          console.log("unexpected error ! try again later");
        }
        cart.length = 0;
        saveToStorage();
        window.location.href = "orders.html";
      } else {
        alert("No items to order in the cart");
      }
    });
}

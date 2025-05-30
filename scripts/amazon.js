import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts, loadProductsFetch } from "../data/products.js";
import { currencyFormat } from "./utils/money.js";

loadProducts(amazonProductsRender);

function amazonProductsRender() {
  document.querySelector(".js-search-icon").addEventListener("click", () => {
    let val = document.querySelector(".js-search-bar").value;
    if (val) {
      let newProducts = products.filter((eachProduct) => {
        return eachProduct.keywords.some((keyword) => {
          let keywordLower = keyword.toLowerCase();
          let inputLower = val.toLowerCase();
          return (
            keywordLower.includes(inputLower) ||
            inputLower.includes(keywordLower)
          );
        });
      });
      renderProductsGrid(newProducts);
    } else {
      renderProductsGrid(products);
    }
  });

  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        let val = document.querySelector(".js-search-bar").value;
        if (val) {
          let newProducts = products.filter((eachProduct) => {
            return eachProduct.keywords.some((keyword) => {
              let keywordLower = keyword.toLowerCase();
              let inputLower = val.toLowerCase();
              return (
                keywordLower.includes(inputLower) ||
                inputLower.includes(keywordLower)
              );
            });
          });
          renderProductsGrid(newProducts);
        } else {
          renderProductsGrid(products);
        }
      }
    });

  renderProductsGrid(products);
}

function renderProductsGrid(products) {
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
            <div class="product-image-container">
              <img
                class="product-image"
                src="${product.image}"
              />
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img
                class="product-rating-stars"
                src="${product.getStarsURL()}"
              />
              <div class="product-rating-count link-primary">${
                product.rating.count
              }</div>
            </div>

            <div class="product-price">${product.getPrice()}</div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart" data-product-id="${product.id}">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
              product.id
            }">Add to Cart</button>
          </div>`;
  });
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  document.querySelector(
    ".js-cart-quantity"
  ).innerHTML = `${updateCartQuantity()}`;
  function updateCartQuantity() {
    document.querySelector(".js-cart-quantity").innerHTML =
      calculateCartQuantity();
    return calculateCartQuantity();
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();

      const addedMessage = document.querySelector(
        `.added-to-cart[data-product-id="${productId}"]`
      );
      addedMessage.classList.add("visible");
      setTimeout(() => {
        addedMessage.classList.remove("visible");
      }, 1000);
    });
  });
}

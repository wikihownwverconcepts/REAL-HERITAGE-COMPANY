// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
  addEvents();
  updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart, .normal ");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(
    ".product-title, .product-title1"
  ).innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert(
    "Your Order is Placed Successfully, Thanks For Purchasing our Products"
  );
  itemsAdded = [];

  update();
}

function cartDisplay() {
  if (getItems.lenght <= 1) {
    alert("help me help me");
  }
}
// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("₦", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(2);
  // or you can use also
  total = Math.round(total * 100) * 10;

  totalElement.innerHTML = "₦" + total;
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class="fas fa-trash-alt trash cart-remove"></i>
    </div>`;
}

var cartClass = ".cart";

var localAdapter = {
  saveCart: function (object) {
    var stringified = JSON.stringify(object);
    localStorage.setItem(cartClass, stringified);
    return true;
  },
  getCart: function () {
    return JSON.parse(localStorage.getItem(cartClass));
  },
  clearCart: function () {
    localStorage.removeItem(cartClass);
  },
};

var ajaxAdapter = {
  saveCart: function (object) {
    var stringified = JSON.stringify(object);
    // do an ajax request here
  },
  getCart: function () {
    // do an ajax request -- recognize user by cookie / ip / session
    return JSON.parse(data);
  },
  clearCart: function () {
    //do an ajax request here
  },
};

var storage = localAdapter;

var helpers = {
  getHtml: function (id) {
    return document.getElementsByClassName(".cart").innerHTML;
  },
  setHtml: function (id, html) {
    document.getElementsByClassName(".cart").innerHTML = html;
    return true;
  },
  itemData: function (object) {
    var count = object.querySelector(".count"),
      patt = new RegExp("^[1-9]([0-9]+)?$");
    count.value = patt.test(count.value) === true ? parseInt(count.value) : 1;

    var item = {
      name: object.getAttribute("data-name"),
      price: object.getAttribute("data-price"),
      id: object.getAttribute("data-id"),
      count: count.value,
      total:
        parseInt(object.getAttribute("data-price")) * parseInt(count.value),
    };
    return item;
  },
  updateView: function () {
    var items = cart.getItems(),
      template = this.getHtml("cartT"),
      compiled = _.template(template, {
        items: items,
      });
    this.setHtml("cartItems", compiled);
    this.updateTotal();
  },
  emptyView: function () {
    this.setHtml("cartItems", "<p>Nothing to see here</p>");
    this.updateTotal();
  },
  updateTotal: function () {
    this.setHtml("totalPrice", cart.total + "$");
  },
};

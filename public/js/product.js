/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
const colorBtns = document.querySelectorAll(".colorBtn");
const sizeBtns = document.querySelectorAll(".sizeBtn");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const quantitySpan = document.querySelector(".quantity span");
const image = document.querySelector(".product-image img");
const notice = document.querySelector(".notice");
let src = image.getAttribute("src");

const cartcount = document.querySelector(".cart h4");

let count = 1;

// eslint-disable-next-line no-unused-vars
function changeColor(theProduct, colorsArr, hasSize) {
  let indexColor;
  colorBtns.forEach((color) => {
    color.addEventListener("click", (event) => {

      count = 1 ; 
      quantitySpan.innerText = count  ;
      plus.disabled = false ; 
      minus.disabled = false ; 

      
      indexColor = event.target.dataset.value - 1;
      src = "/images/" + theProduct.name + (indexColor +1 ) + ".jpg";
      image.setAttribute("src", src);
      var selected = colorsArr[indexColor].color;
      document.querySelector(".color h3 span").innerHTML = selected;
      if (!hasSize) {
        if (colorsArr[indexColor].quantityLeft == 0) {
          notice.innerText = "Out of stock";
        } else if (colorsArr[indexColor].quantityLeft < 6) {
          notice.innerText =
            "Only " + colorsArr[indexColor].quantityLeft + " left in stock";
        } else {
          notice.innerText = "";
        }
      }
      if (hasSize) {
        let sizeIndex = selectedSize() - 1;

        if (colorsArr[indexColor ].sizes[sizeIndex].quantityLeft == 0) {
          notice.innerText = "Out of stock";
        } else if (colorsArr[indexColor].sizes[sizeIndex].quantityLeft < 6) {
          notice.innerText =
            "Only " +
            colorsArr[indexColor].sizes[sizeIndex].quantityLeft +
            " left in stock";
        } else {
          notice.innerText = "";
        }
      }
    });
  });
}

function changeSize(colorsArr) {
  let indexSize;
  sizeBtns.forEach((size) => {
    size.addEventListener("click", (event) => {

      count = 1 ; 
      quantitySpan.innerText = count  ;
      plus.disabled = false ; 
      minus.disabled = false ; 

      indexSize = event.target.dataset.value - 1;
      let colorIndex = selectedColor() - 1;

      if (colorsArr[colorIndex].sizes[indexSize].quantityLeft == 0) {
        notice.innerText = "Out of stock";
      } else if (colorsArr[colorIndex].sizes[indexSize].quantityLeft < 6) {
        notice.innerText =
          "Only " +
          colorsArr[colorIndex].sizes[indexSize].quantityLeft +
          " left in stock";
      } else {
        notice.innerText = "";
      }
    });
  });
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

plus.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
  let colorIndex = selectedColor() - 1;
  let sizeIndex = selectedSize() - 1;

  if (hasSize) {
    if (colorsArr[colorIndex].sizes[sizeIndex].quantityLeft > count) {
      count += 1;
      quantitySpan.innerText = count;
      minus.disabled = false;
      if (count === colorsArr[colorIndex].sizes[sizeIndex].quantityLeft) {
        plus.disabled = true;
      }
    } else {
      return;
    }
  } else {
    if (colorsArr[colorIndex].quantityLeft >= count) {
      count += 1;
      quantitySpan.innerText = count;
      minus.disabled = false;
    } else {
      return;
    }
  }
});

minus.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
  let colorIndex = selectedColor() - 1;
  let sizeIndex = selectedSize() - 1;

  if (hasSize) {
    if (count !== 0 ) {
      count -= 1;
      quantitySpan.innerText = count;
      plus.disabled = false ; 
      if (count === 1) {
        minus.disabled = true;
      }
    } else {
      return;
    }
  } else {
    if (count !== 0 ) {
      count -= 1;
      quantitySpan.innerText = count;
      if (count === 1) {
        minus.disabled = true;
      }
    } else {
      return;
    }
  }
});

// eslint-disable-next-line no-unused-vars
function addtocart(TheProduct) {
  const userIdValue = getCookie("userId");
  const sizeIndexValue = selectedSize() - 1;
  const colorIndexValue = selectedColor() - 1;
  const quantityValue = Number(quantitySpan.innerText);

  let count = cartcount.innerHTML;
  count++;
  cartcount.innerHTML = count;
  let endpoint = "/product/cartadd";

  fetch(endpoint, {
    method: "post",
    body: JSON.stringify({
      userId: userIdValue,
      cart: {
        product: TheProduct,
        colorIndex: colorIndexValue,
        sizeIndex: sizeIndexValue,
        quantity: quantityValue,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      openPopup(data.message, quantityValue, data.done);
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectedSize() {
  for (var i = 0; i < sizeBtns.length; i++) {
    if (sizeBtns[i].checked) {
      return Number(sizeBtns[i].dataset.value);
    }
  }
}
function selectedColor() {
  for (var i = 0; i < colorBtns.length; i++) {
    if (colorBtns[i].checked) {
      return Number(colorBtns[i].dataset.value);
    }
  }
}

let popup = document.getElementById("popup");
let b = document.querySelector(".popup-container");
let message = document.getElementById("message");
const firstH2 = document.querySelector(".popup-container h2");

function openPopup(messageValue, quantity, done) {
  if (done) {
    const P = document.querySelector("#P span");
    const Q = document.querySelector("#Q span");
    const T = document.querySelector("#T span");
    const popupImage = document.querySelector(".popup img");

    let price = document.querySelector(".product-options p span").innerHTML;
    let total = quantity * price;

    P.innerText = price;
    Q.innerText = quantity;
    T.innerText = total;
    message.innerText = messageValue;
    popupImage.setAttribute("src", src);
  } else {
    document.querySelector("#P").setAttribute("hidden", true);
    document.querySelector("#Q").setAttribute("hidden", true);
    document.querySelector("#T").setAttribute("hidden", true);
    document.querySelector(".popup img").setAttribute("hidden", true);
    firstH2.setAttribute("hidden", true);
    document.querySelector("#cartBtn a").href = "/login";
    document.querySelector("#cartBtn a").innerText = "login";

    message.innerText = messageValue;
  }

  popup.classList.add("open-popup");
  b.classList.add("blur");
  window.scrollTo(0, 0);
}
// eslint-disable-next-line no-unused-vars
function continueShopping() {
  popup.classList.remove("open-popup");
  b.classList.remove("blur");
}

const deleteBtns = document.querySelectorAll(".delete button");

removeItem();

function removeItem() {
  deleteBtns.forEach((button) => {
    let index;
    button.addEventListener("click", (event) => {
    index = Number(event.target.dataset.value) ;  
    let priceValue =  Number(currentUser.cart[index-1].price)  

      let endpoint = "/cart/delete";

      fetch(endpoint, {
        method: "post",
        body: JSON.stringify({
          user: currentUser,
          index: index-1,
          price : priceValue , 

        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.done) {
            alert(data.message);
            div = document.querySelector(".item-" + index);

            var nextElement = div.nextElementSibling;
            nextElement.parentNode.removeChild(nextElement);

            div.parentNode.removeChild(div);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    });
  });
}

// const checkForm = document.getElementById("checkForm") ;
// checkForm.onsubmit =

function checkOut() {
  let endpoint = "/cart/checkout";

  fetch(endpoint, {
    method: "post",
    body: JSON.stringify({
      user: currentUser,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.done) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      // Handle error scenario
    });

  return false;
}

const deleteBtns = document.querySelectorAll('.delete button');

removeItem();

function removeItem(){
    deleteBtns.forEach(button =>{  
    let index;
    button.addEventListener('click', (event)=>{
        index = event.target.dataset.value; 
        div = document.querySelector(('.item-'+index));

        var nextElement = div.nextElementSibling;
        nextElement.parentNode.removeChild(nextElement);

        div.parentNode.removeChild(div);
        console.log(div);
    })
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
          // Checkout successful
          alert("Checkout successful: " + data.message);
          // Do something else if needed
        } else {
          // Insufficient balance to checkout
          alert("Insufficient balance to checkout: " + data.message);
          // Do something else if needed
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        // Handle error scenario
      });
  
    return false;
  }
  
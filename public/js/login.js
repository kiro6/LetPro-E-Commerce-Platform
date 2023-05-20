/* eslint-disable no-unused-vars */
const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

function generateId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

window.onload = () => {
  var input = document.getElementById("ruserId");
  input.setAttribute("value", generateId());
};




var LoginForm = document.querySelectorAll("form")[0];
LoginForm.onsubmit = function doLogin(event) {
  event.preventDefault();

  var usernameValue = document.getElementById("username").value;
  var passwordValue = document.getElementById("password").value;

  var endpoint = "/login";

  fetch(endpoint, {
    method: "post",
    body: JSON.stringify({
      username: usernameValue,
      password: passwordValue,
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
      setSessionCookie("userId", data.userId); 
      if (data.redirect) {
        window.location.href = data.redirect; // Redirect to the specified URL
      }else{
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      // Handle any errors
    });
};




var registerForm = document.querySelectorAll("form")[1];
registerForm.onsubmit = function doRegister(event) {
  event.preventDefault();

  var userId = document.getElementById("ruserId").value;
  var usernameValue = document.getElementById("rusername").value;
  var passwordValue = document.getElementById("rpassword").value;
  var confirmPasswordValue = document.getElementById("confirmPassword").value;
  var emailValue = document.getElementById("remail").value;
  var phoneValue = document.getElementById("rphone").value;
  var addressValue = document.getElementById("raddress").value;

  var endpoint = "/register";


 if (passwordValue === confirmPasswordValue) {
    fetch(endpoint, {
      method: "post",
      body: JSON.stringify({
        userId: userId,
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
        phoneNumber: phoneValue,
        address: addressValue,
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
       alert(data.message) ; 
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("The password and confirm password are not the same");
  }
  return false;
};


function setSessionCookie(name, value) {
  document.cookie = name + "=" + (value || "") + "; path=/";
}




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



  var  loginForm = document.getElementsByClassName("sign-in-form");
  console.log(loginForm)

  


function validateRegister() {
  var name = document.forms["myForm"]["rusername"].value;
  var email = document.forms["myForm"]["remail"].value;
  var password = document.forms["myForm"]["rpassword"].value;
  var confirmPassword = document.forms["myForm"]["confirmPassword"].value;

  if (name == "" || email == "" || password == "" || confirmPassword == "") {
    alert("Please fill out all fields");
    return false; // this is temp action
  }

  if (password != confirmPassword) {
    alert("Passwords do not match");
    document.forms["myForm"]["rpassword"].value="";
    document.forms["myForm"]["confirmPassword"].value="";
    return false; // this is temp action
  }

  alert("Registration successful!");
  document.forms["myForm"]["rusername"].value="";
  document.forms["myForm"]["remail"].value="";
  document.forms["myForm"]["rpassword"].value="";
  document.forms["myForm"]["confirmPassword"].value="";
  return false; // this is temp action
}
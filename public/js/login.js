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
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  
  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  
  return id;
}



window.onload = ()=>{
  var input = document.getElementById("ruserId") ; 
  input.setAttribute("value" , generateId()); 
}


function doRegister() {
  var usernameValue = document.getElementById("rusername").value;
  var passwordValue = document.getElementById("rpassword").value;
  var confirmPasswordValue = document.getElementById("confirmPassword").value;
  var emailValue = document.getElementById("remai").value;
  var phoneValue = document.getElementById("rphone").value;
  var addressValue = document.getElementById("raddress").value;
  var endpoint = "/register";

if (passwordValue === confirmPasswordValue) {
  fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({
      username: usernameValue,
      email : emailValue , 
      phoneNumber: phoneValue , 
      address : addressValue, 
      password: passwordValue
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return false; 
} else {
  window.confirm("the password is not the same ") ; 
}


 
}

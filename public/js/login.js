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



 function validateLogin(){
  var usernameValue = document.getElementById("username").value;
  var passwordValue = document.getElementById("password").value;

  var usernameName = document.getElementById("username").name ; 
  var passwordName = document.getElementById("password").name ; 

  const endpoint = "/login" ; 

  fetch(endpoint , {
    method : 'post' , 
   usernameName : usernameValue , 
   passwordName : passwordValue 
  }).catch((err)=>{
      console.log(err);
    })

    return true

 }
    
    
    
  


function validateRegister() {
  var ruserIdValue = document.getElementById("ruserId").value;
  var rusernameValue = document.getElementById("rusername").value;
  var remailValue = document.getElementById("remail").value;
  var rpasswordValue = document.getElementById("rpassword").value;

  var rusernameName = document.getElementById("rusername").name ; 
  var rpasswordName = document.getElementById("rpassword").name ; 

  const endpoint = "/login" ; 

  fetch(endpoint , {
    method : 'post' , 
   usernameName : rusernameValue , 
   passwordName : rpasswordValue 
  }).catch((err)=>{
      console.log(err);
    })

    return true
}


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
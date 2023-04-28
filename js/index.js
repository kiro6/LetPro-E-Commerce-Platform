const header = document.querySelector("header");

window.addEventListener ("scroll",function(){
    header.classList.toggle("sticky",this.window.scrollY > 0);
})

function openMenu(){
  document.getElementById("menu").style.width = "250px";
}

function closeMenu(){
  document.getElementById("menu").style.width = "0";
}

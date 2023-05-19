const colors = document.querySelectorAll(".colorBtn");
const sizes = document.querySelectorAll(".sizeBtn");
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const quantity = document.querySelector('.quantity span');
const image = document.querySelector('.product-image img');
const product = document.getElementById('product').dataset.variable;
let src = image.getAttribute('src');

const cartcount = document.querySelector('.cart h4');

let count = 1;





plus.addEventListener('click',()=>{
    count +=1;
    quantity.innerHTML = count;
    minus.disabled = false;
});

minus.addEventListener('click',()=>{
    count-=1;
    quantity.innerHTML = count;
    if(count===1){
        minus.disabled = true;
    }
});

function order(){
    const size = selectedSize();
    console.log(size);
    const color = selectedColor();
    console.log(color);
    const Quantity = quantity.innerHTML;
    console.log(Quantity);
    

    //Create post request

    addtocart();
    openPopup(Quantity);
}  

function addtocart(){
    let count = cartcount.innerHTML;
    count++;
    cartcount.innerHTML = count;
}

function selectedSize(){
    for(var i = 0 ; i < sizes.length ; i++){
        if(sizes[i].checked){
            return sizes[i].id;
        }
    }
}
function selectedColor(){
    for(var i = 0 ; i < sizes.length ; i++){
        if(colors[i].checked){
            return colors[i].id;
        }
    }
}


let popup=document.getElementById("popup");
let b =document.querySelector('.popup-container');

const P = document.querySelector('#P span');
const Q = document.querySelector('#Q span');
const T = document.querySelector('#T span');
const popupImage = document.querySelector('.popup img');

function openPopup(quantity){
    let price = document.querySelector('.product-options p span').innerHTML;
    let total = quantity * price;

    P.innerHTML = price;
    Q.innerHTML = quantity;
    T.innerHTML = total;
    popupImage.setAttribute('src',src);

    popup.classList.add("open-popup");
    b.classList.add('blur');
    window.scrollTo(0,0);
}
function continueShopping(){
    popup.classList.remove("open-popup");
    b.classList.remove('blur');
}
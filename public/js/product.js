const colorBtns = document.querySelectorAll(".colorBtn");
const sizeBtns = document.querySelectorAll(".sizeBtn");
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const quantity = document.querySelector('.quantity span');
const image = document.querySelector('.product-image img');
let src = image.getAttribute('src');

const cartcount = document.querySelector('.cart h4');

let count = 1;




// eslint-disable-next-line no-unused-vars
function changeColor(theProduct ,colorsArr) {
    let index ; 
    colorBtns.forEach((color) => {
        color.addEventListener('click', (event)=>{
        index = event.target.dataset.value;            
        src = '/images/'+theProduct.name +index+'.jpg';
        image.setAttribute('src',src);
        for (let i = 0; i < 5; i++) {
            var label =document.getElementById('label '+colorsArr[index - 1].sizeBtns[i].size ) ;
            label.innerText =  colorsArr[index -1].sizeBtns[i].quantityLeft ; 
            
        }
        });
    });

}




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

// eslint-disable-next-line no-unused-vars
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
    for(var i = 0 ; i < sizeBtns.length ; i++){
        if(sizeBtns[i].checked){
            return sizeBtns[i].id;
        }
    }
}
function selectedColor(){
    for(var i = 0 ; i < sizeBtns.length ; i++){
        if(colorBtns[i].checked){
            return colorBtns[i].id;
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
// eslint-disable-next-line no-unused-vars
function continueShopping(){
    popup.classList.remove("open-popup");
    b.classList.remove('blur');
}
const colors = document.querySelectorAll(".colorBtn");
const sizes = document.querySelectorAll(".sizeBtn");
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const quantity = document.querySelector('.quantity span');
const image = document.querySelector('.product-image img');
let count = 1;


colors.forEach((color) => {
    color.addEventListener('click', colorSelected);
});


function colorSelected(){
    let index = this.dataset.value;
    // console.log(index);
    
    let src = image.getAttribute('src');
    src = 'images/f'+index+'.jpg';
    image.setAttribute('src',src);
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

function order(){
    const size = selectedSize();
    console.log(size);
    const color = selectedColor();
    console.log(color);
    const Quantity = quantity.innerHTML;
    console.log(Quantity);
    

    //Create post request


    openPopup();
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
function openPopup(){
    popup.classList.add("open-popup");
    b.classList.add('blur');
    window.scrollTo(0,0);
}
function continueShopping(){
    popup.classList.remove("open-popup");
    b.classList.remove('blur');
}
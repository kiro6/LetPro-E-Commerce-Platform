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

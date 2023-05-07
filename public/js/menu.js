function openMenu(){
    document.getElementById("menu").style.width = "250px";
}

function closeMenu(){
    document.getElementById("menu").style.width = "0";
}





const body = document.querySelector('body');
const btn = document.querySelector('.color-btn');
const icon = document.querySelector('.color-btn-switch');



function store(value){
    localStorage.setItem('darkmode',value);
}

function load(){
    const darkmode = localStorage.getItem('darkmode');

    if(!darkmode){//if darkmode is never activated or deactivated
        store(false);
        icon.classList.add('bxs-sun');
    }
    else if(darkmode == 'true'){//if darkmode is activated
        body.classList.add('darkmode');
        icon.classList.add('bxs-moon');
    }
    else if(darkmode == 'false'){//if darkmode is deactivated
        icon.classList.add('bxs-sun');
    }
}

load();

btn.addEventListener('click',() => {

    body.classList.toggle('darkmode');
    icon.classList.add('animated');

    store(body.classList.contains('darkmode'));

    if(body.classList.contains('darkmode')){
        icon.classList.remove('bxs-sun');
        icon.classList.add('bxs-moon');
    }
    else{
        icon.classList.remove('bxs-moon');
        icon.classList.add('bxs-sun');
    }

    setTimeout(() =>{
        icon.classList.remove('animated');
    },500)
})
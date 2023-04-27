function openMenu(){
    document.getElementById("menu").style.width = "250px";
}
  
function closeMenu(){
    document.getElementById("menu").style.width = "0";
}

function changeInfo(){
  setTimeout(function(){
      const inputs = document.querySelectorAll('.ii')

        for (var i = 0; i < inputs.length; i++) {
          inputs[i].style.background = 'white';
          inputs[i].style.outline = 'black';
          inputs[i].style.border = '1px solid black';
          inputs[i].disabled = false;
        }
      const changeBtn = document.querySelector('.change-btn')
      changeBtn.style.visibility = 'hidden';
      const confirmBtn = document.querySelector('.confirm')
      confirmBtn.style.visibility = 'visible';

  },200)
  
}

function personalInfo(){
  const info = document.querySelector('.info');
  info.style.visibility = 'visible';

  const orders = document.querySelector('.orders');
  orders.style.visibility = 'hidden';

  const cp = document.querySelector('.changepass');
  cp.style.visibility = 'hidden';

  const selected = document.querySelector('#PI');
  selected.style.color = '#1152ad';
  const op2 = document.querySelector('#MO');
  op2.style.color = '#8b8989';
  const op3 = document.querySelector('#CP');
  op3.style.color = '#8b8989';
}

function myOrders(){
  const info = document.querySelector('.info');
  info.style.visibility = 'hidden';

  const orders = document.querySelector('.orders');
  orders.style.visibility = 'visible';

  const cp = document.querySelector('.changepass');
  cp.style.visibility = 'hidden';

  const selected = document.querySelector('#MO');
  selected.style.color = '#1152ad';
  const op2 = document.querySelector('#PI');
  op2.style.color = '#8b8989';
  const op3 = document.querySelector('#CP');
  op3.style.color = '#8b8989';
}

function changePass(){
  const info = document.querySelector('.info');
  info.style.visibility = 'hidden';

  const orders = document.querySelector('.orders');
  orders.style.visibility = 'hidden';

  const cp = document.querySelector('.changepass');
  cp.style.visibility = 'visible';

  const selected = document.querySelector('#CP');
  selected.style.color = '#1152ad';
  const op2 = document.querySelector('#PI');
  op2.style.color = '#8b8989';
  const op3 = document.querySelector('#MO');
  op3.style.color = '#8b8989';
}
function logOut(){
  return confirm('Are you sure you want to log out?')
}
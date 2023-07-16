let logo = document.getElementById('logo');
let text = document.getElementById('text');
let gateleft = document.getElementById('gate-left');
let gateright = document.getElementById('gate-right');

window.addEventListener('scroll', () =>{
    let value = window.scrollY;
    logo.style.marginTop = value * 1.5 + 'px';
    gateleft.style.left = value * -0.5 + 'px';
    gateright.style.left = value * 0.5 + 'px';

})

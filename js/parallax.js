let logo = document.getElementById('logo');
let text = document.getElementById('text');
let gateleft = document.getElementById('cactus-left');
let gateright = document.getElementById('cactus-right');

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    logo.style.marginTop = value * 1.634 + 'px';
    gateleft.style.left = value * -0.5 + 'px';
    gateright.style.left = value * 0.5 + 'px';

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        window.location.href = 'level1.html';
    }

});

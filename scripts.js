const text = document.getElementById('text')
const desert = document.getElementById('desert')

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    
    text.style.marginTop = value * 2.5 + 'px';
})
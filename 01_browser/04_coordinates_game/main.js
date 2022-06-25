const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

window.addEventListener('mousemove', (event)=>{
    // console.log(event.clientX, event.clientY);
    const x = event.clientX;
    const y = event.clientY;
    tag.innerHTML =`${x}, ${y} `;
    
    vertical.style.left = `${x}px`;
    horizontal.style.top = `${y}px`;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    tag.style.left = `${x}px`;
    tag.style.top = `${y}px`;

})
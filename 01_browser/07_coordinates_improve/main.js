const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

addEventListener('load', ()=>{  //윈도우 load 가 다 끝난뒤에

    const targetRect = target.getBoundingClientRect();
    const targetHalfWidth = targetRect.width / 2;
    const targetHalfHeight = targetRect.height / 2;

    window.addEventListener('mousemove', (event)=>{
        // console.log(event.clientX, event.clientY);
        const x = event.clientX;
        const y = event.clientY;
        tag.innerHTML =`${x}, ${y} `;  
        
        // left, top는 Layout, painter, composite 세가지 모두 발생하여 성능이 저하된다.
    
        vertical.style.transform = `translateX(${x}px)`;
        horizontal.style.transform = `translateY(${y}px)`;
    
        target.style.transform = `translate(${x-targetHalfWidth}px, ${y-targetHalfHeight}px)`;
        tag.style.transform = `translate(${x}px, ${y}px)`;

    })

})


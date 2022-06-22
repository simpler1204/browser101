
const tag = document.querySelector('.tag');

window.addEventListener('resize', showTag)


function showTag(){
    tag.innerHTML = `
        window screen : ${window.screen.width} x ${window.screen.height} <br/>
        window outer : ${window.outerWidth} x ${window.outerHeight}<br/>
        window inner : ${window.innerWidth} x ${window.innerHeight}<br/>
        window inner : ${document.documentElement.clientWidth} x ${document.documentElement.clientHeight}
    `;
}

showTag()
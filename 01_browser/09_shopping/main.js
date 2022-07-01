'use strict'

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input')
const newForm = document.querySelector('.new-form');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
    //1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if(text === ''){
        input.focus();
        return;
    }
    
    //2. 받아온 텍스트를 이용해서 새로운 아이템을 만듬(텍스트 + 삭제버튼)
    const item = createItem(text);
    
    //3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);

    //4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({block:'center'});

    //5. input를 초기화 하고 포커스를 둔다.
    input.value = '';
    input.focus();
}

newForm.addEventListener('submit', event=>{
    event.preventDefault(); //submit 이벤트는 자동으로 페이지를 이동하기 때문에 막는다
    onAdd();
})

let id = 0;
function createItem(text){
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', id);
    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fa-solid fa-trash-can" data-id = ${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>
    `;
    id++;    


    // const item = document.createElement('div');
    // item.setAttribute('class', 'item');

    // const name = document.createElement('span');
    // name.setAttribute('class', 'item__name');
    // name.innerHTML = text;

    // const button = document.createElement('button');
    // button.setAttribute('class', 'item__delete');
    // button.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    // button.addEventListener('click', ()=>{
    // items.removeChild(itemRow);
    // })

    // const itemDivider = document.createElement('div');
    // itemDivider.setAttribute('class', 'item__divider');

    // item.appendChild(name);
    // item.appendChild(button);

    // itemRow.appendChild(item);
    // itemRow.appendChild(itemDivider);

    return itemRow;


}

addBtn.addEventListener('click', ()=>{
    onAdd();
})

input.addEventListener('keydown', event=>{
    if(event.key === 'Enter'){
        onAdd();
    }
})

items.addEventListener('click', event=>{
    const dataId = event.target.dataset.id;
    if(dataId){
        const toBeDeleted = document.querySelector(`.item__row[data-id='${dataId}'`);
        toBeDeleted.remove();
    }
});

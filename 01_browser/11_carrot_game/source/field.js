'use strict'
import * as sound from './sound.js';

const carrotSound = new Audio('sound/carrot_pull.mp3');
const CARROT_SIZE = 80;

export default class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        
        
        // 
        // this.onClick를 넘기면 this정보가 전달되지 않는다.(콜백함수로 넘기면..)
        // 해서 this 바인딩을 해줘야 함

        /* 
            첫번째 방법(일일이 해줘야 해서 잘 사용 안함)
            this.onClick = this.onClick.bind(this);
            this.field.addEventListener('click', this.onClick);
        */

        // 두번째 방범( Arrow 펑션으로 event를 넘겨준다)
        //this.field.addEventListener('click', (event)=>this.onClick(event));

        // 세번째 방법
        this.field.addEventListener('click', this.onClick);
        //onClick 함수를 변경함..onClick함수 참조
       
        
    }
    init(){
        this.field.innerText = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png')
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }
   
    _addItem(className, count, imgPath){

        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
    
        for(let i = 0; i<count; i++){
            
            const item = document.createElement('img');
            item.setAttribute('src', imgPath);
            item.setAttribute('class', className);
            item.style.position = 'absolute';
            const x = getRandomNumber(x1, x2);
            const y = getRandomNumber(y1, y2);         
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            
            this.field.appendChild(item);
        }
    }

   /* this바인딩 첫번째 두번째 방법일때 
   onClick(event){
        const target = event.target;
        if(target.matches('.carrot')){
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        }else if(target.matches('.bug')){  
            this.onItemClick && this.onItemClick('bug');     
    }
    }
    */

    // this 바인딩 세번째 방법일때
    onClick = event =>{
        const target = event.target;
        if(target.matches('.carrot')){
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        }else if(target.matches('.bug')){  
            this.onItemClick && this.onItemClick('bug');     
    }
    }

}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
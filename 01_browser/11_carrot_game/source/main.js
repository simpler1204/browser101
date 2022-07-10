'use strict'
import popUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';


const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;


const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');



const sunyeop = document.querySelector('.sunyeop');


let started = false;
let score = 0;
let timer = undefined


const gameFinishBanner = new popUp();
// gameFinishBanner.setClickListener(()=>{
//     startGame();
// })
gameFinishBanner.setClickListener(startGame)



const gameFiled = new Field(CARROT_COUNT, BUG_COUNT);
gameFiled.setClickListener(onItemClick);

function onItemClick(item){   
    if(!started){
        return;
    }
    if(item === 'carrot'){ 
        score++;       
        updateScoreBorad();
        if(score === CARROT_COUNT){
            finishGame(true)
        }
    }else if(item === 'bug'){
        stopGameTimer();
        finishGame(false);
    }
}

//field.addEventListener('click', (event)=>onFieledClick(event));
// field.addEventListener('click', onFieledClick); //위와 동일함

gameBtn.addEventListener('click', ()=>{
   if(started){
    stopGame();
   }else{
    startGame();
   }  
})



function startGame(){
    started = true;    
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
}

function stopGame(){
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY?')
    
    sound.playAlert();
    sound.stopBackground()
}

function finishGame(win){
    started = false;    
    hideGameButton();
    stopGame();
    if(win){
        sunyeop.classList.remove('sunyeop__hide');
        sound.playWin()     
    }else{
        sunyeop.classList.add('sunyeop__hide');
        sound.playBug();
    }
    gameFinishBanner.showWithText(win? 'YOU WON' : 'YOU LOST');  
}

function showStopButton(){
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton(){
    gameBtn.style.visibility = 'hidden';
}

function startGameTimer(){
    let remainTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainTimeSec);
    timer = setInterval(() => {
        if(remainTimeSec <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainTimeSec);
    }, 1000);
}

function stopGameTimer(){
    clearInterval(timer);
}



function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}



function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}


function initGame(){
    score = 0;
    // field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    // 벌레와 당근을 생성한뒤 field에 추가해줌
    // console.log(fieldRect);
    gameFiled.init();

}





function updateScoreBorad(){
    gameScore.innerText = CARROT_COUNT - score;
}


  



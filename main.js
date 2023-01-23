const playSection = document.querySelector('.play-section');
const playButton = document.querySelector('.play');
const informationButton = document.querySelector('.information');
const informationSection = document.querySelector('.information-section');
const difficultySection = document.querySelector('.difficulty-section');
const gameSection = document.querySelector('.game');
const gameTitle = document.querySelector('.game h2');
const containerButton = document.querySelector('.containerButton');
const difficultyBtns = document.getElementsByClassName('difficultyBtn');
const score = document.querySelector('.score');
const timerSelector = document.querySelector('.timer');
const playAgainBtn = document.querySelector('.playAgain');
const backBtn = document.querySelector('.back');
let btnGoods = document.getElementsByClassName('button-good');
let buttonGenerate = 0;
let levelDifficultyNumber = 0;
let currentLevelNumber = 2;
let currentScore = 0;
let scoreLevel = 0;
let randomNumber = 0;
let timerConfiguration;
let scoreTrigger = 0;

const timer = function (minute, seconde) {
    timerConfiguration = setInterval(function () {
        seconde--;
        if (seconde === 0 && minute === 0) {
            clearInterval(timerConfiguration);
            gameOver();
        }
        if (seconde === 0 && minute > 0) {
            minute--;
            seconde = 60;
        }
        if (seconde < 10) {
            return timerSelector.textContent = `Timer : 0${minute}:0${seconde}`;
        } else {
            return timerSelector.textContent = `Timer : 0${minute}:${seconde}`;
        }
    }, 1000);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // Le maximum n'est pas inclus mais le min est inclu
}

playButton.addEventListener('click', (e)=>{
    difficultySection.classList.remove('hidden');
    playSection.classList.add('hidden');
});

informationButton.addEventListener('click', (e)=>{
    informationSection.classList.remove('hidden');
    playSection.classList.add('hidden');
});

for (const difficultyBtn of difficultyBtns) {
    difficultyBtn.addEventListener('click', (e)=>{
        score.textContent = 'Score : 0';
        levelDifficultyNumber = parseInt(e.currentTarget.dataset.number);
        buttonGenerate = levelDifficultyNumber;
        timer(0,30);
        difficultySection.classList.add('hidden');
        gameSection.classList.remove('hidden');
        generateGameButtons(e.currentTarget.dataset.number);
    });
}
const setGoodButton = function(){
    for (const btnGood of btnGoods) {
        btnGood.addEventListener('click', (e)=>{
            if (!btnGood.classList.contains('trapBtn') && !btnGood.classList.contains('good')){
                e.currentTarget.classList.add('good');
                currentScore ++;
                scoreLevel ++;
                updateScore();
            } else if(btnGood.classList.contains('trapBtn')){
                gameOver();
            }
            verifNextLevel();
        });
    }
}

const setTrapButton = function(index){
    console.log(index);
    btnGoods[index].addEventListener('click', (e)=>{
        btnGoods[index].classList.add('trapBtn');
        btnGoods[index].classList.remove('button-good');
    });
}
const gameOver = function (){
    clearInterval(timerConfiguration);
    timerSelector.textContent = 'Timer : 00:00';
    gameTitle.innerHTML = "GAME OVER";
    containerButton.innerHTML ="";
    playAgainBtn.classList.remove('hidden');
    currentScore = 0;
};


const generateGameButtons = function (number){
    scoreTrigger = number-1;
    console.log(scoreTrigger)
    for (let i = 1; i <= number; i++) {
        containerButton.insertAdjacentHTML('beforeend', `<input type="button" value="Option ${i}" class="button-good">`);
    }
    btnGoods = document.getElementsByClassName('button-good');
    randomNumber = getRandomIntInclusive (0, btnGoods.length-1);
    setTrapButton(randomNumber);
    setGoodButton();
}
const updateScore = function(){
    score.textContent = `Score : ${currentScore}`
}
const verifNextLevel = function(){
    if(scoreLevel === (scoreTrigger)){
        if(buttonGenerate >= levelDifficultyNumber){
            clearInterval(timerConfiguration);
            buttonGenerate = buttonGenerate * 2;
        }else{
            clearInterval(timerConfiguration);
            buttonGenerate = levelDifficultyNumber * 2;
        }
        console.log( "Button generate" +" " + buttonGenerate)
        scoreLevel = 0;
        containerButton.innerHTML ="";
        gameTitle.innerHTML = `Level : <span>${currentLevelNumber++}</span>`;
        generateGameButtons(buttonGenerate);
    }
}

const resetGame = function(){
    clearInterval(timerConfiguration);
    currentScore = 0;
    scoreLevel = 0;
    containerButton.innerHTML ="";
    gameSection.classList.add('hidden');
    playSection.classList.remove('hidden');
    playAgainBtn.classList.add('hidden');
}

playAgainBtn.addEventListener('click', (e)=>{
    resetGame();
});

backBtn.addEventListener('click', (e)=>{
    informationSection.classList.add('hidden');
    playSection.classList.remove('hidden');
});
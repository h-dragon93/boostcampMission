
let faultCount : number = 0;
let currentTry : number = 10;
let balls : number [] = [];

let body : HTMLElement = document.body;
let form : HTMLFormElement = document.createElement('form');

let numberInput : HTMLInputElement= document.createElement('input');
numberInput.maxLength = 4;

let submitButton : HTMLButtonElement = document.createElement('button');
submitButton.textContent = '카운트';

const questionHeader : HTMLElement = document.createElement('h1');
let resultDiv : HTMLDivElement = document.createElement('div');

questionHeader.textContent = String("시도 횟수: "+currentTry);
body.insertAdjacentElement("afterbegin", form);
body.insertAdjacentElement("afterbegin", questionHeader)
form.insertAdjacentElement("afterbegin", submitButton);
form.insertAdjacentElement("afterbegin", numberInput);
form.insertAdjacentElement("afterend", resultDiv);

class GameResult {
    constructor(public strike, public ball) {
    }

    display() {
        resultDiv.textContent = `${this.strike} 스트라이크  ${this.ball} 볼 입니다.`;
    }

}

function matchBallCount(answer) {
    resultDiv.textContent = '볼';

    let resultPattern = answer.split('').map( item => {
        return parseInt(item, 10);
    });

    var strike = 0;
    var ball = 0;
    [0,1,2].forEach( index => {
        if (balls[index] === resultPattern[index]){
            strike += 1;
        } else if (balls.indexOf(resultPattern[index]) > -1){
            ball += 1;
        }
    });

    const result = new GameResult(strike, ball);
    result.display();
}

class Baseball {
    constructor(public answer) {
    }

    run() {
        if(this.answer === balls.join('')){
            resultDiv.textContent = '홈런입니다!';
            makeNewGame();
        } else {
            faultCount++;
            if(faultCount > 10){
                resultDiv.textContent = `기회는 총 10번입니다. 답은 ${balls} 입니다.`
                makeNewGame();
            } else {
                matchBallCount(this.answer);
                numberInput.value = '';
                numberInput.focus();
                currentTry--;
                questionHeader.textContent = String("시도 횟수: "+currentTry);
            }
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let answer : string = numberInput.value;

    const game = new Baseball(answer);
    game.run();
});

function makeNewGame(){
    faultCount = 0;
    currentTry = 10;

    let numberCandidate : number[] = [1,2,3,4,5,6,7,8,9];
    
    balls = [1,2,3].map( index => {
        return numberCandidate.splice(Math.floor(Math.random() * (9 - index)), 1)[0];
    });
    numberInput.value = '';
    numberInput.focus();
}

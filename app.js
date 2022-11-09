/*
TO DO LIST
- feature: add media query for mobile
- feature: when inputing wrong value, play beep sound. Dont show message. Other visual cue?
- feature: start screen/reset screen. add ways to start: enter, input "yes", "y", "YES", "Y"
- feature: "AI" improvement - ((max-min)/2) * fuzzy != previous guess
- Bug: when demon win, print other "round" message
- Bug: Description of max number doesn't match maxNumber setting
- clean-up: splitta upp pickMinMax() i två funktioner
- clean-up: pickMinMax() - implementera map-reduce
*/

// Game settings
const maxNumber = 100; //set max range of numbers from 0 to maxNumber
const maxGuesses = 5; //set max number of guesses  

// Game
let guessHistoryPlayer = [0];
let guessHistoryBot = [0];
let currentNumGuess = -1;
let answer = randomNumber(0, maxNumber);
let botGuess = 0;
let guessBtn = document.querySelector('#SubmitGuess');
let guessInput = document.querySelector('#InputGuess');
guessInput.setAttribute('maxlength', String(maxNumber).length); //bug
guessInput.value = "";

function splashScreen() {
    outputLine('Start game? <button id="StartBtn">[Yes]</button>');
    document.querySelector('#StartBtn').addEventListener('click', startGameScreen);

    
    function startGameScreen() {
        let gameScreen = document.querySelector('#HiddenContentGameStart').innerHTML;
        outputLine(gameScreen);
        document.querySelector('audio').play();
    }
} 

splashScreen();

function resetButton() {
    outputLine('Reset game? <button id="ResetBtn">[Yes]</button>');
    document.querySelector('#ResetBtn').addEventListener('click', resetGame);
}

function resetGame() {
    guessInput.value = ""; //empty textbox

    //empty #OutputLines element
    let element = document.querySelector('#OutputLines');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
      }

    //reset values
    guessHistoryPlayer = [0];
    guessHistoryBot = [0];
    currentNumGuess = -1;
    botGuess = 0;
    answer = randomNumber(0, maxNumber);

    document.querySelector('audio').pause();

    splashScreen();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function numberCompare(a, b) {
    // a = answer, b = guess 
    if (a == b) return true;
    else if (a < b) return "high"; 
    else return "low";
}

function endGame(value) {
    if (value == true) {
        let defeated = document.querySelector('#HiddenContentDefeated').innerHTML;
        outputLine(defeated);
        resetButton();
    } else {
        let lost = document.querySelector('#HiddenContentLost').innerHTML;
        outputLine(lost);
        outputLine(`You lost! Correct number is ${answer}`);
        resetButton();
    }
}

function inputValidation(input) {
    try {
        if (String(input) == "") throw "";
        if (input.length > 2) throw ""; 
        if (parseFloat(input) != input) throw "";
        if (input > maxNumber) throw "";
    }
    catch(err) {
        outputLine('Not allowed' + err);
        return false;
    }   
}

function outputLine(input) {
    document.querySelector('#OutputLines').insertAdjacentHTML("beforeend", `<p>${input}</p>`);
}

function pickMinMax(array1, array2, mode) {
    //picks min value of "high" and max value of "low"
    //array1 is first player
    let bothArrays = [];
//    if (array2.length == 0) {
//        bothArrays = array1;
//    } else {
        bothArrays = array1.concat(array2);
//    }

    if (mode == 'high') {
        let bothArraysFilter = bothArrays.filter(bothArrays => bothArrays.includes('high'));
        let selected = [];
            for (i = 0; i < bothArraysFilter.length; i++) {
                selected.push(bothArraysFilter[i][1]);
            }
            if (selected != 0) {return Math.min(...selected);
            } else {return maxNumber}
    }
    if (mode == 'low') {
        let bothArraysFilter = bothArrays.filter(bothArrays => bothArrays.includes('low'));
        let selected = [];
            for (i = 0; i < bothArraysFilter.length; i++) {
                selected.push(bothArraysFilter[i][1]);
            }
            if (selected != 0) {return Math.max(...selected);
            } else {return 0}
    }
    return 0;
}

function mainGame() {
    function outputRound() {
        outputLine("ROUND " + (guessHistoryPlayer[currentNumGuess][0] + 1) + ":");
        outputLine("YOU: " + guessHistoryPlayer[currentNumGuess][1] + ", too " + guessHistoryPlayer[currentNumGuess][2] + "! DEMON: " + guessHistoryBot[currentNumGuess][1] + ", too " + guessHistoryBot[currentNumGuess][2] + "!");
    }

    //player
    let guess = parseFloat(document.querySelector('#InputGuess').value);
    if (inputValidation(guess) == false) {return;}
    currentNumGuess += 1;
    let compare = numberCompare(answer, guess);
    guessHistoryPlayer[(currentNumGuess)] = [currentNumGuess, guess, compare];
    if (compare == true) return endGame(true);

   
    //bot
     if (guessHistoryBot == 0) {
         botGuess = randomNumber(pickMinMax(guessHistoryPlayer, [[], [], []], 'low'), maxNumber);
     } else {
        botGuess = randomNumber(pickMinMax(guessHistoryPlayer, guessHistoryBot, 'low'), pickMinMax(guessHistoryPlayer, guessHistoryBot, "high"))
     }

    let botCompare = numberCompare(answer, botGuess);
    guessHistoryBot[(currentNumGuess)] = [currentNumGuess, botGuess, botCompare];
    if (botCompare == true) return outputRound(), endGame(false);

    outputRound();

    guessInput.value = "";
    if (currentNumGuess >= maxGuesses-1) return endGame(false);
}

console.log(answer)

guessBtn.addEventListener('click', mainGame);
guessInput.addEventListener('keydown', function(event) {if (event.keyCode == 13){mainGame();}});


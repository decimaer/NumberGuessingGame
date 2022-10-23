/*
FUNCTIONALITY TO ADD
- submit pressing enter key
- addfunction to reset game
- add bot player
- game music
*/

// Game settings
const maxNumber = 100; //set max range of numbers from 0 to maxNumber
const maxGuesses = 5; //set max number of guesses  

// Game
let guessHistory = [];
let currentNumGuess = 0;
let guessBtn = document.querySelector('#SubmitGuess');
let guessInput = document.querySelector('#InputGuess');
guessInput.setAttribute('maxlength', String(maxNumber).length); //bug

console.log(guessHistory);

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let answer = randomNumber(0, maxNumber);
console.log(answer)

function numberCompare(a, b) {
    // a = answer, b = guess 
    if (a == b) return true;
    else if (a < b) return "high"; 
    else return "low";
}

function endGame(x) {
    if (x == true) {
        outputLine('You won!')
    } else if (x == false) {
        outputLine(`You lost! Correct answer is ${answer}`);
    } else {
        outputLine('Unexpected error! Restart game!');
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



function mainGame() {
    currentNumGuess += 1;

    let guess = parseFloat(document.querySelector('#InputGuess').value);
    if (inputValidation(guess) == false) {guessInput.value = ""; return;}

    let compare = numberCompare(answer, guess);
    if (compare == true) return endGame(true);
    
    guessHistory[(currentNumGuess-1)] = [currentNumGuess, guess, compare];

    outputLine(guessHistory[currentNumGuess-1]);
    guessInput.value = "";
    if (currentNumGuess >= maxGuesses) return endGame(false);
}



guessBtn.addEventListener('click', mainGame);

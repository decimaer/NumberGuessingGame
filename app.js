/*
FUNCTIONALITY TO ADD
- submit pressing enter key
- addfunction to reset game
- game music
*/

// Game settings
const maxNumber = 100; //set max range of numbers from 0 to maxNumber
const maxGuesses = 5; //set max number of guesses  

// Game
let guessHistoryPlayer = [0];
let guessHistoryBot = [0];
let currentNumGuess = -1;
let botGuess = 0;
let guessBtn = document.querySelector('#SubmitGuess');
let guessInput = document.querySelector('#InputGuess');
guessInput.setAttribute('maxlength', String(maxNumber).length); //bug
guessInput.value = "";


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
        outputLine('\"Aaaargh! You defeated me!\"')
    } else {
        outputLine(`You lost! Correct answer is ${answer}`);
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
    if (mode == 'high') {
        let highTable = [];
            for (i = 0; i < array1.length; i++) {
                if (array1[i].includes("high") == true) {highTable.push(array1[i][1]);}
                else break;
            }
            for (i = 0; i < array2.length; i++) {
                if (array2[i].includes("high") == true) {highTable.push(array2[i][1]);}
                else break;
            }
        if (highTable != 0) {return Math.min(...highTable)}
        else return maxNumber;
    }

    if (mode == 'low') {
        let lowTable = [];
            for (i = 0; i < array1.length; i++) {
                if (array1[i].includes('low') == true) {lowTable.push(array1[i][1]);}
                else break;
            }
            for (i = 0; i < array2.length; i++) {
                if (array2[i].includes('low') == true) {lowTable.push(array2[i][1]);}
                else break;
            }
        if (lowTable != 0) {return Math.max(...lowTable)}
    }
    return 0;
}

function mainGame() {
    currentNumGuess += 1;

    function outputRound() {
        outputLine("Round " + (guessHistoryPlayer[currentNumGuess][0] + 1) + ": " + guessHistoryPlayer[currentNumGuess][1] + " " + guessHistoryPlayer[currentNumGuess][2] + " " + guessHistoryBot[currentNumGuess][1] + " " + guessHistoryBot[currentNumGuess][2]);
    }

    //player
    let guess = parseFloat(document.querySelector('#InputGuess').value);
    if (inputValidation(guess) == false) {guessInput.value = ""; return;}
    let compare = numberCompare(answer, guess);
    guessHistoryPlayer[(currentNumGuess)] = [currentNumGuess, guess, compare];
    if (compare == true) return endGame(true);

   
    //bot
     if (guessHistoryBot == 0) {
         botGuess = randomNumber(pickMinMax(guessHistoryPlayer, [[0, 0, 0]], 'low'), maxNumber);
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

let answer = randomNumber(0, maxNumber);
console.log(answer)


guessBtn.addEventListener('click', mainGame);

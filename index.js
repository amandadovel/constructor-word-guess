// Require inquirer and word 
const Word = require("./word");
const inquirer = require("inquirer");

// Create wordBank
const wordBank = [
    "cupcake", "cookie", "brownie",
    "chocolate", "ice cream", "muffins"
];
//console.log(wordBank);

// global variables 
let guesses;
let pickedWords;
let word;
let pickedWord;

// function to initialize game 
function init() {
    pickedWords = [];
    console.log("Hello Welcome to 'Sweet Tooth' Word Guess Game!");
    console.log("-----------------------------------------------");
    playGame();
}

// play game function
function playGame() {
    pickedWord = "";
    guesses = 15;
    if (pickedWords.length < wordBank.length) {
        pickedWord = getWord();
    } else {
        // Win condition
        console.log("\n-----------------\n");
        console.log("Congrats you win!");
        console.log("\n-----------------\n");
        continuePrompt();
    }
    if (pickedWord) {
        word = new Word(pickedWord);
        word.makeLetters();
        makeGuess();
    }
}

// Get word by randomly selecting from wordBank using math.random
function getWord() {
    let rand = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[rand];
    if (pickedWords.indexOf(randomWord) === -1) {
        pickedWords.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
}

// make guess function that checkers letters against letters in word
function makeGuess() {
    let checker = [];
    inquirer.prompt([
        {
            name: "guessedLetter",
            message: word.update() +
                "\n Guess a letter!" +
                "\n Guesses left: " + guesses
        }
    ])
        .then(data => {
            word.letters.forEach(letter => {
                letter.checkLetter(data.guessedLetter);
                checker.push(letter.renderLetter());
                console.log(checker);
            });
            if (guesses > 0 && checker.indexOf("_") !== -1) {
                guesses--;
                if (guesses === 0) {
                    console.log("\n------------------------------\n");
                    console.log("Sorry, no more guesses! Game Over!");
                    console.log("\n------------------------------\n");

                    continuePrompt();
                } else {
                    makeGuess();
                }
            } else {
                console.log("\n---------------------------\n");
                console.log("Congrats! You guessed the word!");
                console.log("\n---------------------------\n");
                console.log(word.update());
                playGame();
            }
        });
}
// continue prompt function to play again 
function continuePrompt() {
    inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            message: "Would you like to play again?"
        }
    ])
        .then(data => {
            if (data.continue) {
                init();
            } else {
                return console.log("***Thanks for playing!***");
            }
        });
}


init();

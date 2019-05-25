// Require inquirer and word 
const Word = require("./word");
const inquirer = require("inquirer");
const colors = require("colors");


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
    console.log("\n-----------------------------------------------\n".rainbow);
    console.log("\nHello Welcome to 'Sweet Tooth' Word Guess Game!\n".cyan);
    console.log("\n-----------------------------------------------\n".rainbow);
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
        console.log("\n-----------------\n".rainbow);
        console.log("\nCongrats you win!\n".magenta);
        console.log("\n-----------------\n".rainbow);
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
                "\n Guess a letter!\n".blue +
                "\n Guesses left: ".green + guesses
        }
    ])
        .then(data => {
            word.letters.forEach(letter => {
                checker.push(letter.checkLetter(data.guessedLetter));
                checker.push(letter.renderLetter());
            });
            // console.log(checker);
            // console.log(word.letters);
            if (guesses > 0 && checker.indexOf("_") !== -1) {
                if (checker.indexOf(true) === -1) {
                    guesses--;
                    console.log("\n Incorrect! \n ".red)
                    makeGuess();
                } else if (checker.indexOf(true) !== -1) {
                    console.log("\n Correct! \n".magenta);
                    makeGuess();
                } else {
                    if (guesses === 0) {
                        console.log("\n------------------------------\n".rainbow);
                        console.log("\nSorry, no more guesses! Game Over!\n".red);
                        console.log("\n------------------------------\n".rainbow);

                        continuePrompt();
                    } else {
                        makeGuess();
                    }
                }

            } else {
                console.log(word.update());
                console.log("\n---------------------------\n".rainbow);
                console.log("\nCongrats! You guessed the word!\n".yellow);
                console.log("\n---------------------------\n".rainbow);
                continuePrompt();
            }
        });
}
// continue prompt function to play again 
function continuePrompt() {
    inquirer.prompt([
        {
            name: "continue",
            type: "confirm",
            message: "\nWould you like to play again?\n".blue
        }
    ])
        .then(data => {
            if (data.continue) {
                init();
            } else {
                return console.log("\n***Thanks for playing!***\n".rainbow);
            }
        });
}


init();

// require letter.js logic 
const Letter = require("./letter.js");

//Constructor for chosen word
function Word(word) {
    this.word = word;

    this.makeLetters = function () {
        let letters = [];
        let wordArray = this.word.split("");
        for (let i = 0; i < wordArray.length; i++) {
            let newLetter = new Letter(wordArray[i]);
            letters.push(newLetter);
        }
        return letters;
    }

    // 
    this.letters = this.makeLetters(this.word);
    // console.log(this.letters);

    // A makeGUESS function that takes a character as an argument
    // and calls the checkLetter function
    this.makeGuess = function (guess) {
        this.letters.forEach(letter => {
            letter.checkLetter(guess);
        });
        this.update();
    }


    // A function that returns a string representing the word.
    // calls renderLetter function
    this.update = function () {
        let printedWord = "";
        this.letters.forEach(letter => {
            printedWord += letter.renderLetter() + " ";
        });
        console.log(printedWord);
        return printedWord;
    }

}

// Check to see if functions are working by creating test variable

// testing
var test = new Word("Jaws");
console.log(test.makeGuess("k"));

module.exports = Word;
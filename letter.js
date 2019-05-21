function Letter(letter) {
    // A string value to store the underlying character for the letter
    this.letter = letter.toUpperCase();
    // A boolean value that stores whether that letter has been guessed yet
    this.isGuessed = false;

    // A function that returns the underlying character to 
    // an underscore if the letter has not been guessed
    this.renderLetter = function () {
        if (this.letter === " ") {
            return " ";
        } else if (!this.isGuessed) {
            return "_";

        } else {
            return this.letter;
        }
    }

    //A function that checks letter against underlying letter  
    // updates stored boolean value to true if it was guessed correctly
    this.checkLetter = function (guess) {
        if (guess.toUpperCase() === this.letter) {
            this.isGuessed = true;
            return true;

        } else {
            this.isGuessed = false;
            return false;
        }
    }
}

// Checking to see if functions are working properly against letter 
// var test = new Letter("k");
// console.log(test.checkLetter("k"));
// console.log(test.renderLetter("k"));

module.exports = Letter;

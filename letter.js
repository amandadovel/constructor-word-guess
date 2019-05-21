function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;

    this.renderLetter = function () {
        if (this.letter === " ") {
            return " ";
        } else if (!this.isGuessed) {
            return "_";

        } else {
            return this.letter;
        }
    }
    this.checkLetter = function (guess) {
        if (guess === this.letter) {
            this.isGuessed = true;
            return true;

        } else {
            this.isGuessed = false;
            return false;
        }
    }
}
var test = new Letter("k");
console.log(test.checkLetter("k"));
console.log(test.renderLetter("k"));

module.exports = Letter;

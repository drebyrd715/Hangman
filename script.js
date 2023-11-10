import { wordlist } from "./wordlist.js";
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");


let currentWord, wronGuessCount = 0;
const maxGuesses = 5;

const getRandomWord = () => {
    /// getting random word from wordlist //////
  const { word, hint } = wordlist[Math.round(Math.random() * wordlist.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  /// creating li of word length and putting in word display /////
  wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"><li>`).join("");
};

const startGame = (button, clickedLetter) => {
    /// does clicked letter exist on current word? //////
    if(currentWord.includes(clickedLetter)) {
        //// show the right letters on word display //////
       [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter) {
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
} else {
    //// if clicked latter dont exist update wrongGuessCount and picture img /////
       wronGuessCount++;
       hangmanImage.src = `hangman/hangman-${wronGuessCount}.svg`;
    }
    button.disable = true;
    guessesText.innerText = `${wronGuessCount} / ${maxGuesses}`;
}

///// Making keyboard buttons also event listeners///////////
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e => startGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

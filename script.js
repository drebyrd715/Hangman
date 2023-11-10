import { wordlist } from "./wordlist.js";
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const restartGamebtn = document.querySelector(".play-again")


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 5;

const resetGame = () => {
    /// reset all of game variables and UI elements
    correctLetters = []; 
    wrongGuessCount = 0;
    hangmanImage.src = `hangman/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"><li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    /// getting random word from wordlist //////
  const { word, hint } = wordlist[Math.round(Math.random() * wordlist.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
  /// creating li of word length and putting in word display /////
};

const gameOver = (youWin) => {
    // after game over, show image /////
    setTimeout(() => {
        const modalText = youWon ? `You got the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `hangman/${youWin ? `victory` : `Lost`}.gif`;
        gameModal.querySelector("h4").src = `${youWin ? `YouWin` : `Game Over`}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
            gameModal.classList.add("show");
    }, 300);
}

const startGame = (button, clickedLetter) => {
    /// does clicked letter exist on current word? //////
    if(currentWord.includes(clickedLetter)) {
        //// show the right letters on word display //////
       [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter) {
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
} else {
    //// if clicked latter dont exist update wrongGuessCount and picture img /////
       wrongGuessCount++;
       hangmanImage.src = `hangman/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;  

        // gameOver function applies if a condition is met //////
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

///// Making keyboard buttons also event listeners///////////
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e => startGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
restartGamebtn.addEventListener("click", getRandomWord);
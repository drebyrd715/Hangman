import { wordlist } from "./wordlist.js";

///////// QUERIES /////////////////
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const funGame = document.querySelector(".fun-game");
const restartGamebtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const getRandomWord = () => {
//   /// getting random word from wordlist //////
  const { word, hint } = wordlist[Math.round(Math.random() * wordlist.length)];
  /// .toLowerCase so the words chosen match the keyboard clicks ///
  currentWord = word.toLowerCase()
//   showing hint on page /////
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const startGame = (button, clickedLetter) => {
//   /// does clicked letter exist on current word? //////
  if (currentWord.includes(clickedLetter)) {
//     //// show the right letters on word display //////
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
//     //// if clicked letter dont exist update wrongGuessCount and picture img /////
    wrongGuessCount++;
    hangmanImage.src = `hangman/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // gameOver function applies if a condition is met //////
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
//   console.log(clickedLetter);
};

const gameOver = (youWin) => {
    //   // after game over, show image /////
        const gameText = youWin ? `You got the word:` : `The correct word was:`;
        funGame.querySelector("img").src = `hangman/${youWin ? `victory` : `Lost`}.gif`;
        funGame.querySelector("h4").innerText = `${youWin ? `YouWin` : `Game Over`}`;
        funGame.querySelector("p").innerHTML = `${gameText} <b>${currentWord}</b>`;
        funGame.classList.add("show");
        funGame.style.opacity = 100;
        // reload game if i lose/////
      const timeoutforreload = setTimeout(timeout, 4000)
    };
    const timeout =() => {
        location.reload()
    };

    const resetGame = () => {
        /// reset all of game variables and UI elements
        correctLetters = [];
        wrongGuessCount = 0;
        hangmanImage.src = `hangman/hangman-${wrongGuessCount}.svg`;
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        /// enable button clicks again to play next game ///////
        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
        //   /// creating li of word length and putting in word display /////
        wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
        funGame.classList.remove("show");
        /// 
      };

//// 1. Making keyboard buttons dynamically also event listeners///////////
/// generates all letters from A to Z ///
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => startGame(e.target, String.fromCharCode(i)));
}

restartGamebtn.addEventListener("click", getRandomWord);
getRandomWord();


import { wordlist } from "./wordlist.js";
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");

const getRandomWord = () => {
    /// getting random word from wordlist //////
  const { word, hint } = wordlist[Math.round(Math.random() * wordlist.length)];
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"><li>`).join("");
};

const startGame = (button, clickedLetter) => {
    console.log(clickedLetter)
}

///// Making keyboard buttons also event listeners////////
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e => startGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

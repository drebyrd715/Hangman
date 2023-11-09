import { wordlist } from "./wordlist.js";
const keyboardDiv = document.querySelector(".keyboard");

let word;
let hint;
///// Get Random word///////
const getRandomWord = () => {
    /// getting random word from wordlist //////
  word = wordlist[Math.round(Math.random() * wordlist.length)];
  hint = wordlist[Math.round(Math.random() * wordlist.length)];
};

///// Making keyboard buttons for all letters////////
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
}

getRandomWord();

import {wordlist} from "./wordlist.js"
console.log(wordlist)
const keyboardDiv = document.querySelector(".keyboard");
///// Making keyboard buttons for all letters////////
for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}
let word
let hint
///// Get Random word///////
const getRandomWord = () => {
     word = wordlist[Math.round(Math.random() * wordlist.length)];
     hint = wordlist[Math.round(Math.random() * wordlist.length)];
    console.log(word, hint)
}

getRandomWord();

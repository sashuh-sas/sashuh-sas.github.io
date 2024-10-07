const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const timerDisplay = document.querySelector(".timer");

const codingQuiz = [
  {
    word: "chrupek",
  },
];

let currentWord, correctLetters, wrongGuessCount, timerInterval;
const maxGuesses = 6;
const gameTimeLimit = 60;

const resetGame = () => {
  // Resetting all game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `0.png`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  clearInterval(timerInterval);
  startTimer();
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word } = codingQuiz[Math.floor(Math.random() * codingQuiz.length)];
  currentWord = word;
  resetGame();
};

const startTimer = () => {
  let timeLeft = gameTimeLimit;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `pozostały czas: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver(false);
    }
  }, 1000);
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    clearInterval(timerInterval);
    const modalText = isVictory ? `WYGRAŁEŚŚŚ:` : `PRZEGRAŁEŚŚŚ:`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        // Update display for correctly guessed letters
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");

        // Only add the letter to correctLetters if it's not already there
        if (!correctLetters.includes(clickedLetter)) {
          correctLetters.push(clickedLetter);
        }
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `${wrongGuessCount}.png`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // Check if all unique letters in the word have been guessed
  const uniqueLettersInWord = [...new Set(currentWord)];
  if (correctLetters.length === uniqueLettersInWord.length) {
    window.location.href = '/99/99.html'; 
    return gameOver(true); // Player has won
  }

  if (wrongGuessCount === maxGuesses) {
    return gameOver(false); // Player has lost
  }
};

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

const settingsForm = document.getElementById("settingsForm");
const guessForm = document.getElementById("guessForm");
const minInput = document.getElementById("minNumber");
const maxInput = document.getElementById("maxNumber");
const guessInput = document.getElementById("guessInput");
const gameArea = document.getElementById("gameArea");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const rangeText = document.getElementById("rangeText");
const restartButton = document.getElementById("restartButton");

let secretNumber;
let attempts = 0;
let min;
let max;
let gameOver = false;

function startGame() {
    min = Number(minInput.value);
    max = Number(maxInput.value);
//יצירת מספר בטווח שהתקבל
    secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    attempts = 0;
    gameOver = false;

    attemptsText.textContent = "Attempts: 0";
    message.textContent = "Good luck! Make your first guess.";
    message.className = "info";

    rangeText.textContent = `Guess a number between ${min} and ${max}.`;

    guessInput.value = "";
    guessInput.min = min;
    guessInput.max = max;
    guessInput.disabled = false;

    guessForm.querySelector("button").disabled = false;

    gameArea.hidden = false;
    guessInput.focus();

    console.log("Secret number:", secretNumber);
}

function checkGuess(event) {
    event.preventDefault();

    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);
//תקינות קלט
    // if (
    //     guessInput.value.trim() === "" ||
    //     !Number.isSafeInteger(guess) ||
    //     guess < min ||
    //     guess > max
    // ) {
    //     message.textContent = `Enter an integer between ${min} and ${max}.`;
    //     message.className = "error";
    //     animateMessage();
    //     return;
    // }

    attempts++;
    attemptsText.textContent = `Attempts: ${attempts}`;

    if (guess < secretNumber) {
        message.textContent = "Too low! Try a higher number.";
        message.className = "error";
    } else if (guess > secretNumber) {
        message.textContent = "Too high! Try a lower number.";
        message.className = "error";
    } else {
        message.textContent = `Correct! You guessed it in ${attempts} attempts!`;
        message.className = "success";

        gameOver = true;
        guessInput.disabled = true;
        guessForm.querySelector("button").disabled = true;
    }

    animateMessage();

    guessInput.value = "";

    if (!gameOver) {
        guessInput.focus();
    }
}

function animateMessage() {
    message.classList.remove("shake");

    void message.offsetWidth;

    message.classList.add("shake");
}

settingsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    startGame();
});

guessForm.addEventListener("submit", checkGuess);

restartButton.addEventListener("click", startGame);
//אתחול משחק ראשוני
startGame();
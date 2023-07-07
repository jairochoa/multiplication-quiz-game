/**
    Multiplication Quiz Game
    Code and Designed by: Aamir Khan Jadoon
    Date: 15 - 8 - 2019

    Modified by: Jairo Ochoa
    Date: 05 - 07 - 2023
 */

// Elements
let notificationScore = document.querySelector(".notification-score");
let gameOverNotification = document.querySelector(".notification");
let closeicon = document.querySelector(".icon>img");
let questionBox = document.querySelector(".question>p");
let optionElement = document.querySelector(".option");
let optionA = document.querySelector(".option-a");
let optionB = document.querySelector(".option-b");
let optionC = document.querySelector(".option-c");
let optionD = document.querySelector(".option-d");
let timer = document.querySelector(".timer>p");
let score = document.querySelector(".score");
let startButton = document.querySelector("button");
let optionsTableContainer = document.querySelector(".option-table");
let tryAgainSection = document.querySelector(".t");
let firstNumber = 1;
let secondNumber = 0;
let time = 240;
let scoreV = 0;
let flagForOptions = 0;

// Notification Display Game Over
function gameOver(close) {
  if (close == 0) {
    notificationScore.textContent = scoreV;
    gameOverNotification.classList.remove("notification-display-none");
    resetOptionClassList();
    questionBox.textContent = "--";
    score.textContent = "--";
    timer.textContent = "--";
    tryAgainSection.classList.add("notification-display-none");
    tryAgainSection.classList.remove("tryAgainSection");
    optionA.textContent = "--";
    optionB.textContent = "--";
    optionC.textContent = "--";
    optionD.textContent = "--";
    flagForOptions = 0;
  }
  // close the window if close == 2
  if (close == 2) {
    gameOverNotification.classList.add("notification-display-none");
    scoreV = 0;
    time = 240;
    startGame();
  }
}
// close gameover window
closeicon.addEventListener("click", () => {
  gameOver(2);
});

// Get a Random Number
function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1; //1 and 99
}

// Generate a Random Question
function generateQuestion() {
  // firstNumber = getRandomNumber();
  secondNumber = getRandomNumber();
  questionBox.textContent = firstNumber + " x " + secondNumber;
  generateOptions(firstNumber, secondNumber);
}

// Generate Random Option
function generateOptions(firstNumber, secondNumber) {
  let options = [
    getRandomNumber() * getRandomNumber(),
    getRandomNumber() * getRandomNumber(),
    getRandomNumber() * getRandomNumber(),
    firstNumber * secondNumber
  ];
  let optionsReference = [optionA, optionB, optionC, optionD];
  let optionschoice = [];

  while (optionschoice.length < 4) {
    let x = Math.floor(Math.random() * 4);
    if (!optionschoice.includes(x)) {
      optionschoice.push(x);
    }
  }

  for (let i in optionschoice) {
    optionsReference[i].textContent = options[optionschoice[i]];
  }
}

// start/reset button
let flag;
let t;

function startTimer() {
  t = setInterval(() => {
    //Update Score element TextContent
    timer.textContent = time;

    if (flag == 0) {
      clearInterval(t);
      timer.textContent = "---";
    } else if (time == 0) {
      clearInterval(t);
      gameOver(0);
    }
    time--;
  }, 1000); // end of setInterval()
} // end of startTimer()

function selectTable(e, optionTable){
  let childOptions = optionsTableContainer.children;
  for (let i = 0; i < childOptions.length; i++) {
    const element = childOptions[i];
    if(element.classList.contains('active')){
      element.classList.remove('active');
    }
  }
  e.target.classList.add('active');
  firstNumber = optionTable;
  gameOver(2);
}

startButton.addEventListener("click", () => {
  if (startButton.textContent == "Iniciar Juego") {
    startButton.textContent = "Terminar Juego";
    startButton.classList.remove("start-button");
    startButton.classList.add("reset-button");
    timer.classList.remove("notification-display-none");
    flag = 1;
    flagForOptions = 1;
    time = 240;
    generateQuestion();
    tryAgainSection.classList.add("notification-display-none");
    tryAgainSection.classList.remove("tryAgainSection");
    startTimer();
  } else if (startButton.textContent == "Terminar Juego") {
    startGame();
  }
});

function startGame() {
  flagForOptions = 0;
  startButton.textContent = "Iniciar Juego";
  startButton.classList.remove("reset-button");
  startButton.classList.add("start-button");
  flag = 0;
  questionBox.textContent = "--";
  optionA.textContent = "--";
  optionB.textContent = "--";
  optionC.textContent = "--";
  optionD.textContent = "--";
  score.textContent = "--";
  resetOptionClassList();
  tryAgainSection.classList.add("notification-display-none");
  tryAgainSection.classList.remove("tryAgainSection");
}
// OptionSelection and score update
// each right answer = 10 score

function resetOptionClassList() {
  optionA.classList.remove("right");
  optionA.classList.remove("wrong");
  optionB.classList.remove("right");
  optionB.classList.remove("wrong");
  optionC.classList.remove("right");
  optionC.classList.remove("wrong");
  optionD.classList.remove("right");
  optionD.classList.remove("wrong");
}

optionElement.addEventListener("click", e => {
  //reset
  resetOptionClassList();

  // correct?
  if (
    e.target.textContent == firstNumber * secondNumber &&
    flagForOptions == 1
  ) {
    e.target.classList.add("right");
    scoreV += 10;
    score.textContent = scoreV;
    tryAgainSection.classList.add("notification-display-none");
    tryAgainSection.classList.remove("tryAgainSection");
    generateQuestion();
  }

  // wrong?
  else if (
    e.target.textContent != firstNumber * secondNumber &&
    e.target.classList.value != "option" &&
    flagForOptions == 1
  ) {
    e.target.classList.add("wrong");
    tryAgainSection.classList.remove("notification-display-none");
    tryAgainSection.classList.add("tryAgainSection");
  }
});

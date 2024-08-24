let n1;
let n2;
let opSelector;
let answer;
let qNo = document.getElementById("Qno");
let score = document.getElementById("score");
let question = document.getElementById("question");
let start = document.getElementById("start-btn");
let fScore = document.getElementById("final-score");
let startBox = document.getElementById("start-game");
let gameBox = document.getElementById("in-game");
let endBox = document.getElementById("end-game");
let progress = document.getElementById("progress");
let message = document.getElementById("message");
let answerInput = document.getElementById("answer-input");
let submitAnswer = document.getElementById("submit-answer");
let correctAnswers = document.getElementById("correct-answers");
let operator = ["+", "-", "*", "/"];
let t;
let correctCount = 0;

function restart() {
  score.innerHTML = "0";
  qNo.innerHTML = "0";
  correctCount = 0;
  nextQuestion();

  gameBox.style.display = "block";
  startBox.style.display = "none";
  endBox.style.display = "none";
  timer.style.display = "block";
}

function whenFinished() {
  console.log("Finished.");
  gameBox.style.display = "none";
  startBox.style.display = "none";
  endBox.style.display = "flex";
  correctAnswers.innerHTML = correctCount;
  lastmessage();
}

function nextQuestion() {
  progress.style.width = "100%";
  timed();
  fScore.innerHTML = score.innerHTML;
  if (qNo.innerText == "10") {
    whenFinished();
    return;
  }
  n1 = Math.floor(Math.random() * 100);
  n2 = Math.floor(Math.random() * 100);
  opSelector = operator[Math.floor(Math.random() * 4)];

  if (opSelector == "/") {
    for (let i = 0; i < 200; i++) {
      if (n1 % n2 == 0 && n1 != 0 && n2 != 0 && n2 != 1 && n1 != n2) {
        break;
      }
      n1 = Math.floor(Math.random() * 100);
      n2 = Math.floor(Math.random() * 100);
    }
  }

  if (opSelector == "*") {
    for (let i = 0; i < 100; i++) {
      if (n1 * n2 <= 1000) {
        break;
      }
      n1 = Math.floor(Math.random() * 50);
      n2 = Math.floor(Math.random() * 50);
    }
  }
  question.innerHTML = n1 + opSelector + n2 + " = ?";
  answer = eval(n1 + opSelector + n2);
  answerInput.value = "";
  answerInput.focus();
  getQNo();
}

function getQNo() {
  qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
}

function getScore() {
  score.innerHTML = parseInt(score.innerHTML) + parseInt(progress.style.width);
}

function doWhenCorrect() {
  getScore();
  correctCount++;
}

function lastmessage() {
  clearInterval(t);
  if (fScore.innerText >= 800) {
    let emoji = "&#128525";
    message.innerHTML = "WOW !! UNBELIEVABLE !!" + emoji;
  } else if (fScore.innerText >= 500) {
    let emoji = "&#128531";
    message.innerHTML = "TOO CLOSE !!" + emoji;
  } else if (fScore.innerText >= 100) {
    let emoji = "&#128549";
    message.innerHTML = "Better luck next time " + emoji;
  } else {
    let emoji = "&#128577";
    message.innerHTML = "Bad Luck " + emoji;
  }
}

function timed() {
  clearInterval(t);
  t = setInterval(() => {
    progress.style.width = parseInt(progress.style.width) - 1 + "%";
    if (parseInt(progress.style.width) == 0) {
      clearInterval(t);
      nextQuestion();
    }
  }, 300); // Increased timer time (3 times longer)
}

submitAnswer.addEventListener("click", () => {
  clearInterval(t);
  if (parseFloat(answerInput.value) === answer) {
    doWhenCorrect();
  }
  nextQuestion();
});

answerInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    submitAnswer.click();
  }
});

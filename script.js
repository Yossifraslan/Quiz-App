/* 
   Quiz Questions Array
   Each question has text and multiple answers, with one marked as correct */

const ALL_QUESTIONS = [
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet has the most moons?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "In what year did the Titanic sink?",
    answers: [
      { text: "1905", correct: false },
      { text: "1912", correct: true },
      { text: "1920", correct: false },
      { text: "1898", correct: false },
    ],
  },
  {
    question: "Which planet in our solar system is known for its rings?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Saturn", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Gd", correct: false },
    ],
  },
  {
    question: "Which language has the most native speakers in the world?",
    answers: [
      { text: "English", correct: false },
      { text: "Spanish", correct: false },
      { text: "Hindi", correct: false },
      { text: "Mandarin Chinese", correct: true },
    ],
  },
  {
    question: "What is the largest desert in the world?",
    answers: [
      { text: "Sahara Desert", correct: false },
      { text: "Gobi Desert", correct: false },
      { text: "Antarctic Desert", correct: true },
      { text: "Arabian Desert", correct: false },
    ],
  },
  {
    question: "Which organ in the human body uses the most energy?",
    answers: [
      { text: "Heart", correct: false },
      { text: "Liver", correct: false },
      { text: "Brain", correct: true },
      { text: "Kidneys", correct: false },
    ],
  },
  {
    question: "Which gas makes up most of Earth’s atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "Which continent has the highest number of countries?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Europe", correct: false },
      { text: "Africa", correct: true },
      { text: "South America", correct: false },
    ],
  },
  {
    question: "Which programming language was created by Guido van Rossum?",
    answers: [
      { text: "Java", correct: false },
      { text: "C++", correct: false },
      { text: "Python", correct: true },
      { text: "Ruby", correct: false },
    ],
  },
  {
    question: "What does HTTP stand for?",
    answers: [
      { text: "Hyperlink Transfer Text Protocol", correct: false },
      { text: "HyperText Transfer Protocol", correct: true },
      { text: "High Transfer Text Process", correct: false },
      { text: "Hyper Transfer Terminal Program", correct: false },
    ],
  },
  {
    question:
      "In Greek mythology, who was the mother of the twin brothers Castor and Pollux?",
    answers: [
      { text: "Hera", correct: false },
      { text: "Leda", correct: true },
      { text: "Demeter", correct: false },
      { text: "Aphrodite", correct: false },
    ],
  },
  {
    question:
      "What is the only letter that does NOT appear in the periodic table?",
    answers: [
      { text: "J", correct: true },
      { text: "Q", correct: false },
      { text: "X", correct: false },
      { text: "Z", correct: false },
    ],
  },
  {
    question: "What is the smallest country in the world by land area?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "San Marino", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Liechtenstein", correct: false },
    ],
  },
  {
    question: " Which element has the highest melting point?",
    answers: [
      { text: "Iron", correct: false },
      { text: "Carbon", correct: false },
      { text: "Platinum", correct: false },
      { text: "Tungsten", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const welcomePage = document.getElementById("welcome-page");
const quizApp = document.getElementById("quiz-app");

startBtn.addEventListener("click", () => {
  welcomePage.style.display = "none";
  quizApp.style.display = "block";
  startQuiz();
});

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() {
  questions = getRandomQuestions(ALL_QUESTIONS, 5);
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  document.querySelector(".timer-container").classList.remove("timer-hidden");
}

function getRandomQuestions(allQuestions, num) {
  const shuffled = [...allQuestions];
  shuffleArray(shuffled);
  return shuffled.slice(0, num);
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  resetState();
  clearInterval(timer);
  startTimer();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  timeLeft = 10;
  timerElement.innerText = timeLeft;

  const circle = document.querySelector(".timer-circle");

  circle.classList.remove("warning");
  circle.style.background = "conic-gradient(#4caf50 360deg, #ddd 0deg)";

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) return;

    timerElement.innerText = timeLeft;
    const progress = (timeLeft / 10) * 360;

    if (timeLeft === 0) {
      circle.classList.remove("warning");
      circle.style.background = `conic-gradient(#ff5252 0deg, #ddd 0deg)`;
      clearInterval(timer);
      showCorrectAnswer();
      return;
    }

    if (timeLeft <= 3) {
      circle.classList.add("warning");
      circle.style.background = `conic-gradient(#ff5252 ${progress}deg, #ddd 0deg)`;
    } else {
      circle.style.background = `conic-gradient(#4caf50 ${progress}deg, #ddd 0deg)`;
    }
  }, 1000);
}

function showCorrectAnswer() {
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function selectAnswer(e) {
  if (timeLeft === 0) return;
  clearInterval(timer);

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  clearInterval(timer);
  timerElement.innerText = "";
  document.querySelector(".timer-container").classList.add("timer-hidden");

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();

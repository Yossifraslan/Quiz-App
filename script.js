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

/* DOM Elements */
const questionElement = document.getElementById("question");      // Where the question text is displayed
const answerButtons = document.getElementById("answer-buttons"); // Container for answer buttons
const nextButton = document.getElementById("next-btn");         // Next button
const timerElement = document.getElementById("timer");         // Timer display
const startBtn = document.getElementById("start-btn");        // Start button on welcome page
const welcomePage = document.getElementById("welcome-page"); // Welcome page container
const quizApp = document.getElementById("quiz-app");        // Quiz app container

// sound effects
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

// prevent sound stacking
correctSound.preload = "auto";
wrongSound.preload = "auto";

/* Event Listener for Start Button
Hides welcome page and shows quiz, then starts the quiz */
startBtn.addEventListener("click", () => {
  welcomePage.style.display = "none";
  quizApp.style.display = "block";
  startQuiz();
});

/* Quiz State Variables */
let questions = [];
let currentQuestionIndex = 0;   // Tracks current questions
let score = 0;                  // Tracks user's score
let timer;                      // Stores setInterval reference for timer
let timeLeft = 10;              // Seconds left for current questions


/* Start Quiz Function
Resets state and shows first question */
function startQuiz() {
  questions = getRandomQuestions(ALL_QUESTIONS, 5); // 5 random questions per quiz
  currentQuestionIndex = 0;                         // Reset question index
  score = 0;                                        // Reset score
  nextButton.innerHTML = "Next";                    // Reset next button text
  showQuestion();                                   // Show the first question
  document.querySelector(".timer-container").classList.remove("timer-hidden"); // Show timer
}

/* Random questions selection */
function getRandomQuestions(allQuestions, num) {
  const shuffled = [...allQuestions];
  shuffleArray(shuffled);
  return shuffled.slice(0, num);
}
/* to shuffle the questions around */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* Displays question and generates answer buttons */
function showQuestion() {
  resetState();   // clear old buttons and hide next button
  clearInterval(timer);  // stop any existing timer
  startTimer();         // start timer for this question

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;    // display number
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // generate answer buttons dynamically
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text; // set button text
    button.classList.add("btn");    // add styling
    answerButtons.appendChild(button);  // append to container
    
    // store correctness in dataset
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    // add click event for selecting answer
    button.addEventListener("click", selectAnswer);
  });
}

/* clears previous question and hides next button */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/* Counts down from 10 seconds, updates UI, handles warning and time-up */
function startTimer() {
  timeLeft = 10;
  timerElement.innerText = timeLeft;  // show initial time

  const circle = document.querySelector(".timer-circle");

  circle.classList.remove("warning");
  circle.style.background = "conic-gradient(#4caf50 360deg, #ddd 0deg)";

  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) return;   

    timerElement.innerText = timeLeft;
    const progress = (timeLeft / 10) * 360;  // calculate progress for conic-gradient

    if (timeLeft === 0) {
      circle.classList.remove("warning");
      circle.style.background = `conic-gradient(#ff5252 0deg, #ddd 0deg)`;
      clearInterval(timer);
      showCorrectAnswer();
      return;
    }
    // warning for the last 3 seconds
    if (timeLeft <= 3) {
      circle.classList.add("warning");
      circle.style.background = `conic-gradient(#ff5252 ${progress}deg, #ddd 0deg)`;
    } else {
      circle.style.background = `conic-gradient(#4caf50 ${progress}deg, #ddd 0deg)`;
    }
  }, 1000);
}

/* Highlights correct answer and disables all buttons */
function showCorrectAnswer() {
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

/* Handles user selection and scoring */
function selectAnswer(e) {
  if (timeLeft === 0) return;   // ignore clicks if time is up
  clearInterval(timer);

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    correctSound.currentTime = 0;
    correctSound.play();
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
  // show correct answer and disable all buttons
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

/* Displays final score and option to play again */
function showScore() {
  resetState();
  clearInterval(timer);
  timerElement.innerText = "";
  document.querySelector(".timer-container").classList.add("timer-hidden");  // hide timer circle

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

/* Moves to next question or show score if quiz is over */
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

/* Handles both next question and play again */
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// initial call 
startQuiz();

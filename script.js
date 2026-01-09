const questions = [
    {
        question: "What is the capital city of France?",
        answers: [
            { text: "Berlin" , correct: false},
            { text: "Madrid" , correct: false},
            { text: "Paris" , correct: true},
            { text: "Rome" , correct: false},
        ]
    },
    {
        question: "Which planet in our solar system is known for its rings?",
        answers: [
            { text: "Mars" , correct: false},
            { text: "Saturn" , correct: true},
            { text: "Jupiter" , correct: false},
            { text: "Venus" , correct: false},
        ]
    },
    {
        question: "In Greek mythology, who was the mother of the twin brothers Castor and Pollux?",
        answers: [
            { text: "Hera" , correct: false},
            { text: "Leda" , correct: true},
            { text: "Demeter" , correct: false},
            { text: "Aphrodite" , correct: false},
        ]
    },
    {
        question: " Which element has the highest melting point?",
        answers: [
            { text: "Iron" , correct: false},
            { text: "Carbon" , correct: false},
            { text: "Platinum" , correct: false},
            { text: "Tungsten" , correct: true},

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("start-btn")
const welcomePage = document.getElementById("welcome-page");
const quizApp = document.getElementById("quiz-app");

startBtn.addEventListener("click", () => {
    welcomePage.style.display = "none"; 
    quizApp.style.display = "block";    
    startQuiz();                        
});

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    document.querySelector(".timer-container").classList.remove("timer-hidden");

}

function showQuestion(){
    resetState();
    clearInterval(timer);
    startTimer();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer(){
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

        if(timeLeft === 0){
            circle.classList.remove("warning");
            circle.style.background = `conic-gradient(#ff5252 0deg, #ddd 0deg)`;
            clearInterval(timer);
            showCorrectAnswer();
            return;
        }

        if (timeLeft <= 3) {
            circle.classList.add("warning");
            circle.style.background = `conic-gradient(#ff5252 ${progress}deg, #ddd 0deg)`;
        }else {
            circle.style.background = `conic-gradient(#4caf50 ${progress}deg, #ddd 0deg)`;
        }

    },1000)
}

function showCorrectAnswer(){
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}


function selectAnswer(e){
    if (timeLeft === 0) return;
    clearInterval(timer);

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    clearInterval(timer);
    timerElement.innerText = "";
    document.querySelector(".timer-container").classList.add("timer-hidden");

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
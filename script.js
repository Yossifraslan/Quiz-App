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

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
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
    timeLeft = 6;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if(timeLeft === 0){
            clearInterval(timer);
            showCorrectAnswer();
        }
    },1000)
}

function showCorrectAnswer(){
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block"
}


function selectAnswer(e){
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
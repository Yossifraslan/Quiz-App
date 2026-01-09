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
        answer: [
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

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
    });
}



startQuiz();
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#ProgressBarFull");

let current = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0
let availableQuestions = [];

let questions = [
    { 
        question: "Commonly used data types do NOT include:", 
        choice1: "Strings",
        choice2: "Booleans",
        choice3: "Alerts", 
        choice4: "Numbers", 
        answer: 3,
    }, 
    { 
        question: "The condition in an if/else statement is enclosed in:", 
        choice1: "Quotes",
        choice2: "Parentheses",
        choice3: "Curly Brackets", 
        choice4: "Square Brackets", 
        answer: 2,
    }, 
    { 
        question: "Arrays in JavaScript can be used to store:", 
        choice1: "Numbers and Strings",
        choice2: "Other Arrays",
        choice3: "Booleans", 
        choice4: "All of the above", 
        answer: 4,
    }, 
    { 
        question: "String values must be enclosed within ______ when being assigned to variables", 
        choice1: "Commas",
        choice2: "Curly Brackets",
        choice3: "Quotes", 
        choice4: "Parentheses", 
        answer: 3,
    }, 
    { 
        question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
        choice1: "JavaScript",
        choice2: "Terminal Bash",
        choice3: "for loops", 
        choice4: "console.log", 
        answer: 4,
    }
];

const scorePoints = 100;
const totalQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getQuestion();
};

getQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > totalQuestions) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    };

    questionCounter++;
    
    progressText.innerText = `Question ${questionCounter} of ${totalQuestions}`;
    
    progressBarFull.style.width = `${(questionCounter/totalQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innterText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice"+ number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore(scorePoints);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000);
    });
});

incrementScore = num => {
    score+=num;
    score.innerText = score;
}
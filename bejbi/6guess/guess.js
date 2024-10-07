const questions = [
    {
        question: "KTÓREGO DNIA ODBYŁY SIĘ NASZE PIERWSZE PLANSZÓWKI...?",
        answers: [
            { text: "3 marca", correct: false },
            { text: "1 marca", correct: true },
            { text: "26 lutego", correct: false },
            { text: "27 lutego", correct: false }
        ]
    },
    {
        question: "NASZAAAA PIERWSZA PODRÓŻ CHRUPKIEM. GDZIE...?",
        answers: [
            { text: "pachołek", correct: false },
            { text: "park oruński", correct: false },
            { text: "stocznia", correct: false },
            { text: "westerplatte", correct: true }
        ]
    },
    {
        question: "IMIE MOJEGO KOTKA...",
        answers: [
            { text: "rudzik", correct: false },
            { text: "rysio", correct: false },
            { text: "rudy", correct: true },
            { text: "rysiek", correct: false }
        ]
    },
    {
        question: "W ILU KRAJACH BYŁAM (byłam nie musiałam zwiedzać ale zawitała tam moja stupka. przemyśl dobrze)?",
        answers: [
            { text: "12", correct: false },
            { text: "16", correct: true },
            { text: "10", correct: false },
            { text: "14", correct: false }
        ]
    },
    {
        question: "3 PRAWDY 1 KŁAMSTWO. ZNAJDŹ KŁAMSTWO",
        answers: [
            { text: "nie wyprawiałam imprezy na 18-stke", correct: false },
            { text: "nigdy nie dostałam mandatu", correct: true },
            { text: "nie jestem w stanie pływać pod wodą bez zatykania nosa", correct: false },
            { text: "grałam kiedyś na gitarze", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionsIndex = 0;
let score = 0;

function startQuiz()  {
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    const scorePercentage = (score / questions.length) * 100;
    
    let message = `zgadłeś ${score} z ${questions.length}!`;
    
    if (scorePercentage < 50) {
        message += " troszku słabo kochanie... ";
    } else if (scorePercentage > 75) {
        message += " Congratulations! You did great!";
        window.location.href = "/7,5pho/pho.html";
        
    }
    
    questionElement.innerHTML = message;
    nextButton.innerHTML = 'daje ci szanseee spróbuj jeszcze raz';
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionsIndex++;
    if (currentQuestionsIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionsIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

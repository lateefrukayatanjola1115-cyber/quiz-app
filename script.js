window.addEventListener("load", function () {
  alert("It's Quiz Time");
});
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Text Markup Language", correct: false }
    ]
  },
  {
    question: "Which programming language is known as the language of the web?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "SQL", correct: false }
    ]
  },
  { 
    question: "which part of a computer is known as the brain of the computer?",
    answers: [
      { text: "Monitor", correct: false },
      { text: "RAM", correct: false },
      { text: "CPU", correct: true },
      { text: "Hard Drive", correct: false }
    ]
  },
  {
    question: "Which of these is an operating system?",
    answers: [
      { text: "Google Chrome", correct: false },
      { text: "windows", correct: true },
      { text: "Microsoft Office", correct: false },
      { text: "Photoshop", correct: false }
    ]
  },
  {
    question: "Which device is used to print documents on paper?",
    answers: [
      { text: "Scanner", correct: false },
      { text: "Monitor", correct: false },
      { text: "Webcam", correct: false },
      { text: "Printer", correct: true }
    ]
  },
  {
    question: "What does USB stand for?",
    answers: [
      { text: "Universal Serial Bus", correct: true},
      { text: "Universal System Board", correct: false},
      { text: "United Storage Bus", correct: false},
      { text: "Universal Software Bus", correct: false}
    ]
  },
  {
    question: "Which key is commonly used to delete the character to the left of the cursor?",
    answers: [
      { text: "Tab", correct: false},
      { text: "Backspace", correct: true},
      { text: "Enter", correct: false},
      { text: "Shift", correct: false}
    ]
  },
  {
    question: "Which company develops the Windows operating system?",
    answers: [
      { text: "Intel", correct: false},
      { text: "Google", correct: false},
      { text: "Microsoft", correct: true},
      { text: "Apple", correct: false}
    ]
  },
  {
    question: "Which component is responsible for displaying images on a computer screen?",
    answers: [
      { text: "Graphics Processing Unit", correct: true},
      { text: "Power Supply", correct: false},
      { text: "RAM", correct: false},
      { text: "Motherboard", correct: false}
    ]
  },
  {
    question: "What is the main purpose of an antivirus program?",
    answers: [
      { text: "Create Presentations", correct: false},
      { text: "Edit photos", correct: false},
      { text: "Protect the computer from malware", correct: true},
      { text: "Browse websites", correct: false},
    ]
  },
  {
    question: "Which data structure operates on the Last In, First Out(LIFO) principle?",
    answers: [
      { text: "Linked List", correct: false},
      { text: "Tree", correct: false},
      { text: "Stack", correct: true},
      { text: "Queue", correct: false}
    ]
  },
  {
    question: "Which protocol is primarily used to securely transfer web pages over the internet?",
    answers: [
      { text: "HTTP",  correct: false},
      { text: "HTTPS", correct: true},
      { text: "SMTP", correct: false},
      { text: "FTP", correct: false}
    ]
  },
  {
    question: "In programming, what is the worst-case time complexity of binary search on a sorted array?",
    answers: [
      { text: "O(1)", correct: false},
      { text: "O(n^2)", correct: false},
      { text: "O(n)", correct: false},
      { text: "O(logn)", correct: true}
    ]
  },
  {
    question: "Which SQL statement is used to retrieve data from a database?",
    answers: [
      { text: "INSERT", correct: false},
      { text: "SELECT", correct: true},
      { text: "UPDATE", correct: false},
      { text: "DELETE", correct: false}
    ]
  },
  {
    question: "Which OSI layer is responsible for routing packets between networks?",
    answers: [
      { text: "Physical Layer", correct: false},
      { text: "Transport Layer", correct: false},
      { text: "Data Link Layer", correct: false},
      { text: "Network Layer", correct: true}
    ]
  }
];

// UI Elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const timeLeftElement = document.getElementById("time-left");
const highScoreElement = document.getElementById("high-score");
const finalHighScoreElement = document.getElementById("final-high-score");

// Game Variables
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
const QUESTION_TIME = 10; // 10 seconds per question
let timeLeft = QUESTION_TIME;

// Load high score from browser local storage on startup
let highScore = localStorage.getItem("quizHighScore") || 0;
highScoreElement.innerText = highScore;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval); // Stop any active timer
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Timer Logic
function startTimer() {
  timeLeft = QUESTION_TIME;
  timeLeftElement.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftElement.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

// Called when time runs out before selecting an answer
function handleTimeout() {
  // Highlight the correct answer and disable all buttons
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function selectAnswer(e) {
  clearInterval(timerInterval); // Freeze the timer once user selects an answer

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  scoreElement.innerText = `${score} / ${questions.length}`;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("quizHighScore", highScore);
    highScoreElement.innerText = highScore;
  }
  finalHighScoreElement.innerText = `${highScore} / ${questions.length}`;

  quizScreen.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
}
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  startQuiz();   // use the name of YOUR function that starts the quiz
});
function restartQuiz() {
  scoreContainer.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  startQuiz();
}
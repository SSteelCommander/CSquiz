// Quiz questions and answers
const questions = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Text Making Links"],
      answer: 0
    },
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheet",
                "Computer Style Sheet",
                "Colorful Style Sheet",
                "Creative Style System"],
      answer: 0
    },
    {
      question: "What does JS stand for?",
      choices: ["JavaScript",
                "JavaSource",
                "JavaSauce",
                "JavaServer"],
      answer: 0
    }
  ];
  
  // DOM elements
  const startBtn = document.getElementById("start-btn");
  const quizContainer = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const endContainer = document.getElementById("end");
  const finalScoreEl = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitBtn = document.getElementById("submit-btn");
  
  // Variables
  let currentQuestionIndex;
  let score;
  let timeLeft;
  let timerId;
  
  // Event listeners
  startBtn.addEventListener("click", startQuiz);
  choicesEl.addEventListener("click", checkAnswer);
  submitBtn.addEventListener("click", saveScore);
  
  // Functions
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    timerId = setInterval(updateTime, 1000);
    quizContainer.classList.remove("hide");
    endContainer.classList.add("hide");
    startBtn.classList.add("hide");
    showQuestion();
  }
  
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.innerText = question.question;
    choicesEl.innerHTML = "";
    question.choices.forEach(function(choice, i) {
      const choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "choice-btn");
      choiceBtn.setAttribute("value", i);
      choiceBtn.innerText = i + 1 + ". " + choice;
      choicesEl.appendChild(choiceBtn);
    });
  }
  
  function checkAnswer(event) {
    if (!event.target.matches(".choice-btn")) {
      return;
    }
    const selectedChoice = event.target.value;
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedChoice == correctAnswer) {
      score++;
    } else {
      timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length || timeLeft <= 0) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
  
  function endQuiz() {
    clearInterval(timerId);
    quizContainer.classList.add("hide");
    endContainer.classList.remove("hide");
    finalScoreEl.innerText = score;
  }
  
  function saveScore(event) {
    event.preventDefault();
    const initials = initialsInput.value.trim().toUpperCase();
    if (initials.length == 0) {
      alert("Please enter your initials.");
      return;
    }
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ initials, score });
    highScores.sort(function(a, b) {
      return b.score - a.score;
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "scoreboard.html";
  }
  
  function updateTime() {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }

  const viewScoresBtn = document.querySelector('#view-scores-btn');
  viewScoresBtn.addEventListener('click', () => {
    window.location.href = 'scoreboard.html';
  });


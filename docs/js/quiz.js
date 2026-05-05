// Quiz variables
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Initialize quiz
function initQuiz() {
    showQuestion(0);
}

function showQuestion(index) {
    const quizContent = document.getElementById('quizContent');
    const question = quizQuestions[index];
    
    // Update progress bar
    const progress = ((index + 1) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    let optionsHTML = '';
    question.options.forEach((option, i) => {
        optionsHTML += `
            <div class="option" onclick="selectOption(${i})">
                ${option}
            </div>
        `;
    });
    
    quizContent.innerHTML = `
        <div class="question">
            <h3>Question ${index + 1}/${quizQuestions.length}</h3>
            <p>${question.question}</p>
        </div>
        <div class="options">
            ${optionsHTML}
        </div>
        <div class="quiz-nav">
            ${index > 0 ? '<button class="btn" onclick="previousQuestion()">Previous</button>' : '<div></div>'}
            ${index < quizQuestions.length - 1 ? '<button class="btn" onclick="nextQuestion()">Next</button>' : '<button class="btn" onclick="showResults()">Finish Quiz</button>'}
        </div>
    `;
    
    // If user has already selected an answer for this question, show it
    if (userAnswers[index] !== undefined) {
        selectOption(userAnswers[index]);
    }
}

function selectOption(optionIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    userAnswers[currentQuestion] = optionIndex;
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showResults() {
    // Calculate score
    score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i].correct) {
            score++;
        }
    }
    
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <div class="result">
            <h2>Quiz Completed!</h2>
            <p>Your score:</p>
            <div class="score">${score}/${quizQuestions.length}</div>
            <p>${score === quizQuestions.length ? 'Perfect! You know Jharkhand very well!' : 
                 score >= quizQuestions.length/2 ? 'Good job! You know quite a bit about Jharkhand.' : 
                 'Keep learning about Jharkhand!'}</p>
            <button class="btn" onclick="restartQuiz()" style="margin-top: 1rem;">Try Again</button>
        </div>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    showQuestion(0);
}
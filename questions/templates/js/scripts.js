const quiz = document.getElementById('quiz')
const quizQuestions = document.getElementById('quiz-questions')
const quizIndicator = document.getElementById('quiz-indicator')
const quizResult = document.getElementById('quiz-results')
const btnNext = document.getElementById('btn-next')
const btnRestart = document.getElementById('btn-restart')
const quest = document.getElementById('quiz-quest')
const answers = document.getElementById('quiz-answ')
let localResults = {}
console.log(answers)

const renderIndicator = (quizStep) => {
    quizIndicator.innerHTML = `${quizStep}/${quest.length}`
}

const renderQuestion = (index) => {
    renderIndicator(index + 1)
    quizQuestions.dataset.currentStep = index
    btnNext.disabled = true

    const renderAnswers = () =>
        quizQuestions[index]
            .answers
            .map((answer) =>
                `
            <li>
                <label>
                    <input class="answer-input" type="radio" name="${index}" value="${answer.id}">
                    ${answer.value}
                </label>
            </li>
            `
            )
            .join('')

    quizQuestions.innerHTML = `
    <div class="quiz-question-item">
        <div class="quiz-question-item-qestion">${quest[index].question}</div>
        <ul class="quiz-question-item-answer">${renderAnswers()}</ul>
    </div>
    `
}

const renderResults = () => {
    let result = 'Результаты теста:'

    const checkIsCorrect = (answer, index) => {
        let className = ''

        if (!answer.isCorrect && answer.id === localResults[index]) {
            className = 'answer-invalid'
        } else if (answer.isCorrect) {
            className = 'answer-valid'
        }

        return className
    }

    const getAnswers = (index) =>
        quest[index]
            .answers
            .map((answer) => `<li class="${checkIsCorrect(answer, index)}">${answer.value}</li>`)
            .join('')

    quest.forEach((question, index) => {
        result += `
        <div class="quiz-result-item">
            <div class="quiz-result-item-qestion">${quest.question}</div>
            <ul class="quiz-result-item-answer">${getAnswers(index)}</ul>
        </div>
        `
    })

    quizResult.innerHTML = result
}

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value
        btnNext.disabled = false
    }
})

quiz.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(quizQuestions.dataset.currentStep) + 1
        if (nextQuestionIndex === quest.length) {
            quizQuestions.classList.add('questions--hidden')
            quizIndicator.classList.add('quiz--hidden')
            btnNext.style.visibility='hidden'

            quizResult.style.visibility='visible'
            btnRestart.style.visibility='visible'

            renderResults()
        } else {
            renderQuestion(nextQuestionIndex)
        }
    } else if (event.target.classList.contains('btn-restart')) {
        localResults = {}
        quizResult.innerHTML = ''

        quizQuestions.classList.remove('questions--hidden')
        quizIndicator.classList.remove('quiz--hidden')
        btnNext.style.visibility='visible'
        quizResult.style.visibility='hidden'
        btnRestart.style.visibility='hidden'

        renderQuestion(0)
    }
})

renderQuestion(0)

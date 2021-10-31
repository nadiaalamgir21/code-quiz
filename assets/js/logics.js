let timerElm = document.querySelector('#timerElm')
var timerCount = 100
var currentQuesCount = 0
let timerInterval = null

function timer() {
    function timerLogic() {
        if (timerCount < 1) {
            gameEnd()
        } else {
            timerCount--
            printTimerCount()
        }
    }

    timerInterval = setInterval(timerLogic, 1000)
}


function printTimerCount() {
    timerElm.innerHTML = timerCount
}

var startQuizClicked = false

function startQuiz() {
    let quizIntro = document.querySelector('.quiz-intro')
    quizIntro.style.display = 'none'

    let quizMain = document.querySelector('.quiz-main')
    quizMain.style.display = 'flex'

    generateQuestion()

    timer()
}

function generateQuestion(disable = false) {
    let currQues = questionsArr[currentQuesCount]

    let questionUi = `<h2>${currQues.questionContent}</h2>
                        <ul>
                            <li><button onclick="checkAnswer(1)" ${disable ? 'disabled' : ''}>1: ${currQues.options[1]}</button></li>
                            <li><button onclick="checkAnswer(2)" ${disable ? 'disabled' : ''}>2: ${currQues.options[2]}</button></li>
                            <li><button onclick="checkAnswer(3)" ${disable ? 'disabled' : ''}>3: ${currQues.options[3]}</button></li>
                            <li><button onclick="checkAnswer(4)" ${disable ? 'disabled' : ''}>4: ${currQues.options[4]}</button></li>
                        </ul>`


    let quizMain = document.querySelector('.quiz-main')
    quizMain.innerHTML = questionUi

}

function checkAnswer(option) {
    if (option == questionsArr[currentQuesCount].correctAnswer) {
        correctAnswer()
    } else {
        incorrectAnswer()
    }

    checkAllQuestionsAreDone()
}

function correctAnswer() {
    let answerStatus = document.querySelector('.answer-status')
    answerStatus.innerHTML = '<div class="upper-border">Correct answer!</div>'
}

function incorrectAnswer() {
    timerCount = timerCount - 10
    printTimerCount()
    let answerStatus = document.querySelector('.answer-status')
    answerStatus.innerHTML = '<div class="upper-border">Incorrect answer!</div>'
}

function checkAllQuestionsAreDone() {
    if (currentQuesCount === questionsArr.length - 1) {
        gameEnd()
    } else {
        currentQuesCount++
        generateQuestion(true)

        setTimeout(generateQuestion, 500)
    }
}

function gameEnd() {
    clearInterval(timerInterval)
    showInitialsScreenAndHideQuestions()
}

function showInitialsScreenAndHideQuestions() {
    document.querySelector('.quiz-main').style.display = "none"
    document.querySelector('.answer-status').style.display = "none"
    document.querySelector('.initials-screen').style.display = "block"
    document.querySelector('.final-score-text').innerHTML = `Your final score is ${timerCount}`

}

function submitScore() {
    let input = document.querySelector('#initialInput')
    let initials = input.value
    //when user enters the input in initials checking whether it is emty or not
    if (initials == '') {
        alert('Initials are required!')
    }else{
        scoresStoring(initials)
    }
}

function scoresStoring(initials) {
    let data = { initials: initials, score: timerCount }
    if (localStorage.getItem('scores') === null) {
        let myArr = [data]
        localStorage.setItem('scores', JSON.stringify(myArr))
    } else {
        let scoresArr = localStorage.getItem('scores')
        scoresArr = JSON.parse(scoresArr)
        scoresArr.push(data)
        localStorage.setItem('scores', JSON.stringify(scoresArr))
    }
    redirectToHigscore()
}

function redirectToHigscore() {
    window.location = '/highscores.html'
}

//TO DOS
//show the initials screen and hide the questions
// stop the timer for the score 
//timer ke end main stop the game





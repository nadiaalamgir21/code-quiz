let timerElm = document.querySelector("#timerElm")
var timerCount = 100
var currentQuesCount = 0
let timerInterval = null
var startQuizClicked = false
var audioCorrect = new Audio("assets/sfx/correct-answer-sound.wav")
var audioIncorrect = new Audio("assets/sfx/incorrect-answer-sound.wav")

//timer function reduces the timer count every second and print the timercount on the screen and after expiration of the timer ends the game
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

//function to print the timer count on the screen
function printTimerCount() {
  timerElm.innerHTML = timerCount
}

//hides the quiz intro screen and show the quiz questions and start the game
function startQuiz() {
  let quizIntro = document.querySelector(".quiz-intro")
  quizIntro.style.display = "none"

  let quizMain = document.querySelector(".quiz-main")
  quizMain.style.display = "flex"

  generateQuestion()

  timer()
}

//this function retrives the current question from the question array declared in Questions.js and prints the question in quiz-main element.

function generateQuestion(disable = false) {
  let currQues = questionsArr[currentQuesCount]

  let questionUi = `<h2>${currQues.questionContent}</h2>
                        <ul>
                            <li><button onclick="checkAnswer(1)" ${
                              disable ? "disabled" : ""
                            }>1: ${currQues.options[1]}</button></li>
                            <li><button onclick="checkAnswer(2)" ${
                              disable ? "disabled" : ""
                            }>2: ${currQues.options[2]}</button></li>
                            <li><button onclick="checkAnswer(3)" ${
                              disable ? "disabled" : ""
                            }>3: ${currQues.options[3]}</button></li>
                            <li><button onclick="checkAnswer(4)" ${
                              disable ? "disabled" : ""
                            }>4: ${currQues.options[4]}</button></li>
                        </ul>`

  let quizMain = document.querySelector(".quiz-main")
  quizMain.innerHTML = questionUi
}

//checks correct or incorrect answers executed by the user.
function checkAnswer(option) {
  //show anwser status block
  document.querySelector(".answer-status").style.display = "block"
  if (option == questionsArr[currentQuesCount].correctAnswer) {
    correctAnswer()
  } else {
    incorrectAnswer()
  }

  checkAllQuestionsAreDone()
}

function correctAnswer() {
  let answerStatus = document.querySelector(".answer-status")
  answerStatus.innerHTML = '<div class="upper-border">Correct answer!</div>'
  audioCorrect.play()
}

//penalizes user by -10 seconds for every wrong answer.
function incorrectAnswer() {
  timerCount = timerCount - 10
  printTimerCount()
  let answerStatus = document.querySelector(".answer-status")
  answerStatus.innerHTML = '<div class="upper-border">Incorrect answer!</div>'
  audioIncorrect.play()
}

//Verifies if all the questions have been answered and if so than moves to the score sheet.
function checkAllQuestionsAreDone() {
  if (currentQuesCount === questionsArr.length - 1) {
    generateQuestion(true)

    setTimeout(() => {
      gameEnd()
      //hide answer status block
      document.querySelector(".answer-status").style.display = "none"
    }, 1000)
  } else {
    generateQuestion(true)

    setTimeout(() => {
      currentQuesCount++
      generateQuestion()
      //hide answer status block
      document.querySelector(".answer-status").style.display = "none"
    }, 1000)
  }
}
//stops timer and redirects to the initial/score sheet.
function gameEnd() {
  clearInterval(timerInterval)
  showInitialsScreenAndHideQuestions()
}

//hides question & answer screens and displays the final score screen.
function showInitialsScreenAndHideQuestions() {
  document.querySelector(".quiz-main").style.display = "none"
  document.querySelector(".answer-status").style.display = "none"
  document.querySelector(".initials-screen").style.display = "block"
  document.querySelector(
    ".final-score-text"
  ).innerHTML = `Your final score is ${timerCount}`
}
//extracts value from initial's input box.
function submitScore() {
  let input = document.querySelector("#initialInput")
  let initials = input.value
  //when user enters the input in initials checking whether it is empty or not and if so than there will be an alert to inform the user that it is mandatory to enter a initial.
  if (initials == "") {
    alert("Initials are required!")
  } else {
    scoresStoring(initials)
  }
}

//Stores user scores to local storage in a array of object's format and redirects to the highscores page
function scoresStoring(initials) {
  let data = { initials: initials, score: timerCount }
  if (localStorage.getItem("scores") === null) {
    let myArr = [data]
    localStorage.setItem("scores", JSON.stringify(myArr))
  } else {
    let scoresArr = localStorage.getItem("scores")
    scoresArr = JSON.parse(scoresArr)
    scoresArr.push(data)
    localStorage.setItem("scores", JSON.stringify(scoresArr))
  }
  redirectToHigscore()
}

function redirectToHigscore() {
  window.location = "/highscores.html"
}

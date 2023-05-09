//All Variables from html

/*Decalring 3 variable from the top portion from my html, grabing all the values
by there id*/
var highscore = document.getElementById("highscore");
var userInitials = document.getElementById("user");
var currentScore = document.getElementById("CurrentScore");

/*declaring 2 variables grabing them from the header protion of my html and getting
them by there id*/ 
var highscore = document.getElementById("Highscore");
var user = document.getElementById("User");

/*declaring 3 varibles all having to do with the timer protion of this program
one varible is grabbed from an id from Html the other 2 are just declared within
javascript*/ 
var timer = document.getElementById("Timer");
var timeLeft;
var timerCount;

/*decaring a variable of current score set equal to an html element with the id CurrentScore*/ 
var currentScore = document.getElementById("CurrentScore");

/*declaring variable questions gotten from the id in html of Questions */
questions = document.getElementById("Questions");

/* declaing varible answersAll set equal to element within html with id of Answers*/
var answersAll = document.getElementById("Answers");


/*declaring variable allButtonsAnswers set equal to element within html with class Answerclass */
var allButtonsAnswers = document.querySelector(".Answerclass");
/*declaring variable list set equal to element within html with id list */
var list = document.getElementById("list");
/*declaring variable buttonsDiv set equal to element within html with class buttons*/
var buttonsDiv = document.querySelector(".buttons");
/* */
var textBox = document.getElementById("TextBox");
/* */
var startBtn = document.getElementById("startBtn");
var restartBtn = document.getElementById("restartBtn");
/* */
var win = false;
var winText = "You finshed before the timer";
var loserText = "You lost";
/* */
currentScore = 0;
/* */
var questionsIndex = 0;
/* */
var textBox = document.createElement("input");
/* */
var questionsArray = [
{questionAll: "what is 2 + 2?", answer: "4", 
choices:
["4", "6", "7", "8"]
},
{questionAll: "what is 3 + 3?", answer: "6",
choices:
["4","5","6","7"]
},
{questionAll: "what is 4 + 4?", answer: "8",
choices:
["4", "6", "7", "8"]
},
{questionAll: "what is 4 + 5?", answer: "9",
choices:
["4", "6", "9", "8"]
},
{questionAll: "what is 8 + 4?", answer: "12",
choices:
["4", "6", "12", "8"]}
]



/* */
function letTheGamesBegin(){
    timerCount = 15;
    buttonsDiv.classList.add("hide");
    restartBtn.classList.remove("hide");
    restartBtn.addEventListener("click", restart())
    startTheClock()
    nextQuestion()
}
/* */
function nextQuestion(){
    if(questionsIndex>4){
        win = true;
        avengersEndGame()
    }else{
    questions.textContent = questionsArray[questionsIndex].questionAll;
    var choicesAnswers = questionsArray[questionsIndex].choices
    answersAll.innerHTML = "";
    choicesAnswers.forEach(choices => {
        var answerEl = document.createElement("button");
        answerEl.innerHTML = choices;
        answersAll.appendChild(answerEl);
        answerEl.addEventListener("click", chooseAnswer)
    })
    }
    restartBtn.addEventListener("click", restart())
}
/* */
function chooseAnswer(event){

    var selectedanswer = event.target;
    if( selectedanswer.innerText == questionsArray[questionsIndex].answer){
        currentScore++;
    }else{
        timerCount - 5;
    }
    questionsIndex++;
    nextQuestion()
    restartBtn.addEventListener("click", restart())
}
/* */
function avengersEndGame(){
    list.classList.add("hide");
    textBox.classList.remove("hide");
    restartBtn.classList.add('hide');
    answersAll.classList.add('hide');
    timer.classList.add('hide');
    questions.textContent = "Your score was "+currentScore+" enter initials below and save your score";

    highscore = currentScore;
    

    

}
/* */
function restart(){
    return;
}
/* */
function startTheClock(){
    timeLeft = setInterval(function(){
        timerCount--;
        timer.textContent = timerCount + " Seconds left";
        if(timerCount >= 0) {
            if(win && timerCount > 0) {
                clearInterval(timeLeft)
                avengersEndGame()
            }
        }
        if(timerCount === 0){
            clearInterval(timeLeft)
            avengersEndGame()
        }
    },1000)
}





















//eventlistner
startBtn.addEventListener("click", letTheGamesBegin);
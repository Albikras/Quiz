var highscore; //declaring variable highscore
var userInitials; //declaring variable ureInitials
var currentScore; //declaring variable currentScore
var user; //declaring variable user

currentScore = 0; //setting variable currentScore equal to 0
var questionsIndex = 0; //declaring variable questionsIndex set it equal to 0
highscore = 0; //setting variable highscore equal to 0

var win = false; //declaring variable win set equal to false

var timer = document.getElementById("Timer"); //declaring variable timer grab it by id Timer in html
var timeLeft; //declaring variable timeLeft
var timerCount; //declaring variable timerCount

var list = document.getElementById("list"); //declaring variable timer grab it by id Timer in html
var box = document.getElementById("box"); //declaring variable timer grab it by id Timer in html

var questions = document.getElementById("Questions"); //declaring variable questions grab it by id Questions in html
var answersAll = document.getElementById("Answers"); //declaring variable answersAll grab it by id answersAll in html
var textBox = document.getElementById("TextBox"); //declaring variable textBox grab it by id textBox in html

var clearBtn = document.getElementById("clearBtn"); //declaring variable clearBtn grab it by id clearBtn in html
var allButtonsAnswers = document.querySelector(".Answerclass"); //declaring variable allButtonsAnswers grab it by id allButtonsAnswers in html
var buttonsDiv = document.querySelector(".buttons"); //declaring variable buttonsDiv grab it by id buttonsDiv in html
var startBtn = document.getElementById("startBtn"); //declaring variable startBtn grab it by id startBtn in html
var restartBtn = document.getElementById("restartBtn"); //declaring variable restartBtn grab it by id restartBtn in html
var submitBtn = document.getElementById("submitBtn"); //declaring variable submitBtn grab it by id submitBtn in html

/**declares a variable perviousScoresArray equal to the JASON.parse(make string into object) of localstorage with the function getItem with the string
 * value prevScore or set to the equal to the empty array*/
var previousScoresArray = JSON.parse(localStorage.getItem("prevScore")) || [];

/**declares a variable questionsArray equal to a 2 dimensional array, variables questionAll, answer and choices are all created within this array with
 * different string values at each indes. The choices variable has the second array(arrayception) with 4 string elements(being ur multiple choice options)*/
var questionsArray = [
  {
    questionAll: "1. Javascript is an _______ language?",
    answer: "a) Object-Oriented",
    choices: [
      "a) Object-Oriented",
      "b) Object-Based",
      "c) Procedural",
      "d) None of the above",
    ],
  },
  {
    questionAll:
      "2. Which of the following keywords is used to define a variable in Jevascript?",
    answer: "c) Both A and B",
    choices: ["a) var", "b) let", "c) Both A and B", "d) None of the above"],
  },
  {
    questionAll: "3. How can a datatype be declared to be a constant type",
    answer: "a) const",
    choices: ["a) const", "b) var", "c) let", "d) constant"],
  },
  {
    questionAll:
      "4. When the switch statement matches the expression with the given labels, how is the comparison done?",
    answer: "a) Both the datatype and the result of the expression are compared",
    choices: [
      "a) Both the datatype and the result of the expression are compared",
      "b) Only the datatype of the expression is compared",
      "c) Only the value of the expression is compared",
      "d) None of the above",
    ],
  },
  {
    questionAll:
      "5. What keyword is used to check whether a given property is valid or not?",
    answer: "a) in",
    choices: ["a) in", "b) is in", "c)exist", "d) lies"],
  },
];

/**declare function letTheGamesBegin, set timerCount equal to 30 add hide class to buttonsDiv and remove it from
 * restartBtn then call to two functions start the clock and next questions*/
function letTheGamesBegin() {
  timerCount = 30;
  buttonsDiv.classList.add("hide");
  restartBtn.classList.remove("hide");
  startTheClock();
  nextQuestion();
}
/**declare function nextQuestion if questionsIndex is greater then 4 it will go through the if statement, else set
 * questions text content equal to the questionsArray at index of the value of questionsIndex of variable questionsAll
 * declare variable*/
function nextQuestion() {
  if (questionsIndex > 4) {
    win = true;// set win equal to true
    avengersEndGame();// call to avengersEndGame function
  }
    /**else set questions text content equal to the questionsArray at index of the value of questionsIndex of variable questionsAll
    * declare variable choiceAnswers set equal to the questionsArray at index of the value of questionsIndex of array choices
    * set the list class in inner html equal to an empty string
    * use forEach method on choices array to get every value within choices array then use an arrow function*/
   else {
    questions.textContent = questionsArray[questionsIndex].questionAll;
    var choicesAnswers = questionsArray[questionsIndex].choices;
    list.innerHTML = "";
    choicesAnswers.forEach((choices) => {
      var answerButtonChoices = document.createElement("button");//declare variable answerButtonChoices set equal to created element within html button
      answerButtonChoices.classList.add("btn");//add the class btn to answerButtonChoices
      answerButtonChoices.innerHTML = choices;//set answerButtonChoices equal to choices
      list.appendChild(answerButtonChoices);//placing answerButtonChoices in the parent element list
      answerButtonChoices.addEventListener("click", chooseAnswer);//answerButtonChoices add event listener based on click, on click go to function chooseAnswer
    });
  }
}
/*declare function chooseAnswer with an event, declare selectedanswer set equal to event.target*/
function chooseAnswer(event) {
  var selectedanswer = event.target;
  if (selectedanswer.innerText == questionsArray[questionsIndex].answer) {//if the inner text of selected answer is equal to the answer in questions array index it will go throuhg this if statement
    currentScore++;//add current score by 1
  }
  if (selectedanswer.innerText !== questionsArray[questionsIndex].answer) {//if the inner text of selected answer does not equal to the answer in questions array index it will go throuhg this if statement
    timerCount -= 5;// subtract 5 from timerCount
  }
  questionsIndex++;//add one to questionsIndex
  nextQuestion();//call to next questions function
}
/*declare function avengersEndGame*/
function avengersEndGame() {
  list.classList.add("hide");//add class hide variable list
  textBox.classList.remove("hide");//remove the class hide from textBox
  allButtonsAnswers.classList.add("hide");//add class hide variable allButtonsAnswers
  timer.classList.add("hide");//add class hide variable timer
  submitBtn.classList.remove("hide");//remove the class hide from submitBtn

  /**questions text content is equal to a string + the varible of current score*/
  questions.textContent =
    "Your score was " +
    currentScore +
    " enter initials below and save your score";
  highscore = currentScore;//set highscore equal to currentScore
}
/*declare function restart*/
function restart() {
  window.location.reload();//refresh the page 
}
/*declare function startTheClock*/
function startTheClock() {
  timeLeft = setInterval(function () {//set timeLeft = setinterval function
    timerCount--;//subtract 1 from timeCount
    timer.textContent = timerCount + " Seconds left";//set timer text content equal to variable timerCount plus a string
    if (timerCount >= 0) {//if timer is greater the of equal to 0
      if (win == true && timerCount > 0) {//if win is equal to true and timerCount is greater then 0
        clearInterval(timeLeft);//clear interval of timeLeft
        avengersEndGame();//call to function avengers endgame
      }
    }
    if (timerCount === 0) {//if timeCount is equal to 0
      clearInterval(timeLeft);//clear interval of timeLeft
      avengersEndGame();//call to function avengers endgame
    }
  }, 1000);//1000 miliseconds
}
/*declare function submitName*/
function submitName() {
  var userName = textBox.value;//decalre variable userName and set equal to value of textBox
  if (userName === "") {//if userName is === empty string
    alert("Please enter a Name!!!");//alert the user
    return null;//return nothing
  }
  /*declare variable objUser as an object, within the object is userName and highscore*/
  var objUser = {
    userName,
    highscore,
  };
  previousScoresArray.push(objUser);//push previousScores array into objUser
  localStorage.setItem("prevScore", JSON.stringify(previousScoresArray));//localstorage using methoed setItem with string value prevScore and Json.stringify of previousScoresArray
  leaderBoard();//call to leaderBoard function
}
/*declare function leaderBoard*/
function leaderBoard() {
  submitBtn.classList.add("hide");//add class hide variable submitBtn
  textBox.classList.add("hide");//add class hide variable textBox
  clearBtn.classList.remove("hide");//remove the class hide from clearBtn
  previousScoresArray.map((score, index) => {//use map methoed with previousScoreArray for keyvalues of score and index
    var mySpan = document.createElement("span");//declare variable mySpan and set equal to new element span
    mySpan.textContent = `${score.userName}: ${score.highscore}`;//mySpan text content is equal to the string of value score.userName and score.highscore
    answersAll.appendChild(mySpan);//placing mySpan in the parent element answersAll
  });
}

submitBtn.addEventListener("click", submitName);//submitBtn add event listener based on click, on click go to function submitName
startBtn.addEventListener("click", letTheGamesBegin);//startBtn add event listener based on click, on click go to function letTheGamesBegin
restartBtn.addEventListener("click", restart);//restartBtn add event listener based on click, on click go to function restart

clearBtn.addEventListener("click", () => {//clearBtn add event listener based on click, on click go to arrow function
  box.classList.add("hide");//add class hide to variable box
  localStorage.clear();//clear local storage
});

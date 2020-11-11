//Store the list of questions
var myQuestions;

//Store for a question, the list of answers
var answers = [];

//Store the HTML output
var output = [];

//Use DOM to access Div
var quizContainer, resultsContainer, nextButton, slides, nextQuestionType;

//Record time elapsed since the beginning of the exercice
var timeElapsed = 0.00;

//set the interval
var timerID = -1;

//Contains the slides that are actually user exercices slides
var exerciceSlides = [1, 3, 5, 7];

//Contains the slides that are actually user confusion self report
var confSlides = [2, 4, 6, 8];

//get radio buttons of exercices
var questExercices;

// Which slide is actually displayed?
var currentSlide = 0;

//Save result of the exercice
var rowResult = [];

//Save all results

var results = [['serie', 'exercice', 'time_exercice_begin', 'answer', 'time_exercice_ends', 'taken_time', 'self_reported_conf_lvl']];

//Store current exerice (0 to 3)
var currentExercice = 0;

/*
The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
*/

window.addEventListener('DOMContentLoaded', (event) => {

  CreateQuestionList();

  //Increase the timer
  function tickTimer() {
    timeElapsed++;
    //console.log("time: "+timeElapsed);
  }

  //Start a timer store how long does it take to the user to complete the exercice
  function startTimer() {
    if (timerID == -1) {
      timerID = setInterval(tickTimer, 1000);
    }
  }

  //Stop the timer
  function stopTimer() {
    if (timerID != -1) {
      clearInterval(timerID);
      timerID = -1;
    }
  }

  //Reset the timer
  function resetTimer() {
    stopTimer();
    timeElapsed = -1;
    tickTimer();
  }

  /*Create a list of questions, each question has a string, an image, a list of answer choices, and the correct answer*/
  function CreateQuestionList() {
    myQuestions = [
      {
        exemple: true,
        question: "Voici un ensemble de figures géométriques abstraites. Pour trouver la figure manquante (A jusqu'à H), \
        il faut essayer de <mark>déduire des relations entre les figures</mark>. En partant de la première colonne à gauche et en descendant, \
        on constate que l'on augmente à chaque fois le segment (I-II-III). Cette augmentation se répète avec les autres colonnes. \
        Avec le même raisonemment, nous voyons que dans les lignes seule la position du segment change. \
        Les diagonales conjugent position et augmentation des segments. La réponse B est la seule qui respecte les règles d'augmentation et de position \
        que nous avons découvert.",
        image: "questions/QT1-0.png"
      },
      {
        question: "Quelle est la figure manquante?",
        image: "questions/QT1-1.png",
        answers: ["A", "B", "C", "D", "E", "F", "G", "H"],
        correctAnswer: "G"
      },
      {
        question: "<p> <mark>La confusion est une situation dans laquelle les gens ne comprennent pas ce qui se passe, ce qu'ils doivent faire ou qui est quelqu'un ou quelque chose.</mark></p>\
        Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "Quelle est la figure manquante?",
        image: "questions/QT1-2.png",
        answers: ["A", "B", "C", "D", "E", "F", "G", "H"],
        correctAnswer: "C"
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "Quelle est la figure manquante?",
        image: "questions/QT1-3.png",
        answers: ["A", "B", "C", "D", "E", "F", "G", "H"],
        correctAnswer: "F"
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "Quelle est la figure manquante?",
        image: "questions/QT1-4.png",
        answers: ["A", "B", "C", "D", "E", "F", "G", "H"],
        correctAnswer: ""
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      }
    ];
  }

  /*BUIDING THE QUIZ WITH THE LIST OF QUESTIONS
  For each question, get the content of the question (string) and its others elements then make HTML code with those elements and add it to the variable 'output'
  */
  function buildQuiz() {
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      answers = [];
      AddHTMLRadioButton(currentQuestion, questionNumber);
      AddHTMLElements(currentQuestion);
    });
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  //For each available answer add an HTML radio button
  function AddHTMLRadioButton(currentQuestion, questionNumber) {
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
             ${currentQuestion.answers[letter]}
             <input type="radio" class="questExercices" name="question${questionNumber}" value="${letter}" onclick="CheckIfRadioSelected()">
           </label>`
      );
    }
  }

  //For each available answer add its content
  function AddHTMLElements(currentQuestion) {
    if (currentQuestion.exemple) {
      output.push(
        `<div class="slide">
           <div class="question">Partie 1 Test de raisonnement abstrait et spatial: Exemple</div>
           <p>${currentQuestion.question}</p>
           <div class="image"><img src=${currentQuestion.image} height=25% width=25%></div>
         </div>`
      );
    }

    else if (currentQuestion.image) {
      output.push(
        `<div class="slide">
           <div class="question">Partie 1 Test de raisonnement abstrait et spatial : À vous de jouer !</div>
           ${currentQuestion.question}
           <div class="image"><img src=${currentQuestion.image} height=25% width=25%></div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    }
    else if (!currentQuestion.image) {
      output.push(
        `<div class="slide">
        <div class="question">Partie 1 Test de raisonnement abstrait et spatial : À vous de jouer !</div>
          <div class="question"></div>${currentQuestion.question}
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    }
  }

  //SHOW THE RESULTS
  function showResults() {

    answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      TrackUserAnswers(currentQuestion, questionNumber);
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function TrackUserAnswers(currentQuestion, questionNumber) {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      // if answer is wrong or blank
      // color the answers red
      answerContainers[questionNumber].style.color = "red";
    }
  }

  //Display the slide (I.E THE QUESTION with string, image, answer..) that we have created earlier in the function buildQuizz (output)
  function showSlide(n) {
    ClearExerciceRadio();
    //slides contain a list of the div with class="slide"
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      DisplayFirstSlide();
    }

    if (currentSlide === slides.length - 1) {
      DisplayLastSlide();
    } else {
      DisplayNextSlide();
    }
  }

  function DisplayFirstSlide() {
    nextQuestionType.style.display = "none";
  }

  function DisplayNextSlide() {
    if (currentSlide != 0) {
      nextButton.style.display = "none";
    }
    nextQuestionType.style.display = "none";
    if (exerciceSlides.includes(currentSlide)) {
      startTimer();
      SaveSerieNumber();
      rowResult.push(currentExercice); //save exercice number
      rowResult.push(GetCurrentDate()); //save date
      currentExercice = currentExercice + 1;
    }
    else {
      resetTimer();
    }
  }

  function DisplayLastSlide() {
    nextButton.style.display = "none";
    if (exerciceSlides.includes(currentSlide)) {
      startTimer();
      rowResult.push(currentExercice); //save exercice number
      rowResult.push(GetCurrentDate()); //save date
    }
    else {
      resetTimer();
    }
  }

  //Save results and show next slide
  function showNextSlide() {
    if (exerciceSlides.includes(currentSlide)) {
      SaveSelectedExerciceRadio(); //save answer
      rowResult.push(GetCurrentDate());
      rowResult.push(timeElapsed); //save time
    }

    else if (confSlides.includes(currentSlide)) {
      SaveSelectedExerciceRadio();
      results = results.concat([rowResult]);
      rowResult = [];
    }


    console.log("resultat: " + JSON.stringify(results));
    showSlide(currentSlide + 1);
    ClearExerciceRadio();
  }

  //GET DOM ELEMENTS

  function GetDOMElements1() {
    quizContainer = document.getElementById("quiz");
    resultsContainer = document.getElementById("results");
  }

  function GetDOMElements2() {
    questExercices = document.getElementsByClassName("questExercices");
    nextButton = document.getElementById("next");
    slides = document.querySelectorAll(".slide"); //slides contain a list of the div with class="slide"
    nextQuestionType = document.getElementById("nextQT");

  }

  // submit, show results
  function OnClick() {
    nextButton.addEventListener("click", showNextSlide);
  }

  //Add to rowresult the number of the serie (question_type)
  function SaveSerieNumber() {
    rowResult.push("0");
  }

  GetDOMElements1();

  // display quiz right away
  buildQuiz();

  GetDOMElements2();

  showSlide(0);

  OnClick();

});

//Save participants results
function exportToCsv(filename, rows) {
  var processRow = function (row) {
    var finalVal = '';
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? '' : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      };
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0)
        result = '"' + result + '"';
      if (j > 0)
        finalVal += ',';
      finalVal += result;
    }
    return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}



//Show next button only if the participant has selected a radio button
function CheckIfRadioSelected() {
  for (var i = 0; i < questExercices.length; i++) {
    if (questExercices[i].checked && currentSlide == slides.length - 1) {
      nextQuestionType.style.display = "inline-block";
    }

    else if (questExercices[i].checked) {
      nextButton.style.display = "inline-block";
    }
  }
}

//Save selected answer for the exercices
function SaveSelectedExerciceRadio() {
  for (var i = 0; i < questExercices.length; i++) {
    if (questExercices[i].checked) {
      rowResult.push(questExercices[i].value); //save answer
    }
  }
}

//Clear all selected radio button
function ClearExerciceRadio() {
  for (var i = 0; i < questExercices.length; i++) {
    questExercices[i].checked = false;
  }
}

//Save last slide
function LastSlideSave() {
  SaveSelectedExerciceRadio();
  results = results.concat([rowResult]);
  rowResult = [];

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ':' + time;

  exportToCsv(dateTime + '_serie0.csv', [
    results[0],
    results[1],
    results[2],
    results[3],
    results[4],
  ])
  ChangeHTMLPage();
}

function ChangeHTMLPage() {
  document.location.href = './question_type2.html';
}

function GetCurrentDate(){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds();
  let dateTime = date+' '+time;
  console.log(dateTime);
  return dateTime;
}
//Draw variables
var mousePressed = false;
var lastX, lastY;
var ctx;

//Store the list of questions
var myQuestions;

//Store for a question, the list of answers
var answers = [];

//Store the HTML output
var output = [];

//Use DOM to access Div
var quizContainer, resultsContainer, nextButton, slides, nextQuestionType;

//Contains the slides that are actually user exercices slides
var exerciceSlides = [5, 9, 13, 17];

//Store slides number where self-confusion report is asked
var confSlides = [6, 10, 14, 18];

//Get the exemples slides
var examples_slides = [0, 1, 2];

//Time each displayed exercice statements lasts on screen
var count = 3000;

var timeout;

//Record time elapsed since the beginning of the exercice
var timeElapsed = 0.00;

//set the interval
var timerID = -1;

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

  DetectMouseEvenOnCanvas();
  CreateQuestionList();

  //Increase the timer
  function tickTimer() {
    timeElapsed++;
    console.log("time: " + timeElapsed);
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
        question: "Nous allons montrer deux grilles. Sur cette première grille, il y a 2 cercles bleus et un rouge. Vous devez mémoriser où sont les cercles bleus et ignorer le cercle rouge. Après 3 secondes, nous passons à la grille suivante.",
        image: "questions/QT4-0-0.png"
      },
      {
        exemple: true,
        question: "Sur cette deuxième grille, il y a uniquement un cercle bleu. Vous devez mémoriser où se trouve ce cercle en 3 secondes.",
        image: "questions/QT4-0-1.png"
      },
      {
        exemple: true,
        question: "Il faut maintenant placer sur la grille les cercles bleus qui n’étaient pas à la même position dans les deux grilles. Vous devez placer un cercle gris là où les cercles étaient répétés. Les cercles rouges sont ignorés. Voici la solution:",
        image: "questions/QT4-0-2.png"
      },

      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-1-0.png"
      },

      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-1-1.png"
      },

      {
        question: "Dessinez en bleu l'emplacement des cercles bleus qui ne se répètaient pas dans les deux grilles. Dessinez en gris les cercles bleus qu'on retrouvait dans les deux grilles. Ignorez les cercles rouges."
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-2-0.png"
      },

      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-2-1.png"
      },

      {
        question: "Dessinez en bleu l'emplacement des cercles bleus qui ne se répètaient pas dans les deux grilles. Dessinez en gris les cercles bleus qu'on retrouvait dans les deux grilles. Ignorez les cercles rouges."
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-3-0.png"
      },

      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-3-1.png"
      },

      {
        question: "Dessinez en bleu l'emplacement des cercles bleus qui ne se répètaient pas dans les deux grilles. Dessinez en gris les cercles bleus qu'on retrouvait dans les deux grilles. Ignorez les cercles rouges."
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-4-0.png"
      },

      {
        question: "Mémorisez l'emplacement des cercles bleus et ignorez les cercles rouges s'il y en a.",
        image: "questions/QT4-4-1.png"
      },

      {
        question: "Dessinez en bleu l'emplacement des cercles bleus qui ne se répètaient pas dans les deux grilles. Dessinez en gris les cercles bleus qu'on retrouvait dans les deux grilles. Ignorez les cercles rouges."
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      }
    ];
  }

  //Detecting mouse evens on canvas
  function DetectMouseEvenOnCanvas() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
      mousePressed = true;
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
      if (mousePressed) {
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
      }
    });

    $('#myCanvas').mouseup(function (e) {
      mousePressed = false;
    });
    $('#myCanvas').mouseleave(function (e) {
      mousePressed = false;
    });
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
            <div class="question">Partie 4 Test de mémorie spatiale : Exemple</div>
            <p>${currentQuestion.question}</p>
           <div class="image"><img src=${currentQuestion.image} height=45% width=45%></div>
         </div>`
      );
    }
    else if (currentQuestion.image) {
      output.push(
        `<div class="slide">
            <div class="question">Partie 4 Test de mémorie spatiale : À vous de jouer !</div>
            <p>${currentQuestion.question}</p>
           <div class="image"><img src=${currentQuestion.image} height=45% width=45%></div>
         </div>`
      );
    }
    else if (!currentQuestion.image) {
      output.push(
        `<div class="slide">
        <div class="question">Partie 4 Test de mémorie spatiale : À vous de jouer !</div>
        <p>${currentQuestion.question}</p>
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

  // Which slide is actually displayed?
  currentSlide = 0;

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
      DisplayLastSlide(currentSlide);
    } else {
      DisplayNextSlide(currentSlide);
    }
  }

  //Display/Hide buttons
  function DisplayFirstSlide() {
    nextQuestionType.style.display = "none";
    fullDraw.style.display = "none";

    for (var i = 0; i < generatedImages.length; i++) {
      generatedImages[i].style.display = "inline";
    }
    for (var i = 0; i < quizContainerClass.length; i++) {
      quizContainerClass[i].style.minHeight = "100vh";
      quizContainerClass[i].style.marginBottom = "10px";
    }
  }

  function DisplayNextSlide(currentSlide) {
    nextButton.style.display = "inline-block";
    nextQuestionType.style.display = "none";
    if (exerciceSlides.includes(currentSlide)) { //if we are about to draw on the canvas, then resize everything so it can fits
      SaveSerieNumber();
      DisplayAreaToDraw();
      rowResult.push(currentExercice); //save exercice number
      rowResult.push(GetCurrentDate()); //save date
      currentExercice = currentExercice + 1;
    }
    //if we are showing the slides that the participant has to memorise:
    else if (!exerciceSlides.includes(currentSlide) && !examples_slides.includes(currentSlide) && !confSlides.includes(currentSlide)) {
      startTimer();
      DisplayExerciceStatementWithTimer();
      console.log("inside this");
    }
    else if (confSlides.includes(currentSlide)) { //confusion slide
      resetTimer();
      DisplayStandardArea();
      nextButton.style.display = "none";
      console.log("inside that");
    }

    else if(examples_slides.includes(currentSlide)){
      resetTimer();
      console.log("example");
    }

    else {
      console.log("error displaynextslide()");
    }

    clearArea();
  }

  function DisplayExerciceStatementWithTimer() {
    DisplayStandardArea();
    nextButton.style.display = "none";
    timeout = setTimeout(function () {
      showNextSlide();
    }, count);
  }

  function DisplayLastSlide(currentSlide) {
    nextButton.style.display = "none";

    if (exerciceSlides.includes(currentSlide)) { //if we are about to draw on the canvas, then resize everything so it can fits
      DisplayAreaToDraw();
      rowResult.push(currentExercice); //save exercice number
      rowResult.push(GetCurrentDate()); //save date
    }

    else if (confSlides.includes(currentSlide)) {
      resetTimer();
      DisplayStandardArea();
    }
    else {
      console.log("error displaylastslide()");
    }
    clearArea();
  }

  //Make the canvas disapear, display other images and styles.
  function DisplayStandardArea() {
    fullDraw.style.display = "none";
    for (var i = 0; i < quizContainerClass.length; i++) {
      quizContainerClass[i].style.minHeight = "100vh";
      quizContainerClass[i].style.marginBottom = "0px";
    }
    for (var i = 0; i < generatedImages.length; i++) {
      generatedImages[i].style.display = "inline-block";
    }
  }

  //Resize or temporaly not display some elements to make the canvas working
  function DisplayAreaToDraw() {
    for (var i = 0; i < quizContainerClass.length; i++) {
      quizContainerClass[i].style.minHeight = "0vh";
      quizContainerClass[i].style.marginBottom = "30px";
    }
    for (var i = 0; i < generatedImages.length; i++) {
      generatedImages[i].style.display = "none";
    }
    fullDraw.style.display = "inline-block";
    //currentCanvas.style.background = "url('./questions/QT3-" + currImage + ".png') no-repeat";


    CopyImgToCanvas();
  }

  //Show next slide and save answer
  function showNextSlide() {
    console.log("row res: " + rowResult);
    if (exerciceSlides.includes(currentSlide)) {
      SaveSelectedExerciceNext(); //save answer
      rowResult.push(timeElapsed); //save time
    }

    else if (confSlides.includes(currentSlide)) {
      SaveSelectedExerciceRadio();
      results = results.concat([rowResult]);
      rowResult = [];
    }


    console.dir("resultat: " + JSON.stringify(results));
    showSlide(currentSlide + 1);
    ClearExerciceRadio();
  }

  //GET DOM ELEMENTS

  function GetDOMElements1() {
    quizContainer = document.getElementById("quiz");
    quizContainerClass = document.getElementsByClassName("quiz-container");
    generatedImages = document.getElementsByClassName("image");
    resultsContainer = document.getElementById("results");
  }

  function GetDOMElements2() {
    nextButton = document.getElementById("next");
    slides = document.querySelectorAll(".slide"); //slides contain a list of the div with class="slide"
    nextQuestionType = document.getElementById("nextQT");
    currentCanvas = document.getElementById("myCanvas");
    fullDraw = document.getElementById("full-draw");
    questExercices = document.getElementsByClassName("questExercices");
  }

  // submit, show results
  function OnClick() {
    nextButton.addEventListener("click", showNextSlide);
  }


  //Add to rowresult the number of the serie (question_type)
  function SaveSerieNumber() {
    rowResult.push("3");
  }

  GetDOMElements1();

  // display quiz right away
  buildQuiz();

  GetDOMElements2();

  //Get size of picture and resize the canvas to fit it.
  var image = new Image();
  var width = image.width; height = image.height;

  showSlide(0);

  OnClick();

});

//Draw line on canvas
function Draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    ctx.strokeStyle = $('#selColor').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }
  lastX = x; lastY = y;
}
//Clear area on canvas
function clearArea() {
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  CopyImgToCanvas();
}

//Copy Background Image to canvas
function CopyImgToCanvas() {
  var background = document.createElement("img");
  background.src = "./questions/QT4-grid.png";
  background.crossOrigin = "anonymous";

  background.onload = function () {
    myCanvas.width = this.width;
    myCanvas.height = this.height;

    // ensure that the image has loaded before running this code.
    // canvas is the original canvas that you want to add the background to
    // ctx is the origin canvas context
    var can2 = document.createElement("canvas");
    can2.width = myCanvas.width;
    can2.height = myCanvas.height;
    var ctx2 = can2.getContext("2d");
    ctx2.drawImage(background, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx2.drawImage(myCanvas, 0, 0);
    // put the new result back in the original canvas so you can save it without changing code.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(can2, 0, 0);

  }
}

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

//Export canvas to image
function exportCanvasAsPNG(canvas, fileName) {

  var canvasElement = canvas;

  var MIME_TYPE = "image/png";

  var imgURL = canvasElement.toDataURL(MIME_TYPE);

  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}

//Show next button only if the participant has selected a radio button
function CheckIfRadioSelected() {
  for (var i = 0; i < questExercices.length; i++) {
    if (questExercices[i].checked && currentSlide === slides.length - 1) {
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

//Save selected answer (=drawed canvas) for the exercices
function SaveSelectedExerciceNext() {
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ':' + time;
  exportCanvasAsPNG(myCanvas, dateTime + "_serie3");

  rowResult.push("-"); //save answer

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

  exportToCsv(dateTime + '_serie3.csv', [
    results[0],
    results[1],
    results[2],
    results[3],
    results[4],
  ])
  ChangeHTMLPage();
}

function ChangeHTMLPage() {
  document.location.href = './question_type5.html';
}

function GetCurrentDate(){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds();
  let dateTime = date+' '+time;
  console.log(dateTime);
  return dateTime;
}
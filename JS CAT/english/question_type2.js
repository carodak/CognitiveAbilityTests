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
        question: "<p> Which of the following best completes the passage below? </p> \
        <p><mark>In a survey of job applicants, two-fifths admitted to being at least a little dishonest. \
        However, the survey may underestimate the proportion of job applicants who are dishonest, because____.</mark></p>\
        <p>A. some dishonest people taking the survey might have claimed on the survey to be honest\
        <p>B. some generally honest people taking the survey might have claimed on the survey to be dishonest\
        <p>C. some people who claimed on the survey to be at least a little dishonest may be very dishonest\
        <p>D. some people who claimed on the survey to be dishonest may have been answering honestly\
        <p>E. some people who are not job applicants are probably at least a little dishonest</p>\
        <p>Results</p>\
        <p>A is the best answer. If the candidates who are in fact dishonest claim to be honest, the results of the survey would show a lower proportion of candidates dishonest than that which actually exists. \
        Therefore, this choice is the best answer. </p>\
        <p> B is inappropriate because generally honest candidates who say they are dishonest would contribute to the increase - not underestimation - of the estimate of dishonest job seekers. \
        D is inappropriate because applicants who have admitted dishonesty would not contribute to an underestimation of the proportion of dishonest applicants. \
        C and E are inappropriate because the question is not about degrees of dishonesty or the honesty of non-applicants. </p> "
      },
      {
        question: "<p><mark>People buy prestige when they buy a premium product. They want to be associated with something special. \
        Mass-marketing techniques and price-reduction strategies should not be used because____.</mark></p>",
        answers: [
          "A. affluent purchasers currently represent a shrinking portion of the population of all purchasers",
          "B. continued sales depend directly on the maintenance of an aura of exclusivity", 
          "C. purchasers of premium products are concerned with the quality as well as with the price of the products"],
        correctAnswer: "B"
      },
      {
        question: "If you had to rate your level of confusion following this exercise, you would say that you were:",
        answers: ["Not confused", "Slightly confused", "Moderately confused", "Very confused"],
      },
      {
        question: "<p><mark>The average life expectancy for the United States population as a whole is 73.9 years, but children born in Hawaii will live an average of 77 years, and those born in Louisiana, 71.7 years. \
        If a newlywed couple from Louisiana were to begin their family in Hawaii, therefore, their children would be expected to live longer than would be the case if the family remained in Louisiana.</mark></p>\
        <p>Which of the following, if true, would most seriously weaken the conclusion drawn in the passage?</p>",
        answers: [
          "A. Insurance company statisticians do not believe that moving to Hawaii will significantly lengthen the average Louisianan's life.",
          "B. The governor of Louisiana has falsely alleged that statistics for his state are inaccurate.",
          "C. The longevity ascribed to Hawaii's current population is attributable mostly to genetically determined factors.",
          "D. Thirty percent of all Louisianans can expect to live longer than 77 years. ",
          "E. Most of the Hawaiian Islands have levels of air pollution well below the national average for the United States."],
        correctAnswer: "C"
      },
      {
        question: "If you had to rate your level of confusion following this exercise, you would say that you were:",
        answers: ["Not confused", "Slightly confused", "Moderately confused", "Very confused"],
      },
      {
        question: "<p><mark>If there is an oil-supply disruption resulting in higher international oil prices, \
        domestic oil prices in open-market countries such as the United States will rise as well, \
        whether such countries import all or none of their oil.</mark></p> \
        <p>Which of the following conclusions is best supported by the statement in the passage?</p>",
        answers: [
          "A. Domestic producers of oil in open-market countries are excluded from the international oil market when there is a disruption in the international oil supply.",
          "B. International oil-supply disruptions have little, if any, effect on the price of domestic oil as long as an open-market country has domestic supplies capable of meeting domestic demand.",
          "C. The oil market in an open-market country is actually part of the international oil market, even if most of that country's domestic oil is usually sold to consumers within its borders.",
          "D. Open-market countries that export little or none of their oil can maintain stable domestic oil prices even when international oil prices rise sharply.",
          "E. If international oil prices rise, domestic distributors of oil in open-market countries will begin to import more oil than they export."],
        correctAnswer: "C"
      },
      {
        question: "If you had to rate your level of confusion following this exercise, you would say that you were:",
        answers: ["Not confused", "Slightly confused", "Moderately confused", "Very confused"],
      },

      {
        question: "<p><mark>Meteorite explosions in the Earth's atmosphere as large as the one that destroyed forests in Siberia, \
        with approximately the force of a twelve-megaton nuclear blast, occur about once a century.\
        The response of highly automated systems controlled by complex computer programs to unexpected circumstances is unpredictable.</mark></p>\
        <p>Which of the following conclusions can most properly be drawn, if the statements above are true,  \
        about a highly automated nuclear-missile defense system controlled by a complex computer program?</p>",
        answers: [
          "A. Within a century after its construction, the system would react inappropriately and might accidentally start a nuclear war.",
          "B. The system would be destroyed if an explosion of a large meteorite occurred in the Earth's atmosphere.",
          "C. It would be impossible for the system to distinguish the explosion of a large meteorite from the explosion of a nuclear weapon.",
          "D. Whether the system would respond inappropriately to the explosion of a large meteorite would depend on the location of the blast.",
          "E. It is not certain what the system's response to the explosion of a large meteorite would be, if its designers did not plan for such a contingency."],
        correctAnswer: "E"
      },
      {
        question: "If you had to rate your level of confusion following this exercise, you would say that you were:",
        answers: ["Not confused", "Slightly confused", "Moderately confused", "Very confused"],
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
            <input type="radio" class="questExercices" name="question${questionNumber}" value="${letter}" onclick="CheckIfRadioSelected()">
             ${currentQuestion.answers[letter]}
           </label>`
      );
    }
  }

  //For each available answer add its content
  function AddHTMLElements(currentQuestion) {
    if (currentQuestion.exemple) {
      output.push(
        `<div class="slide">
          <div class="question">Part 2 Critical Thinking Test: Example</div>
           <p>${currentQuestion.question}</p>
         </div>`
      );
    }

    else {
      output.push(
        `<div class="slide">
          <div class="question">Part 2 Critical Reasoning Test: Your turn!</div>
           ${currentQuestion.question}
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
      rowResult.push(GetCurrentDate()); //save date
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
    rowResult.push("1");
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

  exportToCsv(dateTime + '_serie1.csv', [
    results[0],
    results[1],
    results[2],
    results[3],
    results[4],
  ])
  ChangeHTMLPage();
}

function ChangeHTMLPage() {
  document.location.href = './question_type3.html';
}

function GetCurrentDate(){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds();
  let dateTime = date+' '+time;
  console.log(dateTime);
  return dateTime;
}
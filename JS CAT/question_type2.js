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
        question: "<p> Lequel des énoncés suivants complète le mieux le passage ci-dessous ? </p> \
        <p><mark>Dans une enquête auprès des demandeurs d'emploi, les deux cinquièmes ont reconnu être au moins un peu malhonnête. \
        Cependant, l'enquête peut sous-estimer la proportion de demandeurs d'emploi malhonnêtes, parce que____.</mark></p>\
        <p>A. certaines personnes malhonnêtes participant à l'enquête auraient pu prétendre lors de l'enquête être honnêtes\
        <p>B. certaines personnes généralement honnêtes qui ont répondu à l'enquête auraient pu prétendre lors de l’enquête être malhonnêtes\
        <p>C. certaines personnes qui ont prétendu lors de l’enquête être au moins un peu malhonnêtes peuvent être très malhonnêtes\
        <p>D. certaines personnes qui ont prétendu être malhonnêtes lors de l'enquête ont peut-être répondu honnêtement\
        <p>E. certaines personnes qui ne sont pas demandeurs d'emploi sont probablement au moins un peu malhonnêtes</p>\
        <p>Résultat</p>\
        <p>A est la meilleure réponse. Si les candidats qui sont en fait malhonnêtes prétendent être honnêtes, les résultats de l'enquête montreraient une proportion plus faible de candidats malhonnêtes que celle qui existe réellement. \
        Par conséquent, ce choix est la meilleure réponse. </p>\
        <p>B est inapproprié parce que les candidats généralement honnêtes qui se disent malhonnêtes contribueraient à l’augmentation - et non la sous-estimation - de l’estimation de demandeurs d’emplois malhonnêtes.\
        D est inapproprié parce que les candidats qui ont admis leur malhonnêteté ne contribueraient pas à une sous-estimation de la proportion de candidats malhonnêtes. \
        C et E sont inappropriés parce que la question ne concerne ni les degrés de malhonnêteté, ni l'honnêteté des non-demandeurs.</p>"
      },
      {
        question: "<p><mark>Les gens achètent du prestige lorsqu'ils achètent un produit haut de gamme. Ils veulent être associés à quelque chose de spécial. \
        Les techniques de marketing de masse et les stratégies de réduction des prix ne doivent pas être utilisées parce que____.</mark></p>",
        answers: ["A. Les acheteurs fortunés représentent actuellement une partie en diminution de la population de tous les acheteurs", "B. La poursuite des ventes dépend directement du maintien d'une aura d'exclusivité", "C. Les acheteurs de produits haut de gamme sont soucieux de la qualité ainsi que du prix des produits"],
        correctAnswer: "B"
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "<p><mark>L'espérance de vie moyenne de l'ensemble de la population des États-Unis est de 73.9 ans, mais les enfants nés à Hawaï vivront en moyenne 77 ans et ceux nés en Louisiane, 71.7 ans. \
        Si un couple de jeunes mariés de Louisiane devait fonder une famille à Hawaï, par conséquent, leurs enfants devraient vivre plus longtemps que ce ne serait le cas si la famille restait en Louisiane.</mark></p>\
        <p>Lequel des énoncés suivants, s'il est vrai, affaiblirait le plus sérieusement la conclusion tirée du passage ci-dessus ?</p>",
        answers: [
          "A. Les statisticiens des compagnies d'assurance ne croient pas que le fait de déménager à Hawaï allongera considérablement la vie du Louisianais moyen.",
          "B. Le gouverneur de la Louisiane a faussement allégué que les statistiques de son État sont inexactes.",
          "C. La longévité attribuée à la population actuelle d'Hawaï est principalement attribuable à des facteurs génétiquement déterminés.",
          "D. Trente pour cent de tous les Louisianais peuvent s'attendre à vivre plus de 77 ans.",
          "E. La plupart des îles hawaïennes ont des niveaux de pollution atmosphérique bien inférieurs à la moyenne nationale des États-Unis."],
        correctAnswer: "C"
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },
      {
        question: "<p><mark>S'il y a une interruption de l'approvisionnement en pétrole entraînant une hausse des prix internationaux du pétrole, \
        les prix du pétrole sur le marché intérieur dans les pays à marché ouvert comme les États-Unis augmenteront également, \
        que ces pays importent tout leur pétrole ou non.</mark></p> \
        <p>Laquelle des conclusions suivantes est la mieux appuyée par la déclaration du passage ci-dessus ?</p>",
        answers: [
          "A. Les producteurs nationaux de pétrole dans les pays à marché ouvert sont exclus du marché international du pétrole en cas de rupture de l'approvisionnement international en pétrole.",
          "B. Les perturbations de l'approvisionnement en pétrole sur le plan international ont peu ou pas d'effet sur le prix du pétrole national tant qu'un pays à marché ouvert dispose d'un approvisionnement national capable de répondre à la demande intérieure.",
          "C. Le marché pétrolier d'un pays à marché ouvert fait en fait partie du marché pétrolier international, même si la majeure partie du pétrole national de ce pays est généralement vendue aux consommateurs à l'intérieur de ses frontières.",
          "D. Les pays à marché ouvert qui exportent peu ou pas de leur pétrole peuvent maintenir des prix intérieurs stables, même lorsque les prix internationaux du pétrole augmentent fortement.",
          "E. Si les prix internationaux du pétrole augmentent, les distributeurs nationaux de pétrole dans les pays à marché ouvert commenceront à importer plus de pétrole qu'ils n'en exportent."],
        correctAnswer: "C"
      },
      {
        question: "Si vous deviez noter votre niveau de confusion à la suite de cet exercice, vous diriez avoir été:",
        answers: ["Pas confus", "Légèrement confus", "Moyennement confus", "Très confus"],
      },

      {
        question: "<p><mark>Des explosions de météorites dans l'atmosphère terrestre aussi grandes que celle qui a détruit les forêts en Sibérie, \
        avec approximativement la force d'une explosion nucléaire de douze mégatonnes, se produisent environ une fois par siècle.\
        La réponse de systèmes hautement automatisés contrôlés par des programmes informatiques complexes à des circonstances inattendues est imprévisible.</mark></p>\
        <p>En considérant les informations ci-dessus comme vraies, laquelle des conclusions suivantes est la plus probable,  \
        au sujet d'un système de défense antimissile nucléaire hautement automatisé contrôlé par un programme informatique complexe ?</p>",
        answers: [
          "A. Un siècle après sa construction, le système réagirait de manière inappropriée et pourrait déclencher accidentellement une guerre nucléaire.",
          "B. Le système serait détruit si une explosion d'une grosse météorite se produisait dans l'atmosphère terrestre.",
          "C. Il serait impossible pour le système de distinguer l'explosion d'une grosse météorite de l'explosion d'une arme nucléaire.",
          "D. La réponse inappropriée du système à l'explosion d'une grosse météorite dépendra de l'emplacement de l'explosion.",
          "E. Il n’est pas certain de ce que serait la réponse du système à l’explosion d’une grosse météorite, si ses concepteurs n’ont pas prévu une telle éventualité."],
        correctAnswer: "E"
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
          <div class="question">Partie 2 Test de raisonnement critique : Exemple</div>
           <p>${currentQuestion.question}</p>
         </div>`
      );
    }

    else {
      output.push(
        `<div class="slide">
          <div class="question">Partie 2 Test de raisonnement critique : À vous de jouer !</div>
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
//Store level of difficulty: number of digits
var nbDigits = 6;

//Store the sequence that the participant has to remember
var sequence;

//Store the input sequence
var inputSequence = "";

//Store which digit is currently compared with the input field
var currDigit = 0;

//Store user's entered digit
var inputNbr;

//Time for between displaying each digit of the sequence (ms)
var count = 1100;

//Time each displayed digit lasts on screen
var count2 = 700;

//Display each digit within the interval
var interVar;

//Get start button
var startButtom;

//Get start button
var startButtom;

//Get end button
var endButton;

//Get current answer, we stop after maxAnswers from the participant
var currentAnswer = 0;

//Maximum answers before the end of the experiment
var maxAnswers = 4;

//get confusion self-report
var confHtml;

//get radio buttons of confusion self-report
var questConf;

//Record time elapsed since the beginning of the exercice
var timeElapsed = 0.00;

//set the interval
var timerID = -1;

//Save result of the exercice
var rowResult = [];

//Save all results
var results = [['serie', 'exercice', 'time_exercice_begin', 'answer', 'time_exercice_ends', 'taken_time', 'self_reported_conf_lvl']];


window.addEventListener('DOMContentLoaded', (event) => {

  //Increase the timer
  function tickTimer() {
    timeElapsed++;
    console.log("time: "+timeElapsed);
  }

  //Start a timer store how long does it take to the user to complete the exercice
  function startTimer() {
    if(timerID == -1){
        timerID = setInterval(tickTimer, 1000);
    }
  }

  //Stop the timer
  function stopTimer() {
    if(timerID != -1){
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

  //Generate a sequence of nbDigits
  function GenerateSequence(nbDigits) {
    sequence = Math.random().toString().slice(2, nbDigits + 2);
    //console.log("sequence: " + sequence);
    /*
    Math.random()                         ->  0.12345678901234
                 .toString()              -> "0.12345678901234"
                            .slice(2,11)  ->   "123456789"
     */
  }

  //Display the sequence to remember
  function DisplaySequence() {
    startTimer();
    SaveSerieNumber();
    rowResult.push(currentAnswer); //save exercice number
    rowResult.push(GetCurrentDate()); //save date
    startButtom.style.display = "none";

    document.getElementById("sub-title").innerHTML = "<div class='question'>Partie 5 Test de mémoire de travail: À vous de jouer !</div>";
    document.getElementById("nbdigits").innerHTML = nbDigits + " chiffres à mémoriser: ";

    if (currDigit < nbDigits) {
      interVar = setInterval(DisplayNextDigit, count);
    }
  }

  //Display next digit of the sequence
  function DisplayNextDigit() {
    if (currDigit == nbDigits) {
      currDigit = 0;
      clearInterval(interVar);
      inputNbr.style.display = "inline-block";
      return;
    }

    document.getElementById("alarmmsg").innerHTML = sequence[currDigit];

    setTimeout(function () {
      document.getElementById("alarmmsg").innerHTML = '';
    }, count2);
    currDigit = currDigit + 1;
  }

  //Check if the sequence entered by the user is correct
  function ValidInputSequence() {
    inputNbr.addEventListener('keyup', function () {

        inputSequence += inputNbr.value;
        GoToNextDigit(); //keep going
      
      if (currDigit == nbDigits) {

        //console.log("inputseq "+inputSequence);
        //console.log("seq "+sequence);
        if(inputSequence == sequence){
          rowResult.push("true"); //save exercice result
        }
        else{
          rowResult.push("false"); 
        }  
        NextLevel();
      }
    });
  }

  //Entered digit is correct
  function GoToNextDigit() {
    inputNbr.value = "";
    currDigit = currDigit + 1;
  }

  //The entire entered sequence is correct, increase the level
  function NextLevel() {
    rowResult.push(GetCurrentDate()); //save date
    rowResult.push(timeElapsed); //save time
    resetTimer();
    inputNbr.value = "";
    inputSequence = "";
    currDigit = 0;
    nbDigits = nbDigits + 1;
    GenerateSequence(nbDigits);
    //startButtom.style.display = "inline-block";
    inputNbr.style.display = "none";
    document.getElementById("nbdigits").innerHTML = "Niveau suivant, augmentation de la difficulté. " + nbDigits + " chiffres à mémoriser.";
    confHtml.style.display = "inline-block";

  }

  //Get Dom elements
  function GetDomElements() {
    startButtom = document.getElementById("start");
    inputNbr = document.getElementById('inputNbr');
    inputNbr.style.display = "none";
    confHtml = document.getElementById("conf-html");
    confHtml.style.display = "none";

    questConf = document.getElementsByClassName("confRadio");
  }

  //Add to rowresult the number of the serie (question_type)
  function SaveSerieNumber() {
    rowResult.push("4");
  }

  GenerateSequence(nbDigits);
  GetDomElements();

  startButtom.addEventListener("click", DisplaySequence);

  ValidInputSequence();

});

//If the user selected a confusion level then he can go to next exercice
function ValidSelfConfusionReport() {
  for (var i = 0; i < questConf.length; i++) {
    if (questConf[i].checked && currentAnswer == maxAnswers-1) {
      rowResult.push(questConf[i].value); //save self-conf answer
      LastSlideSave();
      confHtml.style.display = "none";
      questConf[i].checked = false;
      DisplayEndExperiment();
      return;
    }

    else if (questConf[i].checked) {
      rowResult.push(questConf[i].value); //save self-conf answer
      results = results.concat([rowResult]);
      console.dir("row_res: " + JSON.stringify(rowResult));
      console.dir("resultat: " + JSON.stringify(results));
      rowResult = [];
      currentAnswer = currentAnswer + 1;

      //TODO: Save self confusion level
      confHtml.style.display = "none";
      questConf[i].checked = false;
      startButtom.style.display = "inline-block";
    }
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

//Clear screen and display message when it is the end of the experiment
function DisplayEndExperiment() {
  document.getElementById("nbdigits").innerHTML = "";
  document.getElementById("output").innerHTML = "L'expérience est terminée, merci pour votre participation !";
  inputNbr.style.display = "none";
}

//Save last slide
function LastSlideSave() {
  results = results.concat([rowResult]);
  console.dir("resultat: " + JSON.stringify(results));
  rowResult = [];

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + ':' + time;

  exportToCsv(dateTime + '_serie4.csv', [
    results[0],
    results[1],
    results[2],
    results[3],
    results[4],
  ])
}

function GetCurrentDate(){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds();
  let dateTime = date+' '+time;
  console.log(dateTime);
  return dateTime;
}

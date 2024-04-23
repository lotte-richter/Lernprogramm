"use strict";

//let p, v, m;
document.addEventListener("DOMContentLoaded", function () {
  let m = new Model();
  let p = new Presenter();
  let v = new View(p);
  p.setModelAndView(m, v);
  p.setTask(); // Frage für die aktuelle Kategorie laden
});

// ############# Model ###########################################################################
class Model {
  constructor() {
    this.questions = {
      "teil-mathe": [
        {"a":"x^2+x^2", "l":["2x^2","x^4","x^8","2x^4"]},
        {"a":"x^2*x^2", "l":["x^4","x^2","2x^2","4x"]}
      ],
      "teil-internettechnologien": [
        {"a":"Welche Authentifizierung bietet HTTP", "l":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
        {"a":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "l":["UDP","TCP","HTTP","Fast Retransmit"]}
        // Weitere Fragen für Internettechnologien hier hinzufügen
      ],
      "teil-allgemein": [
        {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]}
        // Weitere Fragen für Allgemeinwissen hier hinzufügen
      ],
      "teil-noten": [
        {"a":"C4", "l":["C","D","E","H"]},
        {"a":"(C4 E4 G4)", "l":["C","H","F","D"]}
        // Weitere Fragen für Noten hier hinzufügen
      ]
    };
  }

  // Holt eine Frage aus dem Array, zufällig ausgewählt oder vom Server
  getTask(category) {
    let categoryQuestions = this.questions[category];
    console.log("Wechsel zu Kategorie: ", category);
    /* Wähle zufällige Frage aus der Liste*/
    let randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    return categoryQuestions[randomIndex];
  }
  checkAnswer() {
    // TODO
  }
}

// ############ Presenter ########################################################################
class Presenter {
  constructor() {
    this.category = "teil-mathe"; // Standardkategorie
    this.questionNumber = 0;
  }

  setModelAndView(m, v) {
    this.m = m;
    this.v = v;
  }

  changeCategory(category){
    this.category = category;
    this.setTask();
  }

  // Holt eine neue Frage aus dem Model und setzt die View
  setTask() {
    let question = this.m.getTask(this.category);
    this.v.renderQuestion(question);
    // for (let i = 0; i < 4; i++) {
    //   let wert = "42";
    //   let pos = i;
    //   View.inscribeButtons(i, wert, pos); // Tasten beschriften -> View -> Antworten
    // }
  }

  // Prüft die Antwort, aktualisiert Statistik und setzt die View
  checkAnswer(answer) {
    console.log("Antwort: ", answer);
  }
}

// ##################### View #####################################################################
class View {
  constructor(p) {
    this.p = p; // Presenter
    this.setHandler();
  }

  setHandler() {
    // use capture false -> bubbling (von unten nach oben aufsteigend)
    // this soll auf Objekt zeigen -> bind (this)
    document.getElementById("answer-container").addEventListener("click", this.checkEvent.bind(this), false);

    // setze Handler für Kategorieauswahl
    document.querySelectorAll('input[name="note"]').forEach(radio => {
      radio.addEventListener('change',() => {
        this.p.changeCategory(radio.value);
      });
    });
  }

  renderQuestion(question){
    // Leere Container question-container
    let questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML='';

    // Erstellen des Frage-Elements
    let questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.textContent = question.a;
    questionContainer.appendChild(questionDiv); // Anhängen des Frage-Elements

    // Leere Container answer
    let answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML='';

    // Erstellen und anzeigen der Antwort-Buttons
    // let answersDiv = document.createElement('div');
    // answersDiv.classList.add('answers');
    // questionContainer.appendChild(answersDiv);

    let shuffledAnswers = question.l.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach((answer,index) => {
      let button = document.createElement('button');
      button.textContent = answer;
      button.setAttribute('data-index', index);
      answerContainer.appendChild(button);
    });
  }

  start() {
    this.p.setTask();
  }

  static inscribeButtons(i, text, pos) {
    document.querySelectorAll("#answer > *")[i].textContent = text;
    document.querySelectorAll("#answer > *")[i].setAttribute("number", pos);
  }

  checkEvent(event) {
    console.log(event.type);
    if (event.target.nodeName === "BUTTON") {
      this.p.checkAnswer(
        Number(event.target.attributes.getNamedItem("number").value)
      );
    }
  }

  // static renderText(text) {
  //   //this.clearElement("boo");
  //   let div = document.getElementById("boo");
  //   let p = document.createElement("p");
  //   p.innerHTML = text;
  //   div.appendChild(p);
  // }
}

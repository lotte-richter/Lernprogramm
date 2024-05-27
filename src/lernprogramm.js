"use strict";

const TOTAL_QUESTIONS = 10;// Anzahl Fragen bis eine Progress Bar voll ist
const SERVER_QUESTIONS = 2; // Anzahl der Fragen, die vom Server geholt werden * 10

document.addEventListener("DOMContentLoaded", function () {
  let m = new Model();
  let p = new Presenter();
  let v = new View(p);
  p.setModelAndView(m, v);
  for(var i=0; i<SERVER_QUESTIONS;i++){
    fetchQuizzes(i);
  }
  document.getElementById("mathe").checked = true;
  document.getElementById('header').textContent = "Mathe";
  p.setTask(); // Frage für die aktuelle Kategorie laden

// Funktion zum Abrufen einer Aufgabe vom externen Server
  function fetchQuizzes(pageNumber){
    fetch("https://idefix.informatik.htw-dresden.de:8888/api/quizzes?page="+pageNumber, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("test@gmail.com:secret")
      },
      redirect: "follow"
    })
      .then(response => {
        if(!response.ok){
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        if(data.content && data.content.length > 0){
          data.content.forEach(question => {
            m.addQuestion({
              id: question.id,
              a: question.text,
              l: question.options
            });
          });
          console.log('Fragen erfolgreich hinzugefügt.');
        } else {
          console.log('Keine Fragen gefunden.');
        }
      })
      .catch(error => {
        console.error('Fetch error: ',error);
      });
  }
});

// ############# Model ###########################################################################
class Model {
  constructor() {
    this.questions = {
      "teil-mathe": [
        {"a":"x^2+x^2", "l":["2x^2","x^4","x^8","2x^4"]},
        {"a":"x^2 \\cdot x^2", "l":["x^4","x^2","2x^2","4x"]},
        {"a":"2x^3 + 3x^3", "l":["5x^3","6x^6","5x^6","6x^3"]},
        {"a":"2x^4 - x^4", "l":["x^4","-x^4","x^8","x^2"]},
        {"a":"3x^2 \\cdot 2x^3", "l":["6x^5","5x^6","6x^6","5x^5"]},
        {"a":"4x^3 + 2x^3", "l":["6x^3","8x^6","6x^6","8x^3"]},
        {"a":"5x^4 - 3x^4", "l":["2x^4","8x^4","-2x^4","-8x^4"]},
        {"a":"2x^2 \\cdot 3x^3", "l":["6x^5","5x^6","6x^6","5x^5"]},
        {"a":"3x^3 + 4x^3", "l":["7x^3","12x^6","7x^6","12x^3"]},
        {"a":"4x^4 - 2x^4", "l":["2x^4","-2x^4","2x^8","-2x^8"]},
        {"a":"2x^3 \\cdot x^3", "l":["2x^6","x^9","x^6","2x^9"]},
        {"a":"5x^2 + x^2", "l":["6x^2","25x^4","6x^4","25x^2"]},
        {"a":"3x^4 - x^4", "l":["2x^4","x^4","2x^8","x^8"]},
        {"a":"2x^3 \\cdot 3x^2", "l":["6x^5","5x^6","6x^6","5x^5"]},
        {"a":"4x^2 + 3x^2", "l":["7x^2","12x^4","7x^4","12x^2"]},
        {"a":"5x^3 - 2x^3", "l":["3x^3","7x^6","3x^6","7x^3"]},
        {"a":"3x^2 \\cdot x^3", "l":["3x^5","x^6","x^5","3x^6"]},
        {"a":"4x^3 + 5x^3", "l":["9x^3","20x^6","9x^6","20x^3"]},
        {"a":"2x^4 - 3x^4", "l":["-x^4","x^4","-x^8","x^8"]},
        {"a":"2x^3 \\cdot 2x^2", "l":["4x^5","2x^6","4x^6","2x^5"]},
        {"a":"3x^2 + 2x^2", "l":["5x^2","6x^4","5x^4","6x^2"]},
        {"a":"4x^3 - 3x^3", "l":["x^3","7x^6","x^6","7x^3"]}
      ],
      "teil-internettechnologien": [
        {"a":"Welche Authentifizierung bietet HTTP", "l":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
        {"a":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "l":["UDP","TCP","HTTP","Fast Retransmit"]},
        {"a":"Welche Verschlüsselungstechnologie wird für sichere Webseiten verwendet?", "l":["SSL/TLS","AES","RSA","DES"]},
        {"a":"Was ist ein DNS-Server?", "l":["Auflösung von IP-Adressen","E-Mails übertragen","Webseiten hosten","Datenbankabfragen verarbeiten"]},
        {"a":"Was ist ein VPN?", "l":["Sichere Verbindung über Netzwerk","Verschlüsselung für E-Mails","Fehlerkorrektur bei Übertragung","Verteilung von Videos"]},
        {"a":"Welches Protokoll wird häufig für die Übertragung von E-Mails verwendet?", "l":["SMTP","FTP","HTTP","SSH"]},
        {"a":"Was ist ein Router?", "l":["Datenpakete weiterleiten","Drahtlose Übertragung","Internetzugang ermöglichen","Webseitenzugriff kontrollieren"]},
        {"a":"Welches Protokoll wird häufig für das Abrufen von Webseiten verwendet?", "l":["HTTP","FTP","SMTP","DNS"]},
        {"a":"Was ist eine Firewall?", "l":["Sicherheitsvorrichtung Datenverkehr kontrolliert","Netzwerküberwachung","Benutzeraktivitäten analysieren","Datenwiederherstellung"]},
        {"a":"Welches Protokoll wird für die sichere Übertragung von Dateien verwendet?", "l":["SFTP","HTTP","SMTP","UDP"]},
        {"a":"Was ist ein Proxy-Server?", "l":["Vermittler zwischen Client und Internet","Netzwerküberwachung","Datenverschlüsselung","Zentraler Dateispeicher"]},
        {"a":"Welches Protokoll wird für die sichere Übertragung von Webseiten verwendet?", "l":["HTTPS","FTP","SMTP","TCP"]},
        {"a":"Was ist ein DNS-Cache?", "l":["Temporäre Speicherung DNS-Anfragen","DNS-Sicherheitsvorrichtung","Spezielles Netzwerk DNS-Server","Spezielle DNS-Server"]},
        {"a":"Was ist ein Load Balancer?", "l":["Verteilung der Netzwerklast","Internetgeschwindigkeitserhöhung","Datenverkehrüberwachung","WLAN-Signalverstärkung"]},
        {"a":"Welche Authentifizierungsmethode verwendet ein Fingerabdruckscanner?", "l":["Biometrische Authentifizierung","OAuth","OTP","2-Faktor-Authentifizierung"]},
        {"a":"Was ist eine MAC-Adresse?", "l":["Eindeutige Kennung für Netzwerkgeräte","Kennung für Webseiten","Spezielle IP-Adresse","Verschlüsselung drahtlose Netzwerke"]},
        {"a":"Welches Protokoll wird für die Fernsteuerung von Computern verwendet?", "l":["RDP","FTP","HTTP","UDP"]},
        {"a":"Was ist ein DoS-Angriff?", "l":["Angriff Überlastung Dienst","Netzwerkeindringen","Passwortdiebstahl","Datenmanipulation"]},
        {"a":"Was ist ein NAT?", "l":["Network Address Translation","Drahtlose Verschlüsselung","Spezielle Firewall","Netzwerkzugriffsauthentifizierung"]},
        {"a":"Welche Technologie ermöglicht die drahtlose Kommunikation zwischen Geräten in der Nähe?", "l":["Bluetooth","Ethernet","DSL","Wi-Fi"]},
        {"a":"Was ist ein Port?", "l":["Dienstidentifikator","Datenübertragungskabel","Drahtlose Verschlüsselung","Netzwerkzugriffsauthentifizierung"]},
        {"a":"Welches Protokoll wird für die automatische Konfiguration von IP-Adressen verwendet?", "l":["DHCP","DNS","FTP","HTTP"]}
      ],
      "teil-allgemein": [
        {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]},
        {"a":"Wer schrieb das Buch 'Faust'?", "l":["Johann Wolfgang von Goethe","Friedrich Schiller","Heinrich Heine","Thomas Mann"]},
        {"a":"Wie heißt die Hauptstadt von Frankreich?", "l":["Paris","Berlin","London","Rom"]},
        {"a":"In welchem Jahr landeten die ersten Menschen auf dem Mond?", "l":["1969","1954","1975","1982"]},
        {"a":"Wer malte die Mona Lisa?", "l":["Leonardo da Vinci","Vincent van Gogh","Pablo Picasso","Michelangelo"]},
        {"a":"Was ist die Hauptstadt von Spanien?", "l":["Madrid","Barcelona","Rom","Paris"]},
        {"a":"Wer war der erste Präsident der Vereinigten Staaten?", "l":["George Washington","Abraham Lincoln","Thomas Jefferson","John F. Kennedy"]},
        {"a":"Wie viele Kontinente gibt es auf der Erde?", "l":["Sieben","Fünf","Zehn","Vier"]},
        {"a":"In welchem Jahr begann der Erste Weltkrieg?", "l":["1914","1905","1920","1939"]},
        {"a":"Welcher Planet ist der größte im Sonnensystem?", "l":["Jupiter","Mars","Venus","Saturn"]},
        {"a":"Wer schrieb 'Romeo und Julia'?", "l":["William Shakespeare","Johann Wolfgang von Goethe","Friedrich Schiller","Hermann Hesse"]},
        {"a":"Wie viele Minuten hat eine Stunde?", "l":["60","30","45","90"]},
        {"a":"Was ist die Hauptstadt von Italien?", "l":["Rom","Mailand","Florenz","Venedig"]},
        {"a":"In welchem Jahr fiel die Berliner Mauer?", "l":["1989","1975","1991","1963"]},
        {"a":"Wer entdeckte die Schwerkraft?", "l":["Isaac Newton","Albert Einstein","Galileo Galilei","Nikola Tesla"]},
        {"a":"Was ist die Hauptstadt von Deutschland?", "l":["Berlin","München","Hamburg","Frankfurt"]},
        {"a":"Wie viele Sekunden hat eine Minute?", "l":["60","30","45","90"]},
        {"a":"Wer komponierte die 'Ode an die Freude'?", "l":["Ludwig van Beethoven","Wolfgang Amadeus Mozart","Johann Sebastian Bach","Frédéric Chopin"]},
        {"a":"In welchem Jahr wurde die amerikanische Unabhängigkeitserklärung unterschrieben?", "l":["1776","1789","1801","1820"]},
        {"a":"Wer war der erste Mensch im Weltall?", "l":["Juri Gagarin","Neil Armstrong","Buzz Aldrin","Yuri Gagarin"]},
        {"a":"Wie viele Beine hat eine Spinne?", "l":["Acht","Sechs","Zehn","Vier"]}
      ],
      "teil-noten": [
        {"a":"C4", "l":["C","D","E","H"]},
        {"a":"(C4 E4 G4)", "l":["C","H","F","D"]}
        // Weitere Fragen für Noten hier hinzufügen
      ],
      "teil-server":[/*{"id": "102", "a":"(C4 E4 G4)", "l":["C","H","F","D"]}*/],
    };
  }



  // Hinzufügen einer Frage zur Kategorie Quizserver
  addQuestion(question){
    this.questions["teil-server"].push(question);
  }

  // Holt eine Frage aus dem Array, zufällig ausgewählt oder vom Server
  getTask(category) {
    let categoryQuestions = this.questions[category];
    console.log("Wechsel zu Kategorie: ", category);
    /* Wähle zufällige Frage aus der Liste*/
    let randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    return categoryQuestions[randomIndex];
  }
}

// ############ Presenter ########################################################################
class Presenter {
  constructor() {
    this.category = "teil-mathe"; // Standardkategorie
  }

  setModelAndView(m, v) {
    this.m = m;
    this.v = v;
  }

  changeCategory(category){
    this.category = category;

    let categoryId = document.querySelector('input[name="note"]:checked').id;
    let categoryName = document.querySelector(`label[for="${categoryId}"]`).textContent;
    document.getElementById('header').textContent = categoryName;

    // Auswertung ausblenden
    let rightProgress = parseFloat(document.getElementById("pOk").value);
    let wrongProgress = parseFloat(document.getElementById("pNok").value);

    if(rightProgress === 10 || wrongProgress === 10){
      document.getElementById("evaluation-container").innerHTML='';
      document.getElementById("pOk").value = 0;
      document.getElementById("pNok").value = 0;
      document.getElementById("text").textContent="Wähle die passende Antwort!";
    }

    this.setTask();
  }

  // Holt eine neue Frage aus dem Model und setzt die View
  setTask() {
    let question = this.m.getTask(this.category);
    if(this.category === "teil-server"){
      this.questionId = question.id;
    }
    this.v.renderQuestion(question);
  }

  // Prüft die Antwort, aktualisiert Statistik und setzt die View
  checkAnswer(answer) {
    console.log("Antwort: ", answer);

    if(this.category === "teil-server"){
      this.sendAnswerToServer(this.questionId, answer)
        .then(isCorrect => {
          console.log("data.success: ", isCorrect);
          if(isCorrect){
            this.v.updateProgressBars(0);
            if(parseFloat(document.getElementById("pOk").value) !== 10){
              this.setTask();
            }
            this.checkProgressBar();
          }else {
            this.v.updateProgressBars(1);
            this.checkProgressBar();
          }
        })
        .catch(error => {
          console.error("Error checking answer with server: ",error);
        });
    } else{
      this.v.updateProgressBars(answer);
      this.checkProgressBar();
    }

    if(answer === 0 && this.category !== "teil-server") {
      this.setTask();
    }
  }

  // Funktion zum Senden der Antwort an den Server
  sendAnswerToServer(id,answer){
    return fetch("https://idefix.informatik.htw-dresden.de:8888/api/quizzes/"+id+"/solve", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa("test@gmail.com:secret"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify([answer])
    })
      .then(response => {
        if(!response.ok){
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        return data.success;
      })
      .catch(error => {
        console.error('Error: ', error);
        throw error;
      })
  }

  // Überprüft die Progress-Bars, ob die Auswertung angezeigt werden muss
  checkProgressBar(){
    let rightProgress = parseFloat(document.getElementById("pOk").value);
    let wrongProgress = parseFloat(document.getElementById("pNok").value);

    if(rightProgress === 10 || wrongProgress === 10){
      let correctAnswers = (rightProgress /10) * TOTAL_QUESTIONS;
      let wrongAnswers = (wrongProgress/10) * TOTAL_QUESTIONS;
      this.v.showEvaluation(correctAnswers, wrongAnswers);
    }
  }
}

// ##################### View #####################################################################
class View {
  constructor(p) {
    this.p = p; // Presenter
    this.setHandler();
    this.updateWindowSize();
  }

  setHandler() {
    // use capture false -> bubbling (von unten nach oben aufsteigend)
    // this soll auf Objekt zeigen -> bind (this)
    document.getElementById("answer-container").addEventListener("click", this.checkEvent.bind(this), false);
    document.getElementById("answer-container").addEventListener("mousedown", this.colorOn.bind(this));
    document.getElementById("answer-container").addEventListener("mouseup",this.colorOff.bind(this));

    // setze Handler für Kategorieauswahl
    document.querySelectorAll('input[name="note"]').forEach(radio => {
      radio.addEventListener('change',() => {
        this.p.changeCategory(radio.value);
      });
    });

    window.addEventListener('resize', this.updateWindowSize.bind(this));
  }

  renderQuestion(question){
    // Leere Container question-container
    let questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML='';

    // Erstellen des Frage-Elements
    let questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    // Rendern des math. Ausdrucks mit KaTeX
    if(this.p.category === "teil-mathe"){
      katex.render(question.a, questionDiv);
    } else{
      questionDiv.textContent = question.a;
    }
    questionContainer.appendChild(questionDiv); // Anhängen des Frage-Elements

    // Leere Container answer
    let answerContainer = document.getElementById('answer-container');
    answerContainer.innerHTML='';

    let answerCopy = question.l.slice(); // Kopie des Arrays der Antworten
    let shuffledAnswers = shuffleArray(answerCopy);

    shuffledAnswers.forEach((answer) => {
      let button = document.createElement('button');

      if(this.p.category === "teil-mathe"){
        // Rendern mit KaTeX
        katex.render(answer,button);
      } else{
        button.textContent = answer;
      }

      button.setAttribute('data-index', question.l.indexOf(answer));
      answerContainer.appendChild(button);
    });
  }

  checkEvent(event) {
    console.log(event.type);
    if (event.target.closest('button')) {
      this.p.checkAnswer(
        Number(event.target.closest('button').getAttribute('data-index'))
      );
    }
  }

  colorOn(event) {
    if(this.p.category === "teil-server")
      return;

    let button = event.target.closest('button');
    if(button){
      console.log("colorOn: "+event.type);
      this.color = button.style.backgroundColor;
      if (button.getAttribute('data-index') === "0") {
        button.style.background = "green";
      } else button.style.backgroundColor = "red";
    }
  }

  colorOff(event){
    if(this.p.category === "teil-server")
      return;

    let button = event.target.closest('button');
    if(button){
      button.style.backgroundColor = this.color;
    console.log("colorOff: "+event.type);
    }
  }

  // Methode zum Aktualisieren der Progress bar
  updateProgressBars(answer){
    if(answer === 0){
      document.getElementById("pOk").value += (1/TOTAL_QUESTIONS * 10);
      console.log("right progress bar: ",document.getElementById("pOk").value);
    } else{
      document.getElementById("pNok").value += (1/TOTAL_QUESTIONS * 10);
      console.log("wrong progress bar: ",document.getElementById("pNok").value);
    }
  }

  // Methode zum Anzeigen der Auswertung
  showEvaluation(correctAnswers, wrongAnswers){
    // Verstecke das Frage- und Antwort-Element
    document.getElementById("question-container").innerHTML='';
    document.getElementById("answer-container").innerHTML='';
    document.getElementById("text").innerHTML='';

    // Erstellung des Auswertung-Elements
    let evaluationContainer = document.getElementById("evaluation-container");
    evaluationContainer.innerHTML='';

    // Überschrift
    let heading = document.createElement('h2');
    heading.textContent="Auswertung";
    evaluationContainer.appendChild(heading);

    // Element: Richtige Antworten
    let correctAnswerElement = document.createElement('p');
    correctAnswerElement.textContent = `Richtig beantwortete Fragen: ${correctAnswers}`;
    evaluationContainer.appendChild(correctAnswerElement);

    // Element: Falsche Antworten
    let wrongAnswerElement = document.createElement('p');
    wrongAnswerElement.textContent = `Falsch beantwortete Fragen: ${wrongAnswers}`;
    evaluationContainer.appendChild(wrongAnswerElement);

    // Element: Button - Weiter Lernen
    let continueButton = document.createElement('button');
    continueButton.textContent = "Weiter Lernen";
    continueButton.setAttribute('id','continue-button');
    document.getElementById("evaluation-container").appendChild(continueButton);

    // Setze Handler für "Weiter Lernen" Button
    document.getElementById("continue-button").addEventListener("click", this.continueLearning.bind(this));
  }

  continueLearning(){
    document.getElementById("evaluation-container").innerHTML='';
    document.getElementById("pOk").value = 0;
    document.getElementById("pNok").value = 0;
    document.getElementById("text").textContent="Wähle die passende Antwort!";
    this.p.setTask();
  }

  updateWindowSize(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    document.getElementById('window-size').textContent= `${width} x ${height}`;
  }
}

// Funktion zum Mischen eines Arrays (Antworten)
function shuffleArray(array){
  for(let i=0; i<array.length; i++){
    const j = Math.floor(Math.random() * (i+1));
    [array[i],array[j]] = [array[j],array[i]];
  }
  return array;
}

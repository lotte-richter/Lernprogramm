
# Lernprogramm
Beleg webbasiertes Lernprogramm

Name: Lotte Richter

E-Mail: s85482@htw-dresden.de

Matrikelnummer: 53042

# Genutzte Browser:
Während der Entwicklung des Programmes wurde ausschließlich mit Firefox gearbeitet.
Es gibt eine CSS-Formatierung der Progress Bars, die nur mit Firefox funktioniert. Wenn ein anderer Browser genutzt wird, muss man die entsprechende Stelle ändern (steht im Code markiert).

# Eventuelle Probleme
* Es kann zu einem Formatierungs-Problem kommen, wie es beim Browser oben erklärt ist.
* Wenn man sich nicht im Netz der HTW Dresden verbindet, kann man den Quizserver nicht benutzen, da dieser nur HTW intern erreichbar ist.

# Konfigurationen
Es gibt zwei Konstanten in der JavaScript Datei, die geändert werden können:

## TOTAL_QUESTIONS
Diese Konstante gibt die Anzahl an Antworten an, die es braucht bis eine Progress Bar 100% erreicht hat. Derzeit ist TOTAL_QUESTIONS = 10, das heißt wenn 10 Fragen richtig beantwortet wurden, wird die Auswertung angezeigt.
Wenn man die Konstate erhöht, braucht es mehr Fragen bis die Auswertung angezeigt wird.

## SERVER_QUESTIONS
Diese Konstante gibt die Anzahl der Pages an, die vom Server geladen werden. Auf einer Page stehen zehn Fragen, welche in die Datenbank aufgenommen werden, aus der die Fragen zufällig geladen werden.

# Aufgabenstellung
Die Aufgabenstellung besteht aus den Teilen (die Github-Nutzung wird für diesen Beleg sehr empfohlen):
* [Aufgabenstellung](Beleg-Aufgabenstellung.md)
* [Abgabeformat](Beleg-Abgabeformat.md)
* [Git/Github-Nutzung](https://github.com/HTWDD-RN/RTSP-Streaming/blob/master/git.md).

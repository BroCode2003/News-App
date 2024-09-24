function appendOperation(value) {
    // Logik, um den Wert zur aktuellen Operation hinzuzufügen
    let resultArea = document.getElementById('resultArea');
    resultArea.innerText += value;
}

function deleteOperation() {
    // Logik, um die letzte Eingabe zu löschen
    let resultArea = document.getElementById('resultArea');
    resultArea.innerText = resultArea.innerText.slice(0, -1);
}

function calculateResult() {
    // Logik, um das Ergebnis zu berechnen
    let resultArea = document.getElementById('resultArea');
    resultArea.innerText = eval(resultArea.innerText.replace('x', '*'));
}

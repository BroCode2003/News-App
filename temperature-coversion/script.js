// Referenz auf das Eingabefeld, in das der Benutzer eine Zahl eingibt (z.B. eine Temperatur)
const textBox = document.getElementById('textBox');

// Referenz auf den Button, der den Wert in Fahrenheit umwandelt
const toFahrenheit = document.getElementById('toFahrenheit');

// Referenz auf den Button, der den Wert in Celsius umwandelt
const toCelsius = document.getElementById('toCelsius');

// Referenz auf das Element, in dem das Ergebnis der Umwandlung angezeigt wird
const result = document.getElementById('result');

// Funktion, die die Umwandlung durchführt
function convert() {
    // Hole den Wert aus dem Eingabefeld und wandle ihn in eine Zahl um
    let value = Number(textBox.value);

    // Überprüfe, welcher Button geklickt wurde (zu Fahrenheit oder zu Celsius)
    if (toFahrenheit.checked) {
        // Wenn der Benutzer Fahrenheit ausgewählt hat, wandle den Wert in Fahrenheit um
        let fahrenheit = (value * 9/5) + 32;
        // Zeige das Ergebnis im result-Element an
        result.textContent = `${value}°C is ${fahrenheit.toFixed(2)}°F`;
    } else if (toCelsius.checked) {
        // Wenn der Benutzer Celsius ausgewählt hat, wandle den Wert in Celsius um
        let celsius = (value - 32) * 5/9;
        // Zeige das Ergebnis im result-Element an
        result.textContent = `${value}°F is ${celsius.toFixed(2)}°C`;
    } else {
        // Wenn kein Button ausgewählt wurde, zeige eine Fehlermeldung an
        result.textContent = "Please select a conversion option!";
    }
}

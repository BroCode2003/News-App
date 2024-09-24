const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "2a70775189203b5a133417eb1a1291d1";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json()
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather } = data;

    card.textContent = "";
    card.style.display = "flex";

    // Hier können Sie die erhaltenen Daten weiterverarbeiten und in Ihrer Karte anzeigen
    // Beispiel:
    const cityName = document.createElement("h1");
    cityName.textContent = city;

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${temp}°C`;

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;

    const weatherDescription = document.createElement("p");
    weatherDescription.textContent = `Weather: ${weather[0].description}`;

    card.appendChild(cityName);
    card.appendChild(temperature);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherDescription);
}


function getWeatherEmoji(weatherId) {
    // Hier können Sie die Zuordnung von Wetter-IDs zu Emojis erweitern
    // Diese Zuordnung ist nur ein Beispiel, Sie können dies je nach Ihren Anforderungen anpassen
    const emojiMap = {
        200: "⛈️", // Gewitter
        300: "🌧️", // Nieselregen
        500: "🌧️", // Leichter Regen
        800: "☀️", // Klarer Himmel
        200: "⛈️", // Gewitter mit leichtem Regen
        201: "⛈️", // Gewitter mit Regen
        202: "⛈️", // Gewitter mit starkem Regen
        210: "🌩️", // Leichtes Gewitter
        211: "🌩️", // Gewitter
        212: "🌩️", // Schweres Gewitter
        221: "🌩️", // Zerstreute Gewitter
        230: "⛈️", // Gewitter mit leichtem Nieselregen
        231: "⛈️", // Gewitter mit Nieselregen
        232: "⛈️", // Gewitter mit starkem Nieselregen
        300: "🌧️", // Leichter Nieselregen
        301: "🌧️", // Nieselregen
        302: "🌧️", // Starker Nieselregen
        310: "🌧️", // Leichter Nieselregen mit Regen
        311: "🌧️", // Nieselregen mit Regen
        312: "🌧️", // Starker Nieselregen mit Regen
        313: "🌧️", // Regenschauer und Nieselregen
        314: "🌧️", // Schwerer Regenschauer und Nieselregen
        321: "🌧️", // Nieselregen-Schauer
        500: "🌧️", // Leichter Regen
        501: "🌧️", // Mäßiger Regen
        502: "🌧️", // Starker Regen
        503: "🌧️", // Sehr starker Regen
        504: "🌧️", // Extreme Regenfälle
        511: "🌨️", // Gefrierender Regen
        520: "🌧️", // Leichte Regenschauer
        521: "🌧️", // Regenschauer
        522: "🌧️", // Schwerer Regenschauer
        531: "🌧️", // Zerstreute Regenschauer
        600: "🌨️", // Leichter Schneefall
        601: "🌨️", // Schneefall
        602: "🌨️", // Schwerer Schneefall
        611: "🌨️", // Graupel
        612: "🌨️", // Schnee mit Graupel
        613: "🌨️", // Leichte Schneeschauer mit Graupel
        615: "🌨️", // Leichter Regen und Schnee
        616: "🌨️", // Regen und Schnee
        620: "🌨️", // Leichte Schneeschauer
        621: "🌨️", // Schneeschauer
        622: "🌨️", // Schwere Schneeschauer
        701: "🌫️", // Nebel
        711: "🌫️", // Rauch
        721: "🌫️", // Dunst
        731: "🌫️", // Sand, Staubwirbel
        741: "🌫️", // Nebel
        751: "🌫️", // Sand
        761: "🌫️", // Staub
        762: "🌋", // Vulkanausbruch
        771: "🌬️", // Stürmische Winde
        781: "🌪️", // Tornado
        800: "☀️", // Klarer Himmel
        801: "🌤️", // Einige Wolken
        802: "⛅", // Verstreute Wolken
        803: "🌥️", // Gebrochene Bewölkung
        804: "☁️", // Überwiegend bewölkt
    };

    // Standard-Emoji, falls keine Übereinstimmung gefunden wurde
    const defaultEmoji = "❓";

    // Überprüfen Sie, ob die Wetter-ID in der Zuordnung vorhanden ist, andernfalls verwenden Sie das Standard-Emoji
    const emoji = emojiMap[weatherId] || defaultEmoji;

    return emoji;
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityName = document.createElement("h1");
    cityName.textContent = city;

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${temp}°C`;

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;

    const weatherDescription = document.createElement("p");
    weatherDescription.textContent = `Weather: ${weather[0].description}`;

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = `Emoji: ${getWeatherEmoji(weather[0].id)}`;

    card.appendChild(cityName);
    card.appendChild(temperature);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherDescription);
    card.appendChild(weatherEmoji);
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay);
}

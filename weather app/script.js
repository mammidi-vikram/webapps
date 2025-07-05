const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace this with your actual key

// Warn if API key is placeholder
if (!API_KEY || API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
  document.getElementById("config-warning").classList.remove("hidden");
}

const getWeatherBtn = document.getElementById("get-weather-btn");
const spinner = document.getElementById("loading-spinner");
const weatherDisplay = document.getElementById("weather-display");
const errorMessage = document.getElementById("error-message");

getWeatherBtn.addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();
  weatherDisplay.classList.add("hidden");
  errorMessage.classList.add("hidden");

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.classList.remove("hidden");
    return;
  }

  spinner.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or invalid API key.");
    }

    const data = await response.json();

    document.getElementById(
      "location-name"
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById(
      "temperature"
    ).textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById(
      "description"
    ).textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById(
      "weather-icon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather-icon").alt = data.weather[0].description;

    weatherDisplay.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  } finally {
    spinner.classList.add("hidden");
  }
});

// 🌙 Dark Mode Toggle
document.getElementById("dark-toggle").addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
});

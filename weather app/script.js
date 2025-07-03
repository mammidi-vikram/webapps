const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

document.getElementById("get-weather-btn").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();
  const weatherDisplay = document.getElementById("weather-display");
  const errorMessage = document.getElementById("error-message");

  weatherDisplay.classList.add("hidden");
  errorMessage.classList.add("hidden");

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("location-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather-icon").alt = data.weather[0].description;

    weatherDisplay.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});

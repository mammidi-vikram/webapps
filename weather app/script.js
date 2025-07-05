const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const loading = document.getElementById('loading');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');
const closeModal = document.getElementById('closeModal');
const appContainer = document.getElementById('appContainer');
const apiKeyOverlay = document.getElementById('apiKeyOverlay');

let isApiKeyMissing = API_KEY === 'YOUR_API_KEY_HERE';

// Persistent API key error check
function checkApiKey() {
    console.log('Checking API key:', API_KEY); // Debug log
    if (isApiKeyMissing) {
        errorMessage.textContent = 'Please replace YOUR_API_KEY_HERE with a valid OpenWeatherMap API key in script.js.';
        errorModal.classList.remove('hidden');
       主

System: apiKeyOverlay.classList.remove('hidden');
        apiKeyOverlay.classList.add('active');
        appContainer.classList.add('disabled');
        weatherForm.querySelector('button').disabled = true;
        locationInput.disabled = true;
        console.log('API key missing - modal displayed'); // Debug log
        return true;
    } else {
        // Verify API key validity
        fetch(`${API_URL}?q=London&appid=${API_KEY}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    isApiKeyMissing = true;
                    errorMessage.textContent = 'Invalid API key. Please provide a valid OpenWeatherMap API key in script.js.';
                    errorModal.classList.remove('hidden');
                    apiKeyOverlay.classList.remove('hidden');
                    apiKeyOverlay.classList.add('active');
                    appContainer.classList.add('disabled');
                    weatherForm.querySelector('button').disabled = true;
                    locationInput.disabled = true;
                    console.log('Invalid API key - modal displayed'); // Debug log
                    return true;
                } else {
                    errorModal.classList.add('hidden');
                    apiKeyOverlay.classList.add('hidden');
                    apiKeyOverlay.classList.remove('active');
                    appContainer.classList.remove('disabled');
                    weatherForm.querySelector('button').disabled = false;
                    locationInput.disabled = false;
                    console.log('Valid API key - app enabled'); // Debug log
                    return false;
                }
            })
            .catch(() => {
                isApiKeyMissing = true;
                errorMessage.textContent = 'API key error. Please provide a valid OpenWeatherMap API key in script.js.';
                errorModal.classList.remove('hidden');
                apiKeyOverlay.classList.remove('hidden');
                apiKeyOverlay.classList.add('active');
                appContainer.classList.add('disabled');
                weatherForm.querySelector('button').disabled = true;
                locationInput.disabled = true;
                console.log('API key error - modal displayed'); // Debug log
                return true;
            });
    }
    return false;
}

// Show error modal for other errors
function showError(message) {
    if (!isApiKeyMissing) {
        errorMessage.textContent = message;
        errorModal.classList.remove('hidden');
        closeModal.classList.remove('hidden');
    }
}

// Initial API key check on page load
checkApiKey();

// Re-check API key on window focus to catch manual edits
window.addEventListener('focus', checkApiKey);

// Form submission handler
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Prevent API call if key is missing or invalid
    if (isApiKeyMissing) return;

    const location = locationInput.value.trim();
    if (!location) {
        showError('Please enter a city name.');
        return;
    }

    // Show loading spinner
    weatherResult.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(response.status === 404 ? 'City not found.' : 'Failed to fetch weather data.');
        }
        const data = await response.json();

        // Display weather data
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

        weatherResult.classList.remove('hidden');
        weatherResult.classList.add('fade-in');
    } catch (error) {
        showError(error.message);
    } finally {
        loading.classList.add('hidden');
    }
});

// Error modal close handler (only for non-API-key errors)
closeModal.addEventListener('click', () => {
    if (!isApiKeyMissing) {
        errorModal.classList.add('hidden');
        closeModal.classList.add('hidden');
    }
});

// Clear input on focus (only if API key is valid)
locationInput.addEventListener('focus', () => {
    if (!isApiKeyMissing) {
        locationInput.value = '';
    }
});

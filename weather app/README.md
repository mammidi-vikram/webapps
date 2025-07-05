# WeatherSync - Professional Weather App

## Overview
WeatherSync is a modern, responsive web application that allows users to check current weather conditions for any city. Built with HTML, CSS (using Tailwind CSS), and JavaScript, it integrates with the OpenWeatherMap API to fetch and display weather data, including temperature (in Celsius), weather description (e.g., "Sunny," "Cloudy"), and an icon representing the current weather condition. The application is designed to be user-friendly, visually appealing, and fully functional across desktops, tablets, and mobile devices.

## Features
- **User Input**: A text input field allows users to enter a city name to retrieve weather data.
- **Weather Display**: Displays the city name, country, temperature (°C), weather description, and a corresponding weather icon.
- **Responsive Design**: Optimized for all screen sizes with touch-friendly controls, ensuring a seamless experience on mobile devices.
- **Error Handling**:
  - A persistent, unclosable error modal appears if the OpenWeatherMap API key is missing or invalid, disabling the app until a valid key is provided.
  - Temporary modals handle other errors, such as invalid city names or API request failures, with user-friendly messages.
- **Professional UI**: Features a clean, modern design with smooth animations (fade-in for weather results, pop-in for error modal) and Tailwind CSS styling.
- **Loading State**: Shows a spinner during API requests to enhance user experience.
- **API Key Validation**: Actively checks the validity of the API key, ensuring the app remains disabled if the key is incorrect.

## Setup Instructions
1. **Obtain an OpenWeatherMap API Key**:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/) to get a free API key.
   - Open `script.js` and replace `YOUR_API_KEY_HERE` with your valid API key:
     ```javascript
     const API_KEY = 'YOUR_API_KEY_HERE';
     ```
   - **Important**: If the API key is missing or invalid, a persistent error modal will appear, and the app (form and inputs) will be disabled with a semi-transparent overlay until a valid key is provided.

2. **Running the App**:
   - Place `index.html`, `styles.css`, `script.js`, and `README.md` in a single directory.
   - Host the files on a local server:
     - **VS Code Live Server**: Install the Live Server extension, right-click `index.html`, and select "Open with Live Server."
     - **Python HTTP Server**: Run `python -m http.server` in the directory and open `http://localhost:8000` in a browser.
     - **Node.js http-server**: Install with `npm install -g http-server`, run `http-server`, and visit `http://localhost:8080`.
   - Open `index.html` in a web browser. With a valid API key, enter a city name and tap/click "Get Weather" to view results.

3. **Dependencies**:
   - Uses Tailwind CSS via CDN (no local installation required).
   - Requires an internet connection for API calls and Tailwind CSS loading.

## File Structure
- `index.html`: Contains the HTML structure with a mobile-optimized layout using Tailwind CSS classes.
- `styles.css`: Custom CSS for animations (fade-in for weather results, pop-in for error modal), mobile-specific adjustments, and API key overlay styling.
- `script.js`: JavaScript handling API calls, event listeners, persistent API key validation, and error modal logic.
- `README.md`: This file, providing setup instructions and project details.

## Notes
- **Technology**: Uses `async/await` for efficient API request handling and modern JavaScript practices.
- **API Key Enforcement**: The app checks the API key on page load and window focus. If missing or invalid, the app is disabled, and a modal persists until corrected.
- **Mobile Optimization**: Touch-friendly inputs/buttons, responsive font sizes, and a compact, scrollable error modal ensure usability on small screens.
- **Debugging**: Console logs in `script.js` (visible in browser console, F12 > Console) help diagnose API key issues (e.g., "API key missing - modal displayed").
- **Extensibility**: Additional features like weather forecasts or temperature unit toggling can be added by extending the OpenWeatherMap API calls.

## Testing
- **Functionality**: Test with a valid API key to ensure weather data is fetched and displayed correctly. Use an invalid key or `YOUR_API_KEY_HERE` to verify the persistent error modal and disabled app state.
- **Mobile Testing**: Use a mobile device or browser’s mobile view (e.g., Chrome DevTools > Toggle Device Toolbar) to confirm responsiveness and touch-friendly controls.
- **Error Handling**: Test with invalid city names (e.g., "InvalidCity") to verify temporary error modals.

## Submission
Create a zip file containing the following files for submission:
- `index.html`
- `styles.css`
- `script.js`
- `README.md`

## Troubleshooting
- **Modal Not Appearing**: If the API key error modal doesn’t show with `YOUR_API_KEY_HERE`, check the browser console for logs (e.g., "Checking API key: YOUR_API_KEY_HERE"). Ensure `script.js` is correctly linked in `index.html`.
- **App Not Working**: Verify the API key is valid and the internet is connected for API calls and Tailwind CSS. Clear browser cache or test in an incognito tab.
- **Mobile Issues**: Ensure the viewport meta tag in `index.html` is present and test with various screen sizes.

For further assistance, contact [info@unifiedmentor.com](mailto:info@unifiedmentor.com) or visit [unifiedmentor.com](https://unifiedmentor.com).

Good luck with your WeatherSync project submission!

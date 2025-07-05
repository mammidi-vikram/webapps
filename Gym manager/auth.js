const login = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  // Show config warning if firebaseConfig is not set
  if (
    typeof firebaseConfig === "undefined" ||
    !firebaseConfig.apiKey ||
    firebaseConfig.apiKey.includes("your_api_key")
  ) {
    const warning = document.getElementById("firebase-warning");
    if (warning) warning.classList.remove("hidden");
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      document.getElementById("message").innerText = err.message;
    });
};

const darkToggle = document.getElementById("dark-toggle");

// Apply saved theme on load
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
  darkToggle.checked = true;
}

darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
  }
});

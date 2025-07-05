const login = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  // Check if Firebase config is missing
  if (
    typeof firebaseConfig === "undefined" ||
    !firebaseConfig.apiKey ||
    firebaseConfig.apiKey.includes("your_api_key")
  ) {
    const warning = document.getElementById("firebase-warning");
    if (warning) warning.classList.remove("hidden");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      document.getElementById("message").innerText = err.message;
    });
};

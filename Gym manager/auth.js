const login = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  // Firebase config key check
  if (
    typeof firebaseConfig === "undefined" ||
    !firebaseConfig.apiKey ||
    firebaseConfig.apiKey.includes("your_api_key")
  ) {
    alert("⚠️ Firebase is not configured. Please update firebase-config.js with your project’s credentials.");
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

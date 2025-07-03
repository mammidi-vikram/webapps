const login = () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      document.getElementById("message").innerText = err.message;
    });
};

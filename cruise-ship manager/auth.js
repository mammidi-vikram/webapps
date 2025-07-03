function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = `${role}.html`;
    })
    .catch((error) => {
      document.getElementById("message").textContent = error.message;
    });
}

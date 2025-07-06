import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

let app, auth, db;

function initializeApp() {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  setupEventListeners();
}

function setupEventListeners() {
  const authButton = document.getElementById("auth-button");
  const toggleAuth = document.getElementById("toggle-auth");
  authButton.addEventListener("click", handleAuth);
  toggleAuth.addEventListener("click", toggleAuthMode);
}

function toggleAuthMode() {
  const authTitle = document.getElementById("auth-title");
  const authButton = document.getElementById("auth-button");
  const toggleAuth = document.getElementById("toggle-auth");
  if (authTitle.textContent === "Login") {
    authTitle.textContent = "Register";
    authButton.textContent = "Register";
    toggleAuth.textContent = "Login";
  } else {
    authTitle.textContent = "Login";
    authButton.textContent = "Login";
    toggleAuth.textContent = "Register";
  }
}

async function handleAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userType = document.getElementById("user-type").value;
  const authTitle = document.getElementById("auth-title").textContent;

  try {
    if (authTitle === "Login") {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(`Logged in as ${userType}:`, userCredential.user);
      showDashboard(userType);
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`Registered as ${userType}:`, userCredential.user);
      showDashboard(userType);
    }
  } catch (error) {
    console.error("Authentication error:", error.message);
    alert("Authentication failed: " + error.message);
  }
}

function showDashboard(userType) {
  document.getElementById("auth-container").classList.add("hidden");
  document.getElementById(`${userType}-dashboard`).classList.remove("hidden");
  if (userType === "manager") loadManagerBookings();
  if (userType === "head-cook") loadCateringOrders();
  if (userType === "supervisor") loadStationeryOrders();
}

async function placeOrder(type) {
  const item = document.getElementById(`${type}-item`).value;
  try {
    await addDoc(collection(db, type), {
      item,
      user: auth.currentUser.email,
      timestamp: new Date()
    });
    console.log(`${type} order placed:`, item);
    alert("Order placed successfully!");
  } catch (error) {
    console.error("Order error:", error.message);
    alert("Failed to place order: " + error.message);
  }
}

async function bookService(type) {
  const selection = document.getElementById(type).value;
  try {
    await addDoc(collection(db, type), {
      selection,
      user: auth.currentUser.email,
      timestamp: new Date()
    });
    console.log(`${type} booking made:`, selection);
    alert("Booking made successfully!");
  } catch (error) {
    console.error("Booking error:", error.message);
    alert("Failed to book: " + error.message);
  }
}

async function addItem() {
  const itemName = document.getElementById("new-item").value;
  const itemType = document.getElementById("item-type").value;
  try {
    await addDoc(collection(db, itemType), {
      name: itemName,
      addedBy: auth.currentUser.email,
      timestamp: new Date()
    });
    console.log(`Added ${itemType} item:`, itemName);
    alert("Item added successfully!");
  } catch (error) {
    console.error("Add item error:", error.message);
    alert("Failed to add item: " + error.message);
  }
}

async function loadManagerBookings() {
  const bookingsDiv = document.getElementById("manager-bookings");
  bookingsDiv.innerHTML = "";
  const types = ["movie", "party-hall"];
  for (const type of types) {
    const querySnapshot = await getDocs(collection(db, type));
    querySnapshot.forEach(doc => {
      const data = doc.data();
      bookingsDiv.innerHTML += `<p>${type}: ${data.selection} by ${data.user} at ${data.timestamp.toDate()}</p>`;
    });
  }
}

async function loadCateringOrders() {
  const ordersDiv = document.getElementById("catering-orders");
  ordersDiv.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "catering"));
  querySnapshot.forEach(doc => {
    const data = doc.data();
    ordersDiv.innerHTML += `<p>Item: ${data.item} by ${data.user} at ${data.timestamp.toDate()}</p>`;
  });
}

async function loadStationeryOrders() {
  const ordersDiv = document.getElementById("stationery-orders");
  ordersDiv.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "stationery"));
  querySnapshot.forEach(doc => {
    const data = doc.data();
    ordersDiv.innerHTML += `<p>Item: ${data.item} by ${data.user} at ${data.timestamp.toDate()}</p>`;
  });
}

async function logout() {
  try {
    await signOut(auth);
    console.log("User logged out");
    document.querySelectorAll(".dashboard").forEach(d => d.classList.add("hidden"));
    document.getElementById("auth-container").classList.remove("hidden");
  } catch (error) {
    console.error("Logout error:", error.message);
    alert("Failed to logout: " + error.message);
  }
}

if (firebaseConfig.apiKey) {
  initializeApp();
}

# 🚢 Cruise Ship Management System

## 📌 Overview

A full-featured web-based management system for cruise ship voyagers and administration, enabling online booking, ordering, and staff operations.

---

## 🧩 Features by Role

### Voyager
- Sign in
- Order catering and stationery
- Book resort-movies, salon, gym, party hall

### Admin
- Add/Edit/Delete items
- Manage menu
- Register voyagers

### Manager
- View all bookings

### Head-Cook
- View catering orders

### Supervisor
- View stationery orders

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Firebase (Auth + Realtime DB)

---

## 📁 How to Run

1. Replace Firebase config in `firebase-config.js`.
2. Enable Email/Password authentication in Firebase console.
3. Open `index.html` in a browser or deploy via Firebase Hosting.

---

## ⚙️ System Design Justification

- Cloud-based: Firebase ensures real-time updates and scalability.
- Modular roles: Each file/page dedicated to specific role logic.
- Secure auth via Firebase.

---

## 🔐 Logging

All CRUD operations are logged under `/logs/` in Firebase Realtime DB.

---

## 🚀 Deployment

```bash
firebase login
firebase init
firebase deploy

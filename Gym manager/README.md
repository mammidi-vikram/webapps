# 🏋️‍♂️ GYM Management System

## 📌 Overview

This is a Firebase-based web application designed for gyms to manage their members, fee receipts, notifications, and reports digitally.

---

## 🚀 Features

### Admin
- Login
- Add/Update/Delete Members
- Assign Fee Packages
- Create and view payment bills
- Send monthly reminders
- Export member data
- Maintain logs

### Member
- Login
- View billing details and reminders

---

## 🛠️ Technologies

- HTML5, CSS3, JavaScript
- Firebase (Auth + Realtime DB)
- Firebase Hosting (optional)

---

## 🧪 Logging

Each Firebase action (create, update, delete) is logged in a dedicated `/logs/` node in Realtime Database.

---

## 🧩 System Design Justification

- Cloud backend: Firebase provides cross-platform scalability.
- Authentication: Firebase Auth handles secure login.
- Realtime DB: Updates reflect instantly across sessions.

---

## 🧹 Code Quality

- Modular JavaScript
- Firebase config separated from logic
- Error handling included

---

## 📁 How to Run

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com).
2. Enable Email/Password sign-in.
3. Copy your Firebase config to `firebase-config.js`.
4. Open `index.html` in browser or deploy using Firebase Hosting.

---

## 📦 Deployment

```bash
firebase login
firebase init
firebase deploy

# Gym Management System User Guide

## Welcome to the Gym Management System
The Gym Management System is a sleek, mobile-friendly web application designed to simplify gym operations for administrators, members, and users. Built with HTML, CSS (Tailwind CSS with custom styles), JavaScript, and Firebase, it offers a professional interface to manage memberships, bills, notifications, and more. This guide will walk you through setting up and using the app to streamline your gym's operations.

## Features
- **Admin Features**:
  - Add, update, or delete gym members
  - Create and manage payment bills
  - Assign fee packages to members
  - Send notifications to members (e.g., gym closure or events)
  - Export member reports as JSON files
  - Access placeholders for future supplement store and diet details
- **Member Features**:
  - View bill receipts
  - Check gym notifications
- **User Features**:
  - View personal account details
  - Search for member records
- **Responsive Design**: Works seamlessly on mobile and desktop with a collapsible sidebar
- **Real-Time Data**: Powered by Firebase for secure authentication and data storage
- **Polished UI**: Modern design with gradients, icons, and smooth transitions for a professional look

## Prerequisites
To use the Gym Management System, you'll need:
- A modern web browser (e.g., Chrome, Firefox, Safari)
- A Firebase account ([console.firebase.google.com](https://console.firebase.google.com))
- A local server tool (e.g., Node.js with `live-server` or Python's HTTP server)
- Basic familiarity with running web applications locally or deploying to a hosting platform

## Setup Instructions
Follow these steps to set up the Gym Management System:

1. **Clone the Repository**:
   - Download or clone the project files to your local machine:
     ```bash
     git clone <repository-url>
     ```
   - Ensure you have `index.html`, `styles.css`, and `script.js` in the same directory.

2. **Set Up Firebase**:
   - Go to [Firebase Console](https://console.firebase.google.com) and create a new project.
   - Enable **Email/Password Authentication**:
     - Navigate to **Authentication** > **Sign-in method** and enable Email/Password.
   - Enable **Firestore Database**:
     - Navigate to **Firestore Database** and create a database in production mode.
   - Copy your Firebase configuration:
     - Go to **Project Settings** and find the Firebase SDK snippet (Config).
     - Open `script.js` and replace the `firebaseConfig` object with your credentials:
       ```javascript
       const firebaseConfig = {
           apiKey: "your-api-key",
           authDomain: "your-auth-domain",
           projectId: "your-project-id",
           storageBucket: "your-storage-bucket",
           messagingSenderId: "your-messaging-sender-id",
           appId: "your-app-id"
       };
       ```

3. **Run the Application Locally**:
   - Use a local server to serve the files (file:// URLs may not work due to CORS restrictions):
     - **Using Node.js**:
       ```bash
       npm install -g live-server
       live-server
       ```
     - **Using Python**:
       ```bash
       python -m http.server 8000
       ```
   - Open your browser and navigate to `http://localhost:8000` (or the port specified by your server).

4. **Deploy to Production (Optional)**:
   - Host the app on Firebase Hosting or Netlify for public access.
   - For Firebase Hosting:
     ```bash
     npm install -g firebase-tools
     firebase login
     firebase init hosting
     firebase deploy
     ```
   - Ensure Firebase credentials are stored securely (e.g., using environment variables).

## Using the Gym Management System
The app is designed for three user roles: Admin, Member, and User. Below is a guide for each role.

### 1. Logging In
- **Access the App**: Open the app in your browser (e.g., `http://localhost:8000`).
- **Login Screen**:
  - Enter your **email** and **password** (created via Firebase Authentication).
  - Select your **role** (Admin, Member, or User) from the dropdown.
  - Click **Login** to access role-specific features.
- **First-Time Setup**:
  - Admins should create user accounts in Firebase Authentication for members and users.
  - Add member details (name, email, phone) via the Admin panel to populate the Firestore `members` collection.

### 2. Admin Features
After logging in as an Admin, you'll see a sidebar with the following options:
- **Add Member**:
  - Enter a member's name, email, and phone number.
  - Click **Add Member** to save to the Firestore database.
- **Manage Members**:
  - View a list of all members with their names and emails.
  - Click **Delete** to remove a member or **Update** (placeholder for future functionality).
- **Create Bill**:
  - Enter a member ID (from Firestore), bill amount, and date.
  - Click **Create Bill** to save the bill.
- **Assign Fee Package**:
  - Enter a member ID and fee amount.
  - Click **Assign Fee** to record the fee assignment.
- **Notifications**:
  - Enter a message (e.g., "Gym closed tomorrow").
  - Click **Send Notification** to broadcast to all members.
- **Export Reports**:
  - Click **Export Member Report** to download a JSON file of all member data.
- **Supplement Store** and **Diet Details**:
  - These are placeholders for future features, displaying "coming soon" messages.
- **Logout**: Click **Logout** to return to the login screen.

### 3. Member Features
After logging in as a Member, you'll see:
- **View Bill Receipts**:
  - Displays a list of your bills with amounts and dates.
- **View Notifications**:
  - Shows all notifications sent by the admin (e.g., gym updates).
- **Logout**: Returns to the login screen.

### 4. User Features
After logging in as a User, you'll see:
- **View Details**:
  - Displays your name, email, and phone number (stored in Firestore).
- **Search Records**:
  -continental
  - Enter a name or email in the search bar.
  - Click **Search** to view matching member records.
- **Logout**: Returns to the login screen.

### 5. Mobile Usage
- On mobile devices, click the **Menu** button (top-left) to toggle the sidebar.
- The app is fully responsive, with a clean layout and touch-friendly controls.

## Project Structure
- `index.html`: Main HTML file with the app's structure
- `styles.css`: Custom CSS styles (complements Tailwind CSS)
- `script.js`: JavaScript logic for Firebase integration and functionality
- Firestore Collections:
  - `members`: Stores member data (name, email, phone)
  - `bills`: Stores bill details (memberId, amount, date)
  - `fees`: Stores fee assignments
  - `notifications`: Stores notification messages
  - `logs`: Stores action logs for auditing

## Tips for Use
- **Admin Role**: Ensure member IDs match Firestore document IDs when creating bills or assigning fees.
- **Notifications**: Keep messages concise for clarity.
- **Reports**: Exported JSON files can be opened in text editors or imported into other tools.
- **Security**: Use strong passwords for Firebase accounts and secure your Firebase configuration in production.

## Future Enhancements
- Add a supplement store with product listings and a shopping cart.
- Implement diet plan creation and tracking tools.
- Integrate a payment gateway for online fee payments.
- Enhance reports with advanced filters and visualizations.

## GitHub Repository
- The repository is public for code review: `<repository-url>`
- Check the repository for updates and contribute via pull requests.
- Commit changes with descriptive messages for clarity.

## Support
For issues or feature requests, create a GitHub issue or contact the repository maintainer. Enjoy managing your gym with ease!

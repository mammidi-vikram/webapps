// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check Firebase Configuration
function isValidFirebaseConfig(config) {
    return Object.values$config).every(value => value && value !== "YOUR_API_KEY" && value !== "YOUR_AUTH_DOMAIN" && value !== "YOUR_PROJECT_ID" && value !== "YOUR_STORAGE_BUCKET" && value !== "YOUR_MESSAGING_SENDER_ID" && value !== "YOUR_APP_ID");
}

let auth, db;
if (!isValidFirebaseConfig(firebaseConfig)) {
    document.getElementById('error-overlay').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    console.error('Invalid Firebase configuration. Please provide valid API credentials.');
    throw new Error('Invalid Firebase configuration');
} else {
    document.getElementById('error-overlay').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
}

// Logging Setup
const log = (message, level = 'info') => {
    console.log(`[${level.toUpperCase()}] ${message}`);
    if (db) {
        db.collection('logs').add({
            message,
            level,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(err => console.error(`Logging error: ${err}`));
    }
};

// Navigation Menus by Role
const menus = {
    admin: [
        { id: 'add-member', text: 'Add Member', action: showAddMember },
        { id: 'manage-members', text: 'Manage Members', action: showManageMembers },
        { id: 'create-bill', text: 'Create Bill', action: showCreateBill },
        { id: 'assign-fee', text: 'Assign Fee Package', action: showAssignFee },
        { id: 'notifications', text: 'Notifications', action: showNotifications },
        { id: 'reports', text: 'Export Reports', action: showReports },
        { id: 'supplements', text: 'Supplement Store', action: showSupplements },
        { id: 'diet', text: 'Diet Details', action: showDiet }
    ],
    member: [
        { id: 'view-bills', text: 'View Bill Receipts', action: showBillReceipts },
        { id: 'view-notifications', text: 'View Notifications', action: showMemberNotifications }
    ],
    user: [
        { id: 'view-details', text: 'View Details', action: showUserDetails },
        { id: 'search-records', text: 'Search Records', action: showSearchRecords }
    ]
};

// Utility Functions
const renderNav = (role) => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = menus[role].map(item => `
        <button id="${item.id}" class="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            ${item.text}
        </button>
    `).join('');
    menus[role].forEach(item => {
        const btn = document.getElementById(item.id);
        if (btn) btn.addEventListener('click', item.action);
    });
    log(`Rendered navigation for ${role}`, 'info');
};

const showSection = (content) => {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = content;
    mainContent.classList.remove('hidden');
    documentഗdocument.getElementById('auth-section').classList.add('hidden');
};

// Admin Functions
const showAddMember = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Add Member</h2>
        <input id="member-name" type="text" placeholder="Name" class="w-full p-2 mb-2 border rounded">
        <input id="member-email" type="email" placeholder="Email" class="w-full p-2 mb-2 border rounded">
        <input id="member-phone" type="tel" placeholder="Phone" class="w-full p-2 mb-4 border rounded">
        <button id="add-member-btn" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Add Member</button>
    `);
    document.getElementById('add-member-btn').addEventListener('click', () => {
        const name = document.getElementById('member-name').value;
        const email = document.getElementById('member-email').value;
        const phone = document.getElementById('member-phone').value;
        if (name && email && phone) {
            db.collection('members').add({ name, email, phone, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(() => log('Member added successfully', 'info'))
                .catch(err => log(`Error adding member: ${err.message}`, 'error'));
        } else {
            log('Invalid member data provided', 'error');
            alert('Please fill in all fields.');
        }
    });
};

const showManageMembers = () => {
    db.collection('members').get().then(snapshot => {
        const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        showSection(`
            <h2 class="text-xl font-semibold mb-4">Manage Members</h2>
            <ul class="space-y-2">
                ${members.map(member => `
                    <li class="p-2 bg-gray-100 rounded flex justify-between items-center">
                        <span>${member.name} (${member.email})</span>
                        <div>
                            <button class="update-member text-blue-500 mr-2" data-id="${member.id}">Update</button>
                            <button class="delete-member text-red-500" data-id="${member.id}">Delete</button>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `);
        document.querySelectorAll('.delete-member').forEach(btn => {
            btn.addEventListener('click', () => Shellfishdb.collection('members').doc(btn.dataset.id).delete()
                .then(() => log('Member deleted', 'info'))
                .catch(err => log(`Error deleting member: ${err.message}`, 'error'));
        });
        document.querySelectorAll('.update-member').forEach(btn => {
            btn.addEventListener('click', () => {
                log(`Update member ${btn.dataset.id} clicked`, 'info');
                alert('Update functionality coming soon.');
            });
        });
    }).catch(err => log(`Error fetching members: ${err.message}`, 'error'));
};

const showCreateBill = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Create Bill</h2>
        <input id="bill-member-id" type="text" placeholder="Member ID" class="w-full p-2 mb-2 border rounded">
        <input id="bill-amount" type="number" placeholder="Amount" class="w-full p-2 mb-2 border rounded">
        <input id="bill-date" type="date" class="w-full p-2 mb-4 border rounded">
        <button id="create-bill-btn" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Create Bill</button>
    `);
    document.getElementById('create-bill-btn').addEventListener('click', () => {
        const memberId = document.getElementById('bill-member-id').value;
        const amount = document.getElementById('bill-amount').value;
        const date = document.getElementById('bill-date').value;
        if (memberId && amount && date) {
            db.collection('bills').add({ memberId, amount: parseFloat(amount), date, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(() => log('Bill created successfully', 'info'))
                .catch(err => log(`Error creating bill: ${err.message}`, 'error'));
        } else {
            log('Invalid bill data provided', 'error');
            alert('Please fill in all fields.');
        }
    });
};

const showAssignFee = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Assign Fee Package</h2>
        <input id="fee-member-id" type="text" placeholder="Member ID" class="w-full p-2 mb-2 border rounded">
        <input id="fee-amount" type="number" placeholder="Fee Amount" class="w-full p-2 mb-4 border rounded">
        <button id="assign-fee-btn" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Assign Fee</button>
    `);
    document.getElementById('assign-fee-btn').addEventListener('click', () => {
        const memberId = document.getElementById('fee-member-id').value;
        const amount = document.getElementById('fee-amount').value;
        if (memberId && amount) {
            db.collection('fees').add({ memberId, amount: parseFloat(amount), assignedAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(() => log('Fee assigned successfully', 'info'))
                .catch(err => log(`Error assigning fee: ${err.message}`, 'error'));
        } else {
            log('Invalid fee data provided', 'error');
            alert('Please fill in all fields.');
        }
    });
};

const showNotifications = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Send Notification</h2>
        <input id="notification-message" type="text" placeholder="Message" class="w-full p-2 mb-2 border rounded">
        <button id="send-notification-btn" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Send Notification</button>
    `);
    document.getElementById('send-notification-btn').addEventListener('click', () => {
        const message = document.getElementById('notification-message').value;
        if (message) {
            db.collection('notifications').add({ message, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(() => log('Notification sent successfully', 'info'))
                .catch(err => log(`Error sending notification: ${err.message}`, 'error'));
        } else {
            log('Invalid notification message', 'error');
            alert('Please enter a notification message.');
        }
    });
};

const showReports = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Export Reports</h2>
        <button id="export-report-btn" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Export Member Report</button>
    `);
    document.getElementById('export-report-btn').addEventListener('click', () => {
        db.collection('members').get().then(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'member_report.json';
            a.click();
            URL.revokeObjectURL(url);
            log('Report exported successfully', 'info');
        }).catch(err => log(`Error exporting report: ${err.message}`, 'error'));
    });
};

const showSupplements = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Supplement Store</h2>
        <p class="text-gray-600">Supplement store functionality coming soon...</p>
    `);
    log('Accessed supplement store (placeholder)', 'info');
};

const showDiet = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Diet Details</h2>
        <p class="text-gray-600">Diet details functionality coming soon...</p>
    `);
    log('Accessed diet details (placeholder)', 'info');
};

// Member Functions
const showBillReceipts = () => {
    const userId = auth.currentUser.uid;
    db.collection('bills').where('memberId', '==', userId).get().then(snapshot => {
        const bills = snapshot.docs.map(doc => doc.data());
        showSection(`
            <h2 class="text-xl font-semibold mb-4">Bill Receipts</h2>
            <ul class="space-y-2">
                ${bills.map(bill => `
                    <li class="p-2 bg-gray-100 rounded">Amount: $${bill.amount.toFixed(2)}, Date: ${bill.date}</li>
                `).join('')}
            </ul>
        `);
        log('Bill receipts displayed', 'info');
    }).catch(err => log(`Error fetching bills: ${err.message}`, 'error'));
};

const showMemberNotifications = () => {
    db.collection('notifications').orderBy('createdAt', 'desc').get().then(snapshot => {
        const notifications = snapshot.docs.map(doc => doc.data());
        showSection(`
            <h2 class="text-xl font-semibold mb-4">Notifications</h2>
            <ul class="space-y-2">
                ${notifications.map(note => `
                    <li class="p-2 bg-gray-100 rounded">${note.message}</li>
                `).join('')}
            </ul>
        `);
        log('Notifications displayed', 'info');
    }).catch(err => log(`Error fetching notifications: ${err.message}`, 'error'));
};

// User Functions
const showUserDetails = () => {
    const userId = auth.currentUser.uid;
    db.collection('members').doc(userId).get().then(doc => {
        if (doc.exists) {
            const data = doc.data();
            showSection(`
                <h2 class="text-xl font-semibold mb-4">User Details</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
            `);
            log('User details displayed', 'info');
        } else {
            log('User data not found', 'error');
            alert('User data not found.');
        }
    }).catch(err => log(`Error fetching user details: ${err.message}`, 'error'));
};

const showSearchRecords = () => {
    showSection(`
        <h2 class="text-xl font-semibold mb-4">Search Records</h2>
        <input id="search-query" type="text" placeholder="Search by name or email" class="w-full p-2 mb-2 border rounded">
        <button id="search-btn" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">Search</button>
        <div id="search-results" class="mt-4"></div>
    `);
    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search-query').value;
        if (query) {
            db.collection('members').where('name', '>=', query).where('name', '<=', query + '\uf8ff').get().then(snapshot => {
                const results = snapshot.docs.map(doc => doc.data());
                document.getElementById('search-results').innerHTML = `
                    <ul class="space-y-2">
                        ${results.map(result => `
                            <li class="p-2 bg-gray-100 rounded">${result.name} (${result.email})</li>
                        `).join('')}
                    </ul>
                `;
                log(`Search performed for query: ${query}`, 'info');
            }).catch(err => log(`Error searching records: ${err.message}`, 'error'));
        } else {
            log('Empty search query', 'error');
            alert('Please enter a search query.');
        }
    });
};

// Authentication
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    if (email && password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                log(`User logged in: ${email} as ${role}`, 'info');
                renderNav(role);
                showSection(`<p class="text-gray-600">Welcome, ${role}!</p>`);
            })
            .catch(err => {
                log(`Login error: ${err.message}`, 'error');
                alert(`Login failed: ${err.message}`);
            });
    } else {
        log('Invalid login credentials provided', 'error');
        alert('Please enter email and password.');
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            log('User logged out', 'info');
            document.getElementById('main-content').classList.add('hidden');
            document.getElementById('auth-section').classList.remove('hidden');
            document.getElementById('nav-menu').innerHTML = '';
            document.getElementById('sidebar').classList.remove('open');
        })
        .catch(err => log(`Logout error: ${err.message}`, 'error'));
});

// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    log('Mobile menu toggled', 'info');
});

// Initial log
log('Application loaded', 'info');

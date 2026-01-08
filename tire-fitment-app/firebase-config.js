// Firebase Configuration
const firebaseConfig = {
    // REPLACE WITH YOUR FIREBASE CONFIG
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

// Firebase Auth State Observer
let currentUser = null;

auth.onAuthStateChanged((user) => {
    currentUser = user;
    updateAuthUI();
    
    if (user) {
        // User is signed in
        analytics.setUserId(user.uid);
        console.log("User signed in:", user.email);
        
        // Update user count (simulated)
        updateUserStats();
    } else {
        // User is signed out
        console.log("User signed out");
    }
});

// Update UI based on auth state
function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const userEmail = document.getElementById('user-email');
    const saveButton = document.getElementById('save-button');
    
    if (currentUser) {
        // User is signed in
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        userEmail.textContent = currentUser.email;
        
        // Enable save button
        if (saveButton) {
            saveButton.disabled = false;
            saveButton.innerHTML = '<i class="fas fa-save"></i> Save Fitment';
        }
        
        // Load saved fitments
        loadSavedFitments();
    } else {
        // User is signed out
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
        
        // Disable save button
        if (saveButton) {
            saveButton.disabled = true;
            saveButton.innerHTML = '<i class="fas fa-lock"></i> Sign In to Save';
        }
        
        // Clear saved fitments list
        const savedList = document.getElementById('saved-list');
        if (savedList) savedList.innerHTML = '';
    }
}

// Authentication Functions
async function signIn(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        closeAuthModal();
        showNotification('Signed in successfully!', 'success');
        return userCredential;
    } catch (error) {
        showAuthError(error.message);
        console.error('Sign in error:', error);
        return null;
    }
}

async function signUp(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        closeAuthModal();
        showNotification('Account created successfully!', 'success');
        
        // Create user document in Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            fitmentCount: 0
        });
        
        return userCredential;
    } catch (error) {
        showAuthError(error.message);
        console.error('Sign up error:', error);
        return null;
    }
}

async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await auth.signInWithPopup(provider);
        closeAuthModal();
        showNotification('Signed in with Google!', 'success');
        return userCredential;
    } catch (error) {
        showAuthError(error.message);
        console.error('Google sign in error:', error);
        return null;
    }
}

async function signOut() {
    try {
        await auth.signOut();
        showNotification('Signed out successfully', 'info');
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

// Save Fitment to Firebase
let currentFitmentData = null;

function setCurrentFitmentData(data) {
    currentFitmentData = data;
}

async function saveFitmentToFirebase() {
    if (!currentUser) {
        showAuthModal('signin');
        showNotification('Please sign in to save fitments', 'warning');
        return;
    }
    
    if (!currentFitmentData) {
        showNotification('No fitment data to save', 'error');
        return;
    }
    
    try {
        const fitmentRef = db.collection('fitments').doc();
        
        const fitmentData = {
            userId: currentUser.uid,
            vehicle: currentFitmentData.vehicle,
            tireSize: currentFitmentData.tireSize,
            specifications: currentFitmentData.specifications,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            year: currentFitmentData.year,
            make: currentFitmentData.make,
            model: currentFitmentData.model
        };
        
        await fitmentRef.set(fitmentData);
        
        // Update user's fitment count
        await db.collection('users').doc(currentUser.uid).update({
            fitmentCount: firebase.firestore.FieldValue.increment(1)
        });
        
        showNotification('Fitment saved successfully!', 'success');
        
        // Log analytics event
        analytics.logEvent('save_fitment', {
            vehicle: fitmentData.vehicle,
            tire_size: fitmentData.tireSize
        });
        
    } catch (error) {
        console.error('Error saving fitment:', error);
        showNotification('Error saving fitment', 'error');
    }
}

// Load Saved Fitments
async function loadSavedFitments() {
    if (!currentUser) return;
    
    try {
        const fitmentsQuery = db.collection('fitments')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .limit(10);
        
        const querySnapshot = await fitmentsQuery.get();
        
        const savedList = document.getElementById('saved-list');
        const noSaved = document.getElementById('no-saved');
        
        if (querySnapshot.empty) {
            if (noSaved) noSaved.style.display = 'block';
            if (savedList) savedList.style.display = 'none';
            return;
        }
        
        if (noSaved) noSaved.style.display = 'none';
        if (savedList) {
            savedList.style.display = 'block';
            savedList.innerHTML = '';
            
            querySnapshot.forEach((doc) => {
                const fitment = doc.data();
                const fitmentElement = createFitmentElement(fitment, doc.id);
                savedList.appendChild(fitmentElement);
            });
        }
        
    } catch (error) {
        console.error('Error loading saved fitments:', error);
    }
}

function createFitmentElement(fitment, docId) {
    const div = document.createElement('div');
    div.className = 'saved-fitment';
    div.innerHTML = `
        <div class="fitment-header">
            <h4>${fitment.vehicle}</h4>
            <button class="btn-delete" onclick="deleteFitment('${docId}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="fitment-body">
            <div class="fitment-tire">${fitment.tireSize}</div>
            <div class="fitment-specs">
                <span><i class="fas fa-cog"></i> ${fitment.specifications.boltPattern}</span>
                <span><i class="fas fa-arrows-alt-v"></i> ${fitment.specifications.offset}</span>
            </div>
            <div class="fitment-date">
                ${new Date(fitment.createdAt?.toDate()).toLocaleDateString()}
            </div>
        </div>
        <button class="btn-load" onclick="loadFitment('${docId}')">
            <i class="fas fa-undo"></i> Load
        </button>
    `;
    return div;
}

// Delete Fitment
async function deleteFitment(docId) {
    if (!confirm('Are you sure you want to delete this fitment?')) return;
    
    try {
        await db.collection('fitments').doc(docId).delete();
        
        // Update user's fitment count
        await db.collection('users').doc(currentUser.uid).update({
            fitmentCount: firebase.firestore.FieldValue.increment(-1)
        });
        
        showNotification('Fitment deleted', 'info');
        loadSavedFitments();
        
    } catch (error) {
        console.error('Error deleting fitment:', error);
        showNotification('Error deleting fitment', 'error');
    }
}

// Load Fitment from Saved
async function loadFitment(docId) {
    try {
        const doc = await db.collection('fitments').doc(docId).get();
        
        if (doc.exists) {
            const fitment = doc.data();
            
            // Populate the form with saved fitment
            document.getElementById('year').value = fitment.year;
            document.getElementById('make').value = fitment.make;
            document.getElementById('model').value = fitment.model;
            
            // Trigger search
            handleSearch();
            
            // Set current fitment data
            setCurrentFitmentData(fitment);
            
            closeSavedModal();
            showNotification('Fitment loaded successfully!', 'success');
        }
    } catch (error) {
        console.error('Error loading fitment:', error);
        showNotification('Error loading fitment', 'error');
    }
}

// Update User Stats (simulated)
async function updateUserStats() {
    try {
        // Get total fitments count
        const fitmentsSnapshot = await db.collection('fitments').get();
        const fitmentCount = fitmentsSnapshot.size;
        
        // Update display
        const fitmentCountElement = document.getElementById('fitment-count');
        if (fitmentCountElement) {
            fitmentCountElement.textContent = `${fitmentCount}+`;
        }
        
        // Get users count (simulated - in production you'd use a counter)
        const usersSnapshot = await db.collection('users').get();
        const userCount = usersSnapshot.size;
        
        const userCountElement = document.getElementById('user-count');
        if (userCountElement) {
            userCountElement.textContent = `${userCount}+`;
        }
        
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Modal Functions
function showAuthModal(type = 'signin') {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'flex';
    
    switchAuthTab(type);
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'none';
    clearAuthForm();
}

function switchAuthTab(type) {
    const signinTab = document.getElementById('signin-tab');
    const signupTab = document.getElementById('signup-tab');
    const authTitle = document.getElementById('auth-modal-title');
    const authButtonText = document.getElementById('auth-button-text');
    
    if (type === 'signin') {
        signinTab.classList.add('active');
        signupTab.classList.remove('active');
        authTitle.textContent = 'Sign In';
        authButtonText.textContent = 'Sign In';
    } else {
        signupTab.classList.add('active');
        signinTab.classList.remove('active');
        authTitle.textContent = 'Sign Up';
        authButtonText.textContent = 'Sign Up';
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const isSignIn = document.getElementById('signin-tab').classList.contains('active');
    
    if (isSignIn) {
        signIn(email, password);
    } else {
        signUp(email, password);
    }
}

function showAuthError(message) {
    const errorElement = document.getElementById('auth-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearAuthForm() {
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
    document.getElementById('auth-error').style.display = 'none';
}

function viewSavedFitments() {
    const modal = document.getElementById('saved-modal');
    modal.style.display = 'flex';
    loadSavedFitments();
}

function closeSavedModal() {
    const modal = document.getElementById('saved-modal');
    modal.style.display = 'none';
}

// Notification Function
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Initialize Firebase when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Update stats periodically
    updateUserStats();
    setInterval(updateUserStats, 60000); // Update every minute
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        const authModal = document.getElementById('auth-modal');
        const savedModal = document.getElementById('saved-modal');
        
        if (event.target === authModal) {
            closeAuthModal();
        }
        
        if (event.target === savedModal) {
            closeSavedModal();
        }
    });
});
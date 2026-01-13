// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded, initializing app...");
    
    // Initialize the app
    if (typeof initApp === "function") {
        console.log("Calling initApp...");
        initApp();
    } else {
        console.error("initApp function not found! Check app.js loading.");
        // Try again after a short delay
        setTimeout(function() {
            if (typeof initApp === "function") {
                console.log("initApp found after delay, calling...");
                initApp();
            } else {
                console.error("Application failed to load.");
            }
        }, 1000);
    }
});
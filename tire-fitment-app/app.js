// Tire Fitment Calculator App
// Main application file

// Wheel-Size.com API Configuration
const WHEEL_SIZE_API_KEY = 'aacf06f99737a3a99963870c871a5eaf';
const WHEEL_SIZE_BASE_URL = 'https://api.wheel-size.com/v2';

// Initialize the app
function initApp() {
    console.log("Initializing Tire Fitment Calculator...");
    
    // Populate year dropdown
    populateYearDropdown();
    
    // Check API status
    checkAPIStatus();
    
    console.log("App initialized successfully");
}

// Helper function to build API URLs
function buildWheelSizeAPIUrl(endpoint, params = {}) {
    const url = new URL(`${WHEEL_SIZE_BASE_URL}${endpoint}`);
    
    // Add API key
    url.searchParams.append('user_key', WHEEL_SIZE_API_KEY);
    
    // Add additional parameters
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            url.searchParams.append(key, params[key]);
        }
    });
    
    return url.toString();
}

// Populate year dropdown - Using /years/ endpoint
async function populateYearDropdown() {
    const yearSelect = document.getElementById('year');
    if (!yearSelect) return;
    
    // Clear existing options except the first one
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    
    try {
        // Get years from API
        const url = buildWheelSizeAPIUrl('/years/');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            
            if (data && data.data && Array.isArray(data.data)) {
                // Sort years in descending order
                const years = data.data
                    .map(item => item.name)
                    .filter(year => year >= 1980 && year <= 2030)
                    .sort((a, b) => b - a); // Descending order
                
                // Populate dropdown
                years.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearSelect.appendChild(option);
                });
                
                console.log(`Loaded ${years.length} years from API`);
            } else {
                console.log("No years data from API, using fallback");
                // Fallback to hardcoded years if API fails
                populateFallbackYears(yearSelect);
            }
        } else {
            throw new Error(`API responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching years:", error);
        // Fallback to hardcoded years
        populateFallbackYears(yearSelect);
    }
}

// Fallback year population
function populateFallbackYears(yearSelect) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear + 1; year >= 1980; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Check API status
function checkAPIStatus() {
    const apiStatusBadge = document.getElementById('api-status');
    if (!apiStatusBadge) return;
    
    // Test API connection using /years/ endpoint
    const testUrl = buildWheelSizeAPIUrl('/years/', { limit: 1 });
    
    fetch(testUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => {
        if (response.status === 200) {
            apiStatusBadge.innerHTML = '<i class="fas fa-wifi"></i><span>API: Online</span>';
            apiStatusBadge.classList.add('online');
        } else {
            apiStatusBadge.innerHTML = '<i class="fas fa-wifi-slash"></i><span>API: Offline</span>';
            apiStatusBadge.classList.add('offline');
        }
    })
    .catch(error => {
        console.error("API check failed:", error);
        apiStatusBadge.innerHTML = '<i class="fas fa-wifi-slash"></i><span>API: Offline</span>';
        apiStatusBadge.classList.add('offline');
    });
}

// Update steps function
function updateSteps(stepNumber) {
    console.log(`Updating steps to step ${stepNumber}`);
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Handle year change - Fetch makes from /makes/ endpoint
async function handleYearChange() {
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (!yearSelect || !makeSelect || !modelSelect) return;
    
    const year = yearSelect.value;
    
    console.log("Year selected:", year);
    
    if (year) {
        // Show loading
        showLoading(true);
        
        // Enable the make dropdown immediately
        makeSelect.disabled = false;
        makeSelect.innerHTML = '<option value="">Select Make</option>';
        
        // Add a loading option
        const loadingOption = document.createElement('option');
        loadingOption.value = '';
        loadingOption.textContent = 'Loading makes...';
        loadingOption.disabled = true;
        makeSelect.appendChild(loadingOption);
        
        try {
            // Fetch makes from Wheel-Size API using /makes/ endpoint
            const makes = await fetchMakesFromAPI();
            
            // Remove loading option
            makeSelect.innerHTML = '<option value="">Select Make</option>';
            
            if (makes && makes.length > 0) {
                makes.forEach(make => {
                    const option = document.createElement('option');
                    option.value = make.slug || make.name;
                    option.textContent = make.name;
                    option.setAttribute('data-name', make.name);
                    makeSelect.appendChild(option);
                });
                updateSteps(2);
                console.log(`Loaded ${makes.length} makes from API`);
            } else {
                console.log("No makes found");
                showInfoMessage("No makes available. Please try a different year.");
                makeSelect.disabled = true;
                makeSelect.innerHTML = '<option value="">No makes found</option>';
            }
            
        } catch (error) {
            console.error("Error fetching makes:", error);
            showInfoMessage("Error loading makes from API. Please try again.");
            makeSelect.disabled = true;
            makeSelect.innerHTML = '<option value="">Error loading</option>';
        } finally {
            // Disable and clear model select
            modelSelect.disabled = true;
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            
            // Hide loading
            showLoading(false);
        }
    } else {
        // Disable both make and model if no year selected
        makeSelect.disabled = true;
        makeSelect.innerHTML = '<option value="">Select Make</option>';
        
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        updateSteps(1);
    }
}

// Handle make change - Fetch models from /models/ endpoint
async function handleMakeChange() {
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (!makeSelect || !modelSelect || !yearSelect) return;
    
    const year = yearSelect.value;
    const make = makeSelect.value;
    const selectedOption = makeSelect.options[makeSelect.selectedIndex];
    const makeName = selectedOption ? selectedOption.getAttribute('data-name') || make : make;
    
    console.log("Make selected:", make, "Make name:", makeName);
    
    if (make && year) {
        // Show loading
        showLoading(true);
        
        // Enable model dropdown immediately
        modelSelect.disabled = false;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        // Add a loading option
        const loadingOption = document.createElement('option');
        loadingOption.value = '';
        loadingOption.textContent = 'Loading models...';
        loadingOption.disabled = true;
        modelSelect.appendChild(loadingOption);
        
        try {
            // Fetch models from Wheel-Size API using /models/ endpoint
            const models = await fetchModelsFromAPI(year, makeName);
            
            // Remove loading option
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            
            if (models && models.length > 0) {
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.slug || model.name;
                    option.textContent = model.name;
                    modelSelect.appendChild(option);
                });
                updateSteps(3);
                console.log(`Loaded ${models.length} models for ${year} ${makeName}`);
            } else {
                console.log("No models found for selected make");
                showInfoMessage("No models found for selected make. Try a different make or year.");
                modelSelect.disabled = true;
                modelSelect.innerHTML = '<option value="">No models found</option>';
            }
            
        } catch (error) {
            console.error("Error fetching models:", error);
            showInfoMessage("Error loading models from API. Please try again.");
            modelSelect.disabled = true;
            modelSelect.innerHTML = '<option value="">Error loading</option>';
        } finally {
            // Hide loading
            showLoading(false);
        }
    } else {
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
    }
}

// Fetch makes from Wheel-Size API using /makes/ endpoint
async function fetchMakesFromAPI() {
    const url = buildWheelSizeAPIUrl('/makes/');
    console.log("Fetching makes from:", url);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });
    
    if (!response.ok) {
        console.error("Makes API error:", response.status, response.statusText);
        throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Makes API response:", data);
    
    // Extract makes from the response
    if (data && data.data && Array.isArray(data.data)) {
        return data.data;
    }
    
    return [];
}

// Fetch models from Wheel-Size API using /models/ endpoint
async function fetchModelsFromAPI(year, make) {
    const url = buildWheelSizeAPIUrl('/models/', { 
        year: year,
        make: make
    });
    console.log("Fetching models from:", url);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });
    
    if (!response.ok) {
        console.error("Models API error:", response.status, response.statusText);
        throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Models API response:", data);
    
    // Extract models from the response
    if (data && data.data && Array.isArray(data.data)) {
        return data.data;
    }
    
    return [];
}

// Handle search
function handleSearch() {
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (!yearSelect || !makeSelect || !modelSelect) return;
    
    const year = yearSelect.value;
    const make = makeSelect.value;
    const selectedOption = makeSelect.options[makeSelect.selectedIndex];
    const makeName = selectedOption ? selectedOption.getAttribute('data-name') || make : make;
    const model = modelSelect.value;
    
    console.log("Searching for:", year, makeName, model);
    
    // Validate inputs
    if (!year || !make || !model) {
        showInfoMessage('Please select year, make, and model');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    // Update steps
    updateSteps(4);
    
    // Fetch tire data
    fetchTireData(year, makeName, model);
}

// Fetch tire data from API
async function fetchTireData(year, make, model) {
    try {
        console.log(`Fetching tire data for: ${year} ${make} ${model}`);
        
        // Try to fetch from Wheel-Size API using /search/by_model/ endpoint
        const tireData = await fetchTireDataFromWheelSizeAPI(year, make, model);
        
        if (tireData) {
            // Update UI with API data
            updateVehicleInfo(year, make, model, tireData);
            showResults();
        } else {
            // No data found
            showInfoMessage('No tire data found for this vehicle. Please try a different vehicle.');
            showLoading(false);
        }
        
    } catch (error) {
        console.error("Error fetching tire data:", error);
        showInfoMessage('Error fetching data from API. Please try again.');
        showLoading(false);
    }
}

// Fetch tire data from Wheel-Size.com API
async function fetchTireDataFromWheelSizeAPI(year, make, model) {
    // Use /search/by_model/ endpoint to get vehicle data
    const searchUrl = buildWheelSizeAPIUrl('/search/by_model/', {
        make: make,
        model: model,
        year: year
    });
    
    console.log("Fetching tire data from:", searchUrl);
    
    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("Tire data response:", data);
            
            if (data && Array.isArray(data) && data.length > 0) {
                const vehicle = data[0];
                
                // Extract tire and wheel data
                if (vehicle.tires && vehicle.tires.length > 0 && vehicle.wheels && vehicle.wheels.length > 0) {
                    const tire = vehicle.tires[0];
                    const wheel = vehicle.wheels[0];
                    
                    const tireSize = `${tire.width}/${tire.aspect_ratio}R${tire.rim_diameter}`;
                    
                    let boltPattern = "Unknown";
                    if (wheel.bolt_pattern) {
                        boltPattern = `${wheel.bolt_pattern.holes}x${wheel.bolt_pattern.diameter}`;
                    }
                    
                    let offset = "Unknown";
                    if (wheel.offset) {
                        offset = wheel.offset >= 0 ? `+${wheel.offset}mm` : `${wheel.offset}mm`;
                    }
                    
                    const rimWidth = wheel.rim_width ? `${wheel.rim_width}"` : "Unknown";
                    
                    return {
                        tireSize: tireSize,
                        rimDiameter: tire.rim_diameter,
                        boltPattern: boltPattern,
                        offset: offset,
                        rimWidth: rimWidth
                    };
                }
            }
        }
        
        // If first endpoint fails, try /vehicles/ endpoint as fallback
        const vehiclesUrl = buildWheelSizeAPIUrl('/vehicles/', {
            make: make,
            model: model,
            year: year
        });
        
        console.log("Trying fallback endpoint:", vehiclesUrl);
        
        const vehiclesResponse = await fetch(vehiclesUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (vehiclesResponse.ok) {
            const vehiclesData = await vehiclesResponse.json();
            console.log("Fallback tire data response:", vehiclesData);
            
            if (vehiclesData && Array.isArray(vehiclesData) && vehiclesData.length > 0) {
                const vehicle = vehiclesData[0];
                
                if (vehicle.tires && vehicle.tires.length > 0 && vehicle.wheels && vehicle.wheels.length > 0) {
                    const tire = vehicle.tires[0];
                    const wheel = vehicle.wheels[0];
                    
                    const tireSize = `${tire.width}/${tire.aspect_ratio}R${tire.rim_diameter}`;
                    
                    let boltPattern = "Unknown";
                    if (wheel.bolt_pattern) {
                        boltPattern = `${wheel.bolt_pattern.holes}x${wheel.bolt_pattern.diameter}`;
                    }
                    
                    let offset = "Unknown";
                    if (wheel.offset) {
                        offset = wheel.offset >= 0 ? `+${wheel.offset}mm` : `${wheel.offset}mm`;
                    }
                    
                    const rimWidth = wheel.rim_width ? `${wheel.rim_width}"` : "Unknown";
                    
                    return {
                        tireSize: tireSize,
                        rimDiameter: tire.rim_diameter,
                        boltPattern: boltPattern,
                        offset: offset,
                        rimWidth: rimWidth
                    };
                }
            }
        }
        
        return null;
        
    } catch (error) {
        console.error("Error in fetchTireDataFromWheelSizeAPI:", error);
        return null;
    }
}

// Update vehicle info in UI
function updateVehicleInfo(year, make, model, data) {
    // Update vehicle title
    const vehicleTitle = document.getElementById('vehicle-title');
    if (vehicleTitle) {
        vehicleTitle.textContent = `${year} ${make} ${model}`;
    }
    
    const vehicleSubtitle = document.getElementById('vehicle-subtitle');
    if (vehicleSubtitle) {
        vehicleSubtitle.textContent = `OEM Tire Specifications`;
    }
    
    // Update tire size
    const primarySize = document.getElementById('primary-size');
    if (primarySize && data.tireSize) {
        primarySize.textContent = data.tireSize;
    }
    
    // Update rim diameter
    const rimDiameter = document.getElementById('rim-diameter');
    if (rimDiameter && data.rimDiameter) {
        rimDiameter.textContent = `${data.rimDiameter}"`;
    }
    
    // Update rim width
    const rimWidth = document.getElementById('rim-width');
    if (rimWidth && data.rimWidth) {
        rimWidth.textContent = data.rimWidth;
    }
    
    // Update bolt pattern
    const boltPattern = document.getElementById('bolt-pattern');
    if (boltPattern && data.boltPattern) {
        boltPattern.textContent = data.boltPattern;
    }
    
    // Update offset
    const offset = document.getElementById('offset');
    if (offset && data.offset) {
        offset.textContent = data.offset;
    }
    
    // Update size breakdown
    if (data.tireSize) {
        updateSizeBreakdown(data.tireSize);
    }
    
    // Hide loading
    showLoading(false);
}

// Update size breakdown
function updateSizeBreakdown(tireSize) {
    const sizeBreakdown = document.getElementById('size-breakdown');
    if (!sizeBreakdown || !tireSize) return;
    
    try {
        // Parse tire size (e.g., "235/45R18")
        const match = tireSize.match(/(\d+)\/(\d+)R(\d+)/);
        if (match) {
            const width = match[1];
            const aspectRatio = match[2];
            const rimDiameter = match[3];
            
            // Calculate sidewall height in mm
            const sidewall = Math.round((width * aspectRatio) / 100);
            
            sizeBreakdown.innerHTML = `
                <div class="breakdown-item">
                    <div class="value">${width}</div>
                    <div class="label">Width</div>
                </div>
                <div class="breakdown-item">
                    <div class="value">${aspectRatio}%</div>
                    <div class="label">Aspect Ratio</div>
                </div>
                <div class="breakdown-item">
                    <div class="value">${rimDiameter}"</div>
                    <div class="label">Rim Diameter</div>
                </div>
                <div class="breakdown-item">
                    <div class="value">${sidewall}mm</div>
                    <div class="label">Sidewall</div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error parsing tire size:", error);
    }
}

// Show results
function showResults() {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        setTimeout(() => {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

// Show loading
function showLoading(show) {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

// Show info message
function showInfoMessage(message) {
    // Remove any existing message
    const existingMessage = document.getElementById('info-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const infoElement = document.createElement('div');
    infoElement.id = 'info-message';
    infoElement.className = 'info-message';
    
    infoElement.innerHTML = `
        <div class="info-message-content">
            <div class="info-message-text">
                <strong><i class="fas fa-info-circle"></i> Note</strong>
                <p>${message}</p>
            </div>
            <button class="info-message-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(infoElement);
    
    // Add event listener for close button
    const closeButton = infoElement.querySelector('.info-message-close');
    closeButton.addEventListener('click', () => {
        infoElement.remove();
    });
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (infoElement && infoElement.parentElement) {
            infoElement.remove();
        }
    }, 8000);
}

// Test function for debugging
window.testAPI = async function() {
    console.log("Testing API...");
    
    // Test makes endpoint
    try {
        const url = buildWheelSizeAPIUrl('/makes/');
        console.log("Testing makes endpoint:", url);
        
        const response = await fetch(url);
        console.log("Response status:", response.status);
        
        const data = await response.json();
        console.log("Makes data:", data);
        
        if (data && data.data) {
            console.log("First 5 makes:", data.data.slice(0, 5));
        }
    } catch (error) {
        console.error("Test error:", error);
    }
};

// Make functions available globally
window.initApp = initApp;
window.handleYearChange = handleYearChange;
window.handleMakeChange = handleMakeChange;
window.handleSearch = handleSearch;
window.updateSteps = updateSteps;
window.showInfoMessage = showInfoMessage;
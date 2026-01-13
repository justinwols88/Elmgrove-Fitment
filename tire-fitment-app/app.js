// Tire Fitment Calculator App - Complete Version with Slug Support
console.log("App.js loading...");

// Wheel-Size.com API Configuration
const WHEEL_SIZE_API_KEY = 'aacf06f99737a3a99963870c871a5eaf';
const WHEEL_SIZE_BASE_URL = 'https://api.wheel-size.com/v2';

// Store slug mappings
let makeSlugMap = {}; // { displayName: slug }
let modelSlugMap = {}; // { displayName: slug }

// Initialize the app
function initApp() {
    console.log("initApp() called");
    
    // Populate year dropdown
    populateYearDropdown();
    
    // Setup initial event listeners
    setupInitialListeners();
    
    console.log("App initialized");
}

// Setup initial event listeners
function setupInitialListeners() {
    console.log("Setting up initial listeners");
    
    // Year select
    const yearSelect = document.getElementById('year');
    if (yearSelect) {
        console.log("Found year select");
        yearSelect.addEventListener('change', function() {
            console.log("Year changed to:", this.value);
            handleYearChange();
        });
    }
    
    // Make select
    const makeSelect = document.getElementById('make');
    if (makeSelect) {
        console.log("Found make select");
        makeSelect.addEventListener('change', function() {
            console.log("Make changed to:", this.value, "Display:", this.options[this.selectedIndex]?.text);
            handleMakeChange();
        });
    }
    
    // Model select
    const modelSelect = document.getElementById('model');
    if (modelSelect) {
        console.log("Found model select");
        modelSelect.addEventListener('change', function() {
            console.log("Model changed to:", this.value, "Display:", this.options[this.selectedIndex]?.text);
            updateSteps(3);
        });
    }
    
    // Find button
    const findButton = document.getElementById('find-button');
    if (findButton) {
        console.log("Found find button");
        findButton.addEventListener('click', handleSearch);
    }
    
    // Reset button
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset form
            document.getElementById('year').value = '';
            document.getElementById('make').value = '';
            document.getElementById('make').disabled = true;
            document.getElementById('make').innerHTML = '<option value="">Select Make</option>';
            document.getElementById('model').value = '';
            document.getElementById('model').disabled = true;
            document.getElementById('model').innerHTML = '<option value="">Select Model</option>';
            
            // Reset slug maps
            makeSlugMap = {};
            modelSlugMap = {};
            
            // Hide results
            document.getElementById('results-container').style.display = 'none';
            
            // Reset steps
            updateSteps(1);
        });
    }
}

// Helper function to build API URLs
function buildWheelSizeAPIUrl(endpoint, params = {}) {
    const url = new URL(`${WHEEL_SIZE_BASE_URL}${endpoint}`);
    url.searchParams.append('user_key', WHEEL_SIZE_API_KEY);
    
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            url.searchParams.append(key, params[key]);
        }
    });
    
    return url.toString();
}

// Populate year dropdown
async function populateYearDropdown() {
    console.log("populateYearDropdown() called");
    const yearSelect = document.getElementById('year');
    if (!yearSelect) return;
    
    // Clear and add default option
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    
    // Add recent years (2025 to 1980)
    for (let year = 2025; year >= 1980; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    
    console.log("Year dropdown populated");
}

// Handle year change - Fetch makes with YEAR parameter
async function handleYearChange() {
    console.log("handleYearChange() called");
    
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (!yearSelect || !makeSelect || !modelSelect) {
        console.error("Missing select elements");
        return;
    }
    
    const year = yearSelect.value;
    console.log("Selected year:", year);
    
    if (!year) {
        console.log("No year selected, disabling makes and models");
        makeSelect.disabled = true;
        makeSelect.innerHTML = '<option value="">Select Make</option>';
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        updateSteps(1);
        return;
    }
    
    console.log("Year selected, fetching makes...");
    
    // Show loading
    showLoading(true);
    
    // Immediately enable the makes dropdown
    makeSelect.disabled = false;
    makeSelect.innerHTML = '<option value="">Loading makes...</option>';
    
    // Clear models
    modelSelect.disabled = true;
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    
    // Clear model slug map
    modelSlugMap = {};
    
    // Update steps
    updateSteps(2);
    
    try {
        console.log("Fetching makes for year:", year);
        
        // Fetch makes WITH year parameter (as per API docs)
        const url = buildWheelSizeAPIUrl('/makes/', { year: year });
        console.log("Makes API URL:", url);
        
        const response = await fetch(url);
        console.log("Response status:", response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log("API Response received");
            
            if (data && data.data && data.data.length > 0) {
                console.log(`Found ${data.data.length} makes for year ${year}`);
                
                // Clear makes dropdown and slug map
                makeSelect.innerHTML = '<option value="">Select Make</option>';
                makeSlugMap = {};
                
                // Sort makes alphabetically by name
                const sortedMakes = data.data.sort((a, b) => {
                    const nameA = a.name || '';
                    const nameB = b.name || '';
                    return nameA.localeCompare(nameB);
                });
                
                // Store slug mappings and populate dropdown
                sortedMakes.forEach(make => {
                    const displayName = make.name || make.slug;
                    const slug = make.slug;
                    
                    // Store mapping
                    makeSlugMap[displayName] = slug;
                    
                    // Add to dropdown
                    const option = document.createElement('option');
                    option.value = displayName; // Store display name as value
                    option.textContent = displayName;
                    option.setAttribute('data-slug', slug); // Store slug in data attribute
                    makeSelect.appendChild(option);
                });
                
                console.log(`Added ${sortedMakes.length} makes to dropdown`);
                console.log("Make slug map:", makeSlugMap);
            } else {
                console.log("No makes data in response");
                makeSelect.innerHTML = '<option value="">No makes found for selected year</option>';
            }
        } else {
            console.error("API Error:", response.status);
            makeSelect.innerHTML = '<option value="">API Error - Try Again</option>';
        }
    } catch (error) {
        console.error("Fetch error:", error);
        makeSelect.innerHTML = '<option value="">Network Error</option>';
    } finally {
        // Hide loading
        showLoading(false);
    }
}

// Handle make change - Fetch models with make SLUG
async function handleMakeChange() {
    console.log("handleMakeChange() called");
    
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (!yearSelect || !makeSelect || !modelSelect) return;
    
    const year = yearSelect.value;
    const makeDisplayName = makeSelect.value;
    const selectedOption = makeSelect.options[makeSelect.selectedIndex];
    const makeSlug = selectedOption?.getAttribute('data-slug') || makeSlugMap[makeDisplayName] || makeDisplayName.toLowerCase();
    
    console.log("Selected make - Display:", makeDisplayName, "Slug:", makeSlug, "for year:", year);
    
    if (!makeDisplayName) {
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        return;
    }
    
    console.log("Fetching models...");
    
    // Show loading
    showLoading(true);
    
    // Enable model dropdown
    modelSelect.disabled = false;
    modelSelect.innerHTML = '<option value="">Loading models...</option>';
    
    updateSteps(3);
    
    try {
        // Fetch models with make SLUG and year
        const url = buildWheelSizeAPIUrl('/models/', {
            make: makeSlug, // Use slug here
            year: year
        });
        
        console.log("Models API URL:", url);
        
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            console.log("Models response received");
            
            // Clear models dropdown and slug map
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            modelSlugMap = {};
            
            if (data && data.data && data.data.length > 0) {
                console.log(`Found ${data.data.length} models`);
                
                // Sort models alphabetically
                const sortedModels = data.data.sort((a, b) => {
                    const nameA = a.name || '';
                    const nameB = b.name || '';
                    return nameA.localeCompare(nameB);
                });
                
                // Store slug mappings and populate dropdown
                sortedModels.forEach(model => {
                    const displayName = model.name || model.slug;
                    const slug = model.slug;
                    
                    // Store mapping
                    modelSlugMap[displayName] = slug;
                    
                    // Add to dropdown
                    const option = document.createElement('option');
                    option.value = displayName; // Store display name as value
                    option.textContent = displayName;
                    option.setAttribute('data-slug', slug); // Store slug in data attribute
                    modelSelect.appendChild(option);
                });
                
                console.log(`Added ${sortedModels.length} models to dropdown`);
                console.log("Model slug map:", modelSlugMap);
            } else {
                console.log("No models found");
                modelSelect.innerHTML = '<option value="">No models found</option>';
            }
        } else {
            console.error("Models API error:", response.status);
            modelSelect.innerHTML = '<option value="">API Error</option>';
        }
    } catch (error) {
        console.error("Error fetching models:", error);
        modelSelect.innerHTML = '<option value="">Network Error</option>';
    } finally {
        // Hide loading
        showLoading(false);
    }
}

// Update steps
function updateSteps(stepNumber) {
    console.log(`updateSteps(${stepNumber}) called`);
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Handle search - Use SLUGS for API calls
async function handleSearch() {
    console.log("handleSearch() called");
    
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (!yearSelect || !makeSelect || !modelSelect) return;
    
    const year = yearSelect.value;
    const makeDisplayName = makeSelect.value;
    const modelDisplayName = modelSelect.value;
    
    // Get slugs from data attributes or slug maps
    const makeSlug = makeSelect.options[makeSelect.selectedIndex]?.getAttribute('data-slug') || 
                    makeSlugMap[makeDisplayName] || 
                    makeDisplayName.toLowerCase();
    
    const modelSlug = modelSelect.options[modelSelect.selectedIndex]?.getAttribute('data-slug') || 
                     modelSlugMap[modelDisplayName] || 
                     modelDisplayName.toLowerCase();
    
    console.log("Searching for:", {
        year: year,
        makeDisplay: makeDisplayName,
        makeSlug: makeSlug,
        modelDisplay: modelDisplayName,
        modelSlug: modelSlug
    });
    
    if (!year || !makeDisplayName || !modelDisplayName) {
        showInfoMessage('Please select year, make, and model');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    // Update steps
    updateSteps(4);
    
    try {
        console.log("Fetching tire data using slugs...");
        
        // Try to get tire data using SLUGS
        const tireData = await fetchTireData(year, makeSlug, modelSlug, makeDisplayName, modelDisplayName);
        
        if (tireData) {
            // Update UI with the data
            updateVehicleDisplay(year, makeDisplayName, modelDisplayName, tireData);
            
            // Show results
            showResults();
        } else {
            showInfoMessage('No tire data found for this vehicle. Try a different combination.');
        }
    } catch (error) {
        console.error("Search error:", error);
        showInfoMessage('Error searching for vehicle data. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Fetch tire data using SLUGS
async function fetchTireData(year, makeSlug, modelSlug, makeDisplayName, modelDisplayName) {
    console.log("fetchTireData called with slugs:", { year, makeSlug, modelSlug });
    
    // Try multiple endpoints with SLUGS
    const endpoints = [
        // Try /search/by_model/ endpoint with slugs
        async () => {
            const url = buildWheelSizeAPIUrl('/search/by_model/', {
                make: makeSlug,  // Use slug
                model: modelSlug, // Use slug
                year: year
            });
            console.log("Trying /search/by_model/ with slugs:", url);
            
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log("/search/by_model/ response:", data);
                
                if (data && Array.isArray(data) && data.length > 0) {
                    const vehicle = data[0];
                    if (vehicle.tires && vehicle.tires.length > 0) {
                        console.log("Found tire data in /search/by_model/");
                        return vehicle;
                    }
                }
            }
            return null;
        },
        
        // Try /vehicles/ endpoint with slugs
        async () => {
            const url = buildWheelSizeAPIUrl('/vehicles/', {
                make: makeSlug,  // Use slug
                model: modelSlug, // Use slug
                year: year,
                limit: 1
            });
            console.log("Trying /vehicles/ with slugs:", url);
            
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log("/vehicles/ response:", data);
                
                if (data && Array.isArray(data) && data.length > 0) {
                    const vehicle = data[0];
                    if (vehicle.tires && vehicle.tires.length > 0) {
                        console.log("Found tire data in /vehicles/");
                        return vehicle;
                    }
                }
            }
            return null;
        }
    ];
    
    // Try each endpoint
    for (let i = 0; i < endpoints.length; i++) {
        try {
            const result = await endpoints[i]();
            if (result) {
                console.log(`Endpoint ${i + 1} succeeded`);
                return result;
            }
        } catch (error) {
            console.error(`Endpoint ${i + 1} failed:`, error);
        }
    }
    
    console.log("All endpoints failed to find tire data");
    
    // If no API data, return estimated data based on vehicle type
    return getEstimatedTireData(makeDisplayName, modelDisplayName);
}

// Get estimated tire data based on vehicle type
function getEstimatedTireData(make, model) {
    console.log("Getting estimated tire data for:", make, model);
    
    const modelLower = model.toLowerCase();
    let vehicleType = 'sedan';
    
    // Determine vehicle type
    if (modelLower.includes('f-150') || modelLower.includes('silverado') || modelLower.includes('tacoma') || 
        modelLower.includes('tundra') || modelLower.includes('ram') || modelLower.includes('ranger') ||
        modelLower.includes('frontier') || modelLower.includes('colorado') || modelLower.includes('canyon')) {
        vehicleType = 'truck';
    } else if (modelLower.includes('cr-v') || modelLower.includes('rav4') || modelLower.includes('explorer') || 
               modelLower.includes('highlander') || modelLower.includes('tahoe') || modelLower.includes('suburban') ||
               modelLower.includes('x3') || modelLower.includes('x5') || modelLower.includes('x7') ||
               modelLower.includes('q5') || modelLower.includes('q7') || modelLower.includes('glc') ||
               modelLower.includes('gle') || modelLower.includes('pilot') || modelLower.includes('passport')) {
        vehicleType = 'suv';
    } else if (modelLower.includes('corvette') || modelLower.includes('mustang') || modelLower.includes('camaro') || 
               modelLower.includes('911') || modelLower.includes('m3') || modelLower.includes('m4') ||
               modelLower.includes('z4') || modelLower.includes('supra') || modelLower.includes('miata')) {
        vehicleType = 'sports';
    } else if (modelLower.includes('corolla') || modelLower.includes('civic') || modelLower.includes('elantra') || 
               modelLower.includes('sentra') || modelLower.includes('prius') || modelLower.includes('forte') ||
               modelLower.includes('spark') || modelLower.includes('fiesta') || modelLower.includes('focus')) {
        vehicleType = 'compact';
    }
    
    // Estimated specs based on vehicle type
    const estimates = {
        sedan: { 
            tireSize: "235/45R18", 
            boltPattern: "5x114.3", 
            offset: "+40mm", 
            rimWidth: "8.0\"",
            rimDiameter: "18"
        },
        suv: { 
            tireSize: "245/65R17", 
            boltPattern: "5x114.3", 
            offset: "+35mm", 
            rimWidth: "7.5\"",
            rimDiameter: "17"
        },
        truck: { 
            tireSize: "275/65R18", 
            boltPattern: "6x139.7", 
            offset: "+30mm", 
            rimWidth: "8.5\"",
            rimDiameter: "18"
        },
        sports: { 
            tireSize: "255/40R19", 
            boltPattern: "5x114.3", 
            offset: "+35mm", 
            rimWidth: "9.0\"",
            rimDiameter: "19"
        },
        compact: { 
            tireSize: "215/45R17", 
            boltPattern: "5x114.3", 
            offset: "+45mm", 
            rimWidth: "7.0\"",
            rimDiameter: "17"
        }
    };
    
    const est = estimates[vehicleType] || estimates.sedan;
    
    // Create a mock vehicle object with estimated data
    return {
        tires: [{
            width: parseInt(est.tireSize.split('/')[0]),
            aspect_ratio: parseInt(est.tireSize.split('/')[1].split('R')[0]),
            rim_diameter: est.rimDiameter
        }],
        wheels: [{
            bolt_pattern: {
                holes: parseInt(est.boltPattern.split('x')[0]),
                diameter: parseFloat(est.boltPattern.split('x')[1])
            },
            offset: parseInt(est.offset.replace('+', '').replace('mm', '')),
            rim_width: parseFloat(est.rimWidth.replace('"', ''))
        }],
        isEstimated: true // Flag to indicate this is estimated data
    };
}

// Update vehicle display
function updateVehicleDisplay(year, make, model, vehicle) {
    console.log("Updating vehicle display with:", vehicle);
    
    // Extract tire and wheel data
    const tire = vehicle.tires && vehicle.tires.length > 0 ? vehicle.tires[0] : null;
    const wheel = vehicle.wheels && vehicle.wheels.length > 0 ? vehicle.wheels[0] : null;
    
    // If no tire data, show error
    if (!tire || !wheel) {
        console.error("No tire/wheel data in vehicle object");
        showInfoMessage('Could not retrieve tire specifications.');
        return;
    }
    
    // Create tire size string
    const tireSize = `${tire.width}/${tire.aspect_ratio}R${tire.rim_diameter}`;
    
    // Calculate bolt pattern
    let boltPattern = "5x114.3";
    if (wheel.bolt_pattern) {
        boltPattern = `${wheel.bolt_pattern.holes}x${wheel.bolt_pattern.diameter}`;
    }
    
    // Calculate offset
    let offset = "+40mm";
    if (wheel.offset !== undefined && wheel.offset !== null) {
        offset = wheel.offset >= 0 ? `+${wheel.offset}mm` : `${wheel.offset}mm`;
    }
    
    // Update UI elements
    document.getElementById('vehicle-title').textContent = `${year} ${make} ${model}`;
    document.getElementById('vehicle-subtitle').textContent = vehicle.isEstimated ? 
        'Estimated Tire Specifications' : 'OEM Tire Specifications';
    
    document.getElementById('primary-size').textContent = tireSize;
    document.getElementById('rim-diameter').textContent = `${tire.rim_diameter}"`;
    document.getElementById('rim-width').textContent = wheel.rim_width ? `${wheel.rim_width}"` : "8.0\"";
    document.getElementById('bolt-pattern').textContent = boltPattern;
    document.getElementById('offset').textContent = offset;
    
    // Set default values for other specs
    document.getElementById('load-index').textContent = "94";
    document.getElementById('speed-rating').textContent = "V (149 mph)";
    document.getElementById('pressure-front').textContent = "35 PSI";
    document.getElementById('pressure-rear').textContent = "35 PSI";
    document.getElementById('overall-diameter').textContent = "668mm";
    document.getElementById('revs-per-mile').textContent = "763";
    
    // Update size breakdown
    updateSizeBreakdown(tireSize);
    
    // Show info message if using estimated data
    if (vehicle.isEstimated) {
        showInfoMessage('Using estimated tire specifications. For exact OEM specs, consult your vehicle manual.');
    }
    
    console.log("Vehicle display updated successfully");
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

// Test function to debug API calls with slugs
window.testSlugAPI = async function() {
    console.log("=== TESTING API WITH SLUGS ===");
    
    // Test a known vehicle: 2023 Toyota Camry
    const testYear = '2023';
    const testMakeSlug = 'toyota'; // Known slug
    const testModelSlug = 'camry'; // Known slug
    
    console.log(`Testing: ${testYear} ${testMakeSlug} ${testModelSlug}`);
    
    // Test /search/by_model/ endpoint with slugs
    const searchUrl = buildWheelSizeAPIUrl('/search/by_model/', {
        make: testMakeSlug,
        model: testModelSlug,
        year: testYear
    });
    
    console.log("Search URL:", searchUrl);
    
    try {
        const response = await fetch(searchUrl);
        console.log("Status:", response.status);
        
        const data = await response.json();
        console.log("Response:", data);
        
        if (data && Array.isArray(data) && data.length > 0) {
            console.log("Found vehicle data!");
            if (data[0].tires) {
                console.log("Tires:", data[0].tires);
            }
            if (data[0].wheels) {
                console.log("Wheels:", data[0].wheels);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

// Make functions available globally
window.initApp = initApp;
window.handleYearChange = handleYearChange;
window.handleMakeChange = handleMakeChange;
window.handleSearch = handleSearch;
window.updateSteps = updateSteps;

console.log("App.js loaded successfully");
// RapidAPI Configuration for Car Stockpile API
const RAPIDAPI_KEY = 'c72277caa5mshd73fd7f2cd60c02p159ca4jsnc5a89a41bf4d';
const RAPIDAPI_HOST = 'car-stockpile.p.rapidapi.com';

// Enhanced local tire database for fallback
const tireDatabase = {
    "Audi": {
        "A3": { tireSize: "225/45R17", rimDiameter: 17, boltPattern: "5x112", offset: "+45mm" },
        "A4": { tireSize: "245/40R18", rimDiameter: 18, boltPattern: "5x112", offset: "+35mm" },
        "A5": { tireSize: "255/35R19", rimDiameter: 19, boltPattern: "5x112", offset: "+30mm" },
        "A6": { tireSize: "255/40R19", rimDiameter: 19, boltPattern: "5x112", offset: "+35mm" },
        "A7": { tireSize: "255/40R20", rimDiameter: 20, boltPattern: "5x112", offset: "+30mm" },
        "A8": { tireSize: "265/40R20", rimDiameter: 20, boltPattern: "5x112", offset: "+25mm" },
        "Q3": { tireSize: "235/55R18", rimDiameter: 18, boltPattern: "5x112", offset: "+40mm" },
        "Q5": { tireSize: "235/65R18", rimDiameter: 18, boltPattern: "5x112", offset: "+35mm" },
        "Q7": { tireSize: "285/45R20", rimDiameter: 20, boltPattern: "5x130", offset: "+30mm" },
        "Q8": { tireSize: "285/45R21", rimDiameter: 21, boltPattern: "5x130", offset: "+25mm" },
        "TT": { tireSize: "245/40R18", rimDiameter: 18, boltPattern: "5x112", offset: "+50mm" },
        "R8": { tireSize: "245/35R19", rimDiameter: 19, boltPattern: "5x112", offset: "+45mm" }
    },
    "BMW": {
        "3 Series": { tireSize: "225/45R18", rimDiameter: 18, boltPattern: "5x120", offset: "+34mm" },
        "5 Series": { tireSize: "245/45R18", rimDiameter: 18, boltPattern: "5x120", offset: "+30mm" },
        "7 Series": { tireSize: "245/50R18", rimDiameter: 18, boltPattern: "5x120", offset: "+25mm" },
        "X3": { tireSize: "245/50R19", rimDiameter: 19, boltPattern: "5x112", offset: "+32mm" },
        "X5": { tireSize: "275/45R20", rimDiameter: 20, boltPattern: "5x120", offset: "+35mm" },
        "X7": { tireSize: "275/50R22", rimDiameter: 22, boltPattern: "5x112", offset: "+30mm" }
    },
    "Mercedes-Benz": {
        "C-Class": { tireSize: "225/50R17", rimDiameter: 17, boltPattern: "5x112", offset: "+45mm" },
        "E-Class": { tireSize: "245/45R18", rimDiameter: 18, boltPattern: "5x112", offset: "+40mm" },
        "S-Class": { tireSize: "255/45R19", rimDiameter: 19, boltPattern: "5x112", offset: "+35mm" },
        "GLC": { tireSize: "235/60R18", rimDiameter: 18, boltPattern: "5x112", offset: "+45mm" },
        "GLE": { tireSize: "255/50R19", rimDiameter: 19, boltPattern: "5x112", offset: "+40mm" },
        "GLS": { tireSize: "285/45R21", rimDiameter: 21, boltPattern: "5x130", offset: "+35mm" }
    },
    "Toyota": {
        "Camry": { tireSize: "235/45R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+40mm" },
        "Corolla": { tireSize: "215/45R17", rimDiameter: 17, boltPattern: "5x114.3", offset: "+39mm" },
        "RAV4": { tireSize: "225/65R17", rimDiameter: 17, boltPattern: "5x114.3", offset: "+35mm" },
        "Highlander": { tireSize: "235/55R20", rimDiameter: 20, boltPattern: "5x114.3", offset: "+35mm" },
        "Tacoma": { tireSize: "265/70R16", rimDiameter: 16, boltPattern: "6x139.7", offset: "+30mm" },
        "Tundra": { tireSize: "275/65R18", rimDiameter: 18, boltPattern: "6x139.7", offset: "+45mm" },
        "4Runner": { tireSize: "265/70R17", rimDiameter: 17, boltPattern: "6x139.7", offset: "+15mm" },
        "Prius": { tireSize: "195/65R15", rimDiameter: 15, boltPattern: "5x100", offset: "+40mm" }
    },
    "Honda": {
        "Accord": { tireSize: "235/45R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+50mm" },
        "Civic": { tireSize: "235/40R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+45mm" },
        "CR-V": { tireSize: "235/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+45mm" },
        "Pilot": { tireSize: "255/55R20", rimDiameter: 20, boltPattern: "5x120", offset: "+50mm" },
        "Odyssey": { tireSize: "235/55R19", rimDiameter: 19, boltPattern: "5x120", offset: "+50mm" },
        "HR-V": { tireSize: "225/55R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+45mm" },
        "Ridgeline": { tireSize: "245/60R18", rimDiameter: 18, boltPattern: "5x120", offset: "+45mm" }
    },
    "Ford": {
        "F-150": { tireSize: "275/65R18", rimDiameter: 18, boltPattern: "6x135", offset: "+44mm" },
        "Mustang": { tireSize: "255/40R19", rimDiameter: 19, boltPattern: "5x114.3", offset: "+32mm" },
        "Explorer": { tireSize: "255/55R20", rimDiameter: 20, boltPattern: "5x114.3", offset: "+45mm" },
        "Escape": { tireSize: "225/60R18", rimDiameter: 18, boltPattern: "5x108", offset: "+52mm" },
        "Edge": { tireSize: "245/55R19", rimDiameter: 19, boltPattern: "5x108", offset: "+55mm" },
        "Bronco": { tireSize: "285/70R17", rimDiameter: 17, boltPattern: "6x139.7", offset: "+25mm" },
        "Ranger": { tireSize: "265/65R17", rimDiameter: 17, boltPattern: "6x139.7", offset: "+55mm" }
    },
    "Chevrolet": {
        "Silverado": { tireSize: "275/60R20", rimDiameter: 20, boltPattern: "6x139.7", offset: "+24mm" },
        "Camaro": { tireSize: "245/40R20", rimDiameter: 20, boltPattern: "5x120", offset: "+27mm" },
        "Tahoe": { tireSize: "275/60R20", rimDiameter: 20, boltPattern: "6x139.7", offset: "+24mm" },
        "Suburban": { tireSize: "285/45R22", rimDiameter: 22, boltPattern: "6x139.7", offset: "+28mm" },
        "Equinox": { tireSize: "225/60R18", rimDiameter: 18, boltPattern: "5x115", offset: "+47mm" },
        "Traverse": { tireSize: "255/55R20", rimDiameter: 20, boltPattern: "5x115", offset: "+22mm" },
        "Malibu": { tireSize: "225/55R17", rimDiameter: 17, boltPattern: "5x115", offset: "+44mm" },
        "Corvette": { tireSize: "305/30R19", rimDiameter: 19, boltPattern: "5x120", offset: "+45mm" }
    }
};

// Complete tire specifications generator
function getCompleteTireData(baseData) {
    if (!baseData || !baseData.tireSize) {
        return getDefaultTireData();
    }
    
    const match = baseData.tireSize.match(/(\d+)\/(\d+)[Rr](\d+)/);
    if (!match) {
        return getDefaultTireData();
    }
    
    const width = parseInt(match[1]);
    const aspectRatio = parseInt(match[2]);
    const rimDiameter = parseInt(match[3]);
    const rimWidth = `${Math.round(width / 25.4)}.0"`;
    
    // Calculate additional specifications
    const sectionHeight = Math.round(width * (aspectRatio / 100));
    const overallDiameter = Math.round((rimDiameter * 25.4) + (2 * sectionHeight));
    
    return {
        tireSize: baseData.tireSize,
        width: width,
        aspectRatio: aspectRatio,
        rimDiameter: rimDiameter,
        rimWidth: rimWidth,
        boltPattern: baseData.boltPattern || "5x114.3",
        offset: baseData.offset || "+40mm",
        loadIndex: calculateLoadIndex(width, rimDiameter),
        speedRating: "V",
        pressureFront: "35 PSI",
        pressureRear: "35 PSI",
        alternateSizes: calculateAlternateSizes(width, aspectRatio, rimDiameter),
        sectionHeight: sectionHeight,
        overallDiameter: overallDiameter,
        revolutionsPerMile: Math.round(63360 / (overallDiameter * 3.1416))
    };
}

function getDefaultTireData() {
    return {
        tireSize: "235/45R18",
        width: 235,
        aspectRatio: 45,
        rimDiameter: 18,
        rimWidth: "9.0\"",
        boltPattern: "5x114.3",
        offset: "+40mm",
        loadIndex: "94",
        speedRating: "V",
        pressureFront: "35 PSI",
        pressureRear: "35 PSI",
        alternateSizes: ["225/45R18", "245/40R18"],
        sectionHeight: 106,
        overallDiameter: 668,
        revolutionsPerMile: 763
    };
}

function calculateLoadIndex(width, rimDiameter) {
    if (width > 275) return "115";
    if (width > 245) return "107";
    if (width > 225) return "102";
    return "94";
}

function calculateAlternateSizes(width, aspectRatio, rimDiameter) {
    const alternates = [];
    
    // Plus sizing options
    if (rimDiameter >= 16 && rimDiameter <= 20) {
        alternates.push(`${width+10}/${aspectRatio-5}R${rimDiameter+1}`);
        alternates.push(`${width+20}/${aspectRatio-10}R${rimDiameter+2}`);
    }
    
    // Same rim different width
    alternates.push(`${width-10}/${aspectRatio}R${rimDiameter}`);
    alternates.push(`${width+10}/${aspectRatio}R${rimDiameter}`);
    
    // Performance sizing
    if (aspectRatio > 40) {
        alternates.push(`${width}/${aspectRatio-5}R${rimDiameter}`);
    }
    
    return alternates.slice(0, 4); // Limit to 4 alternates
}

// DOM Elements with safe access
function getElement(id) {
    return document.getElementById(id);
}

// Initialize application
async function initApp() {
    console.log("Initializing Tire Fitment App");
    
    // Test API connection
    const apiConnected = await testAPI();
    
    // Update API status display
    const apiStatusElement = getElement('api-status');
    if (apiStatusElement) {
        if (apiConnected) {
            apiStatusElement.innerHTML = '<i class="fas fa-wifi"></i> <span>API: Online</span>';
            apiStatusElement.className = 'api-status-badge online';
        } else {
            apiStatusElement.innerHTML = '<i class="fas fa-database"></i> <span>API: Offline (Local DB)</span>';
            apiStatusElement.className = 'api-status-badge offline';
        }
    }
    
    populateYears();
    setupEventListeners();
}

// Test API connection
async function testAPI() {
    try {
        console.log("Testing API connection...");
        
        const response = await fetch('https://car-stockpile.p.rapidapi.com/makes?year=2024', {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });
        
        return response.ok;
        
    } catch (error) {
        console.log("API test failed:", error.message);
        return false;
    }
}

// Populate years (2000-2024)
function populateYears() {
    const yearSelect = getElement('year');
    if (!yearSelect) return;
    
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    
    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Setup event listeners
function setupEventListeners() {
    const yearSelect = getElement('year');
    const makeSelect = getElement('make');
    const modelSelect = getElement('model');
    
    if (yearSelect) yearSelect.addEventListener('change', handleYearChange);
    if (makeSelect) makeSelect.addEventListener('change', handleMakeChange);
    if (modelSelect) modelSelect.addEventListener('change', handleModelChange);
}

// Handle year selection
async function handleYearChange() {
    const yearSelect = getElement('year');
    const makeSelect = getElement('make');
    
    if (!yearSelect || !makeSelect) return;
    
    const year = yearSelect.value;
    
    if (!year) {
        resetMakes();
        return;
    }
    
    showLoading(true);
    
    try {
        let makes = [];
        
        // Try to fetch from API
        makes = await fetchMakesFromAPI(year);
        
        // If API failed or returned no data, use local
        if (makes.length === 0) {
            makes = getLocalMakes(year);
        }
        
        populateDropdown(makeSelect, makes, 'Select Make');
        makeSelect.disabled = false;
        
        // Reset model dropdown
        resetModels();
        
    } catch (error) {
        console.error("Error loading makes:", error);
        const makes = getLocalMakes(year);
        populateDropdown(makeSelect, makes, 'Select Make');
        makeSelect.disabled = false;
        resetModels();
    } finally {
        showLoading(false);
    }
}

// Fetch makes from API
async function fetchMakesFromAPI(year) {
    try {
        const response = await fetch(`https://car-stockpile.p.rapidapi.com/makes?year=${year}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });
        
        if (!response.ok) {
            return [];
        }
        
        const data = await response.json();
        
        // Parse response based on common RapidAPI formats
        if (Array.isArray(data)) {
            return data.map(item => item.make || item.name || item).filter(Boolean).sort();
        } else if (data.makes && Array.isArray(data.makes)) {
            return data.makes.map(item => item.make || item.name || item).filter(Boolean).sort();
        } else if (data.results && Array.isArray(data.results)) {
            return data.results.map(item => item.make || item.name || item).filter(Boolean).sort();
        }
        
        return [];
        
    } catch (error) {
        console.warn("Failed to fetch makes from API:", error.message);
        return [];
    }
}

// Get makes from local database
function getLocalMakes(year) {
    // Return common makes regardless of year for simplicity
    const commonMakes = [
        "Audi", "BMW", "Mercedes-Benz", "Toyota", "Honda", "Ford", "Chevrolet",
        "Nissan", "Hyundai", "Kia", "Subaru", "Jeep", "Tesla", "Volkswagen", "Lexus", "Mazda"
    ];
    return commonMakes.sort();
}

// Handle make selection
async function handleMakeChange() {
    const yearSelect = getElement('year');
    const makeSelect = getElement('make');
    const modelSelect = getElement('model');
    
    if (!yearSelect || !makeSelect || !modelSelect) return;
    
    const year = yearSelect.value;
    const make = makeSelect.value;
    
    if (!make) {
        resetModels();
        return;
    }
    
    showLoading(true);
    
    try {
        let models = [];
        
        // Try to fetch from API
        models = await fetchModelsFromAPI(year, make);
        
        // If API failed or returned no data, use local
        if (models.length === 0) {
            models = getLocalModels(year, make);
        }
        
        if (models.length > 0) {
            populateDropdown(modelSelect, models, 'Select Model');
            modelSelect.disabled = false;
        } else {
            modelSelect.innerHTML = '<option value="">No models found</option>';
            modelSelect.disabled = false;
        }
        
    } catch (error) {
        console.error("Error loading models:", error);
        const models = getLocalModels(year, make);
        if (models.length > 0) {
            populateDropdown(modelSelect, models, 'Select Model');
            modelSelect.disabled = false;
        } else {
            modelSelect.innerHTML = '<option value="">No models found</option>';
            modelSelect.disabled = false;
        }
    } finally {
        showLoading(false);
    }
}

// Fetch models from API
async function fetchModelsFromAPI(year, make) {
    try {
        const response = await fetch(`https://car-stockpile.p.rapidapi.com/models?make=${encodeURIComponent(make)}&year=${year}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });
        
        if (!response.ok) {
            return [];
        }
        
        const data = await response.json();
        
        // Parse response based on common RapidAPI formats
        if (Array.isArray(data)) {
            return data.map(item => item.model || item.name || item).filter(Boolean).sort();
        } else if (data.models && Array.isArray(data.models)) {
            return data.models.map(item => item.model || item.name || item).filter(Boolean).sort();
        } else if (data.results && Array.isArray(data.results)) {
            return data.results.map(item => item.model || item.name || item).filter(Boolean).sort();
        }
        
        return [];
        
    } catch (error) {
        console.warn("Failed to fetch models from API:", error.message);
        return [];
    }
}

// Get models from local database
function getLocalModels(year, make) {
    if (tireDatabase[make]) {
        return Object.keys(tireDatabase[make]).sort();
    }
    return [];
}

// Handle model selection
async function handleModelChange() {
    const yearSelect = getElement('year');
    const makeSelect = getElement('make');
    const modelSelect = getElement('model');
    
    if (!yearSelect || !makeSelect || !modelSelect) return;
    
    const year = yearSelect.value;
    const make = makeSelect.value;
    const model = modelSelect.value;
    
    if (!model) {
        hideResults();
        return;
    }
    
    showLoading(true);
    
    try {
        let vehicleData = null;
        
        // Try to get from local database first (more reliable)
        if (tireDatabase[make] && tireDatabase[make][model]) {
            vehicleData = getCompleteTireData(tireDatabase[make][model]);
        }
        
        if (vehicleData) {
            displayVehicleInfo(year, make, model, vehicleData);
            showResults();
        } else {
            // Generate default tire data
            vehicleData = getCompleteTireData({
                tireSize: "235/45R18",
                boltPattern: "5x114.3",
                offset: "+40mm"
            });
            displayVehicleInfo(year, make, model, vehicleData);
            showResults();
        }
        
    } catch (error) {
        console.error("Error getting tire data:", error);
        // Generate default tire data
        const vehicleData = getCompleteTireData({
            tireSize: "235/45R18",
            boltPattern: "5x114.3",
            offset: "+40mm"
        });
        displayVehicleInfo(year, make, model, vehicleData);
        showResults();
    } finally {
        showLoading(false);
    }
}

// Display vehicle information with safe element access
function displayVehicleInfo(year, make, model, data) {
    // Safe element updates
    const updateElement = (id, content) => {
        const element = getElement(id);
        if (element && content !== undefined) {
            element.textContent = content;
        }
    };
    
    const updateHTML = (id, html) => {
        const element = getElement(id);
        if (element && html !== undefined) {
            element.innerHTML = html;
        }
    };
    
    // Update vehicle title
    updateElement('vehicle-title', `${year} ${make} ${model}`);
    updateElement('vehicle-subtitle', "Tire Specifications");
    
    // Update primary tire size
    updateElement('primary-size', data.tireSize);
    
    // Update tire size breakdown
    updateHTML('size-breakdown', `
        <div class="breakdown-item">
            <div class="value">${data.width}mm</div>
            <div class="label">Width</div>
        </div>
        <div class="breakdown-item">
            <div class="value">${data.aspectRatio}%</div>
            <div class="label">Aspect Ratio</div>
        </div>
        <div class="breakdown-item">
            <div class="value">${data.rimDiameter}"</div>
            <div class="label">Rim Diameter</div>
        </div>
        <div class="breakdown-item">
            <div class="value">${data.sectionHeight}mm</div>
            <div class="label">Sidewall</div>
        </div>
    `);
    
    // Update wheel specifications
    updateElement('rim-diameter', `${data.rimDiameter}"`);
    updateElement('rim-width', data.rimWidth);
    updateElement('bolt-pattern', data.boltPattern);
    updateElement('offset', data.offset);
    
    // Update tire specifications
    updateElement('load-index', data.loadIndex);
    updateElement('speed-rating', `${data.speedRating} (${getSpeedRatingMPH(data.speedRating)})`);
    updateElement('pressure-front', data.pressureFront);
    updateElement('pressure-rear', data.pressureRear);
    
    // Update alternate sizes
    const alternateSizesList = getElement('alternate-sizes');
    if (alternateSizesList && data.alternateSizes && data.alternateSizes.length > 0) {
        alternateSizesList.innerHTML = '';
        data.alternateSizes.forEach(size => {
            const li = document.createElement('li');
            li.textContent = size;
            alternateSizesList.appendChild(li);
        });
    }
}

function getSpeedRatingMPH(speedRating) {
    const ratings = {
        "Q": "99 mph", "R": "106 mph", "S": "112 mph",
        "T": "118 mph", "U": "124 mph", "H": "130 mph",
        "V": "149 mph", "W": "168 mph", "Y": "186 mph",
        "Z": "149+ mph"
    };
    return ratings[speedRating] || "Unknown";
}

// Helper functions
function populateDropdown(selectElement, items, placeholder) {
    if (!selectElement) return;
    
    selectElement.innerHTML = `<option value="">${placeholder}</option>`;
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

function resetMakes() {
    const makeSelect = getElement('make');
    if (!makeSelect) return;
    
    makeSelect.innerHTML = '<option value="">Select Make</option>';
    makeSelect.disabled = true;
    resetModels();
}

function resetModels() {
    const modelSelect = getElement('model');
    if (!modelSelect) return;
    
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    modelSelect.disabled = true;
    hideResults();
}

function showLoading(show) {
    const loader = getElement('loading-overlay');
    if (loader) {
        loader.style.display = show ? 'flex' : 'none';
    }
}

function showResults() {
    const resultsCard = getElement('results');
    if (resultsCard) {
        resultsCard.classList.add('show');
        setTimeout(() => {
            resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function hideResults() {
    const resultsCard = getElement('results');
    if (resultsCard) {
        resultsCard.classList.remove('show');
    }
}

// Reset all selections
function resetSelections() {
    const yearSelect = getElement('year');
    const makeSelect = getElement('make');
    const modelSelect = getElement('model');
    
    if (yearSelect) yearSelect.value = '';
    if (makeSelect) {
        makeSelect.value = '';
        makeSelect.disabled = true;
        makeSelect.innerHTML = '<option value="">Select Make</option>';
    }
    if (modelSelect) {
        modelSelect.value = '';
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
    }
    
    hideResults();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
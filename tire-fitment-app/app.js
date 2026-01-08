// Add this to your existing app.js file

// Function to save fitment data to Firebase
function saveFitment() {
    const year = document.getElementById('year').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const vehicle = `${year} ${make} ${model}`;
    
    const fitmentData = {
        vehicle: vehicle,
        tireSize: document.getElementById('primary-size').textContent,
        year: year,
        make: make,
        model: model,
        specifications: {
            width: document.getElementById('tire-width').textContent,
            aspectRatio: document.getElementById('aspect-ratio').textContent,
            rimDiameter: document.getElementById('rim-diameter').textContent,
            rimWidth: document.getElementById('rim-width').textContent,
            boltPattern: document.getElementById('bolt-pattern').textContent,
            offset: document.getElementById('offset').textContent,
            loadIndex: document.getElementById('load-index').textContent,
            speedRating: document.getElementById('speed-rating').textContent,
            pressureFront: document.getElementById('pressure-front').textContent,
            pressureRear: document.getElementById('pressure-rear').textContent
        }
    };
    
    // Set the current fitment data for Firebase
    if (typeof setCurrentFitmentData === 'function') {
        setCurrentFitmentData(fitmentData);
    }
    
    // Call Firebase save function
    if (typeof saveFitmentToFirebase === 'function') {
        saveFitmentToFirebase();
    }
}
// RapidAPI Configuration for Car Stockpile API
const RAPIDAPI_KEY = 'c72277caa5mshd73fd7f2cd60c02p159ca4jsnc5a89a41bf4d';
const RAPIDAPI_HOST = 'car-stockpile.p.rapidapi.com';

// Comprehensive local tire database
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
    },
    "Nissan": {
        "Altima": { tireSize: "235/45R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+50mm" },
        "Rogue": { tireSize: "235/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+45mm" },
        "Sentra": { tireSize: "205/55R16", rimDiameter: 16, boltPattern: "5x114.3", offset: "+45mm" },
        "Pathfinder": { tireSize: "255/60R18", rimDiameter: 18, boltPattern: "6x114.3", offset: "+40mm" },
        "Frontier": { tireSize: "265/65R18", rimDiameter: 18, boltPattern: "6x114.3", offset: "+25mm" },
        "Titan": { tireSize: "275/65R18", rimDiameter: 18, boltPattern: "8x165", offset: "+30mm" },
        "Armada": { tireSize: "275/60R20", rimDiameter: 20, boltPattern: "8x165", offset: "+30mm" }
    },
    "Hyundai": {
        "Elantra": { tireSize: "225/45R17", rimDiameter: 17, boltPattern: "5x114.3", offset: "+50mm" },
        "Sonata": { tireSize: "225/45R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+48mm" },
        "Tucson": { tireSize: "235/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+45mm" },
        "Santa Fe": { tireSize: "235/65R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+42mm" },
        "Palisade": { tireSize: "245/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+40mm" }
    },
    "Kia": {
        "Forte": { tireSize: "205/55R16", rimDiameter: 16, boltPattern: "5x114.3", offset: "+48mm" },
        "Soul": { tireSize: "205/60R16", rimDiameter: 16, boltPattern: "5x114.3", offset: "+45mm" },
        "Seltos": { tireSize: "215/60R17", rimDiameter: 17, boltPattern: "5x114.3", offset: "+42mm" },
        "Sportage": { tireSize: "235/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+40mm" },
        "Sorento": { tireSize: "235/65R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+38mm" },
        "Telluride": { tireSize: "245/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+35mm" }
    },
    "Subaru": {
        "Outback": { tireSize: "225/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+55mm" },
        "Forester": { tireSize: "225/55R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+48mm" },
        "Crosstrek": { tireSize: "225/55R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+48mm" },
        "Ascent": { tireSize: "245/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+50mm" },
        "WRX": { tireSize: "245/40R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+55mm" },
        "BRZ": { tireSize: "215/45R17", rimDiameter: 17, boltPattern: "5x100", offset: "+48mm" }
    },
    "Jeep": {
        "Wrangler": { tireSize: "285/70R17", rimDiameter: 17, boltPattern: "5x127", offset: "+44mm" },
        "Grand Cherokee": { tireSize: "265/60R18", rimDiameter: 18, boltPattern: "5x127", offset: "+34mm" },
        "Cherokee": { tireSize: "225/60R18", rimDiameter: 18, boltPattern: "5x110", offset: "+38mm" },
        "Compass": { tireSize: "225/60R17", rimDiameter: 17, boltPattern: "5x110", offset: "+40mm" },
        "Renegade": { tireSize: "215/60R17", rimDiameter: 17, boltPattern: "5x110", offset: "+42mm" },
        "Gladiator": { tireSize: "285/70R17", rimDiameter: 17, boltPattern: "5x127", offset: "+44mm" }
    },
    "Tesla": {
        "Model 3": { tireSize: "235/45R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+40mm" },
        "Model Y": { tireSize: "255/45R19", rimDiameter: 19, boltPattern: "5x114.3", offset: "+40mm" },
        "Model S": { tireSize: "265/35R21", rimDiameter: 21, boltPattern: "5x120", offset: "+40mm" },
        "Model X": { tireSize: "265/45R20", rimDiameter: 20, boltPattern: "5x120", offset: "+35mm" }
    },
    "Volkswagen": {
        "Jetta": { tireSize: "205/60R16", rimDiameter: 16, boltPattern: "5x112", offset: "+46mm" },
        "Passat": { tireSize: "235/45R18", rimDiameter: 18, boltPattern: "5x112", offset: "+44mm" },
        "Tiguan": { tireSize: "235/55R18", rimDiameter: 18, boltPattern: "5x112", offset: "+43mm" },
        "Atlas": { tireSize: "255/55R18", rimDiameter: 18, boltPattern: "5x112", offset: "+40mm" },
        "Golf": { tireSize: "225/45R17", rimDiameter: 17, boltPattern: "5x112", offset: "+49mm" },
        "Arteon": { tireSize: "245/40R19", rimDiameter: 19, boltPattern: "5x112", offset: "+42mm" }
    },
    "Lexus": {
        "ES": { tireSize: "235/45R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+45mm" },
        "RX": { tireSize: "235/65R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+40mm" },
        "NX": { tireSize: "235/60R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+42mm" },
        "UX": { tireSize: "225/50R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+45mm" },
        "GX": { tireSize: "265/60R18", rimDiameter: 18, boltPattern: "6x139.7", offset: "+25mm" },
        "LX": { tireSize: "285/50R22", rimDiameter: 22, boltPattern: "6x139.7", offset: "+30mm" }
    },
    "Mazda": {
        "Mazda3": { tireSize: "215/45R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+50mm" },
        "Mazda6": { tireSize: "225/45R19", rimDiameter: 19, boltPattern: "5x114.3", offset: "+50mm" },
        "CX-5": { tireSize: "225/55R19", rimDiameter: 19, boltPattern: "5x114.3", offset: "+45mm" },
        "CX-9": { tireSize: "255/50R20", rimDiameter: 20, boltPattern: "5x114.3", offset: "+45mm" },
        "CX-30": { tireSize: "215/55R18", rimDiameter: 18, boltPattern: "5x114.3", offset: "+48mm" },
        "MX-5 Miata": { tireSize: "205/45R17", rimDiameter: 17, boltPattern: "5x114.3", offset: "+45mm" }
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

// DOM Elements
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const resultsCard = document.getElementById('results');

// Initialize application
async function initApp() {
    console.log("Initializing Tire Fitment App with Car Stockpile API");
    populateYears();
    setupEventListeners();
    testAPI();
}

// Test the API
async function testAPI() {
    try {
        const response = await fetch(
            'https://car-stockpile.p.rapidapi.com/models-for-year?year=2023&make=Toyota',
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (response.ok) {
            console.log("API Connection: SUCCESS");
            document.getElementById('api-status').textContent = "API: Online";
            document.getElementById('api-status').className = "api-status online";
            return true;
        }
    } catch (error) {
        console.log("API Connection: FAILED - Using local database");
        document.getElementById('api-status').textContent = "API: Offline (Using Local Data)";
        document.getElementById('api-status').className = "api-status offline";
    }
    return false;
}

// Populate years (2000-2024)
function populateYears() {
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
    yearSelect.addEventListener('change', handleYearChange);
    makeSelect.addEventListener('change', handleMakeChange);
    modelSelect.addEventListener('change', handleModelChange);
}

// Handle year selection - Fetch makes from API
async function handleYearChange() {
    const year = yearSelect.value;
    
    if (!year) {
        resetMakes();
        return;
    }
    
    showLoading(true);
    
    try {
        // Fetch makes from Car Stockpile API
        const makes = await fetchMakesFromAPI(year);
        
        if (makes && makes.length > 0) {
            populateDropdown(makeSelect, makes, 'Select Make');
            makeSelect.disabled = false;
        } else {
            // Fallback to local makes
            const localMakes = Object.keys(tireDatabase).sort();
            populateDropdown(makeSelect, localMakes, 'Select Make');
            makeSelect.disabled = false;
        }
    } catch (error) {
        console.error("Error fetching makes:", error);
        // Fallback to local makes
        const localMakes = Object.keys(tireDatabase).sort();
        populateDropdown(makeSelect, localMakes, 'Select Make');
        makeSelect.disabled = false;
    } finally {
        showLoading(false);
        resetModels();
    }
}

// Fetch makes from Car Stockpile API
async function fetchMakesFromAPI(year) {
    try {
        const response = await fetch(
            `https://car-stockpile.p.rapidapi.com/makes-for-year?year=${year}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Parse API response - adjust based on actual API structure
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

// Handle make selection - Fetch models from API
async function handleMakeChange() {
    const year = yearSelect.value;
    const make = makeSelect.value;
    
    if (!make) {
        resetModels();
        return;
    }
    
    showLoading(true);
    
    try {
        // Fetch models from Car Stockpile API
        const models = await fetchModelsFromAPI(year, make);
        
        if (models && models.length > 0) {
            populateDropdown(modelSelect, models, 'Select Model');
            modelSelect.disabled = false;
        } else {
            // Fallback to local models
            const localModels = tireDatabase[make] ? Object.keys(tireDatabase[make]).sort() : [];
            populateDropdown(modelSelect, localModels, 'Select Model');
            modelSelect.disabled = localModels.length > 0;
        }
    } catch (error) {
        console.error("Error fetching models:", error);
        // Fallback to local models
        const localModels = tireDatabase[make] ? Object.keys(tireDatabase[make]).sort() : [];
        populateDropdown(modelSelect, localModels, 'Select Model');
        modelSelect.disabled = localModels.length > 0;
    } finally {
        showLoading(false);
    }
}

// Fetch models from Car Stockpile API
async function fetchModelsFromAPI(year, make) {
    try {
        const response = await fetch(
            `https://car-stockpile.p.rapidapi.com/models-for-year?year=${year}&make=${encodeURIComponent(make)}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Parse API response - adjust based on actual API structure
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

// Handle model selection - Get tire data
async function handleModelChange() {
    const year = yearSelect.value;
    const make = makeSelect.value;
    const model = modelSelect.value;
    
    if (!model) {
        hideResults();
        return;
    }
    
    showLoading(true);
    
    try {
        // Try to get from local database first
        let tireData = null;
        
        if (tireDatabase[make] && tireDatabase[make][model]) {
            tireData = getCompleteTireData(tireDatabase[make][model]);
        } else {
            // Try to fetch from API (if API has tire data)
            tireData = await fetchTireDataFromAPI(year, make, model);
        }
        
        if (tireData) {
            displayVehicleInfo(year, make, model, tireData);
            showResults();
        } else {
            // Generate default tire data
            tireData = getCompleteTireData({
                tireSize: "235/45R18",
                boltPattern: "5x114.3",
                offset: "+40mm"
            });
            displayVehicleInfo(year, make, model, tireData);
            showResults();
        }
    } catch (error) {
        console.error("Error getting tire data:", error);
        // Generate default tire data
        const tireData = getCompleteTireData({
            tireSize: "235/45R18",
            boltPattern: "5x114.3",
            offset: "+40mm"
        });
        displayVehicleInfo(year, make, model, tireData);
        showResults();
    } finally {
        showLoading(false);
    }
}

// Try to fetch tire data from API (if available)
async function fetchTireDataFromAPI(year, make, model) {
    // Note: Your Car Stockpile API might not have tire data
    // This is a placeholder if the API adds tire specifications
    return null;
}

// Display vehicle information
function displayVehicleInfo(year, make, model, data) {
    // Update vehicle title
    document.getElementById('vehicle-title').textContent = `${year} ${make} ${model}`;
    document.getElementById('vehicle-subtitle').textContent = "Tire Specifications";
    
    // Update primary tire size
    document.getElementById('primary-size').textContent = data.tireSize;
    
    // Update tire size breakdown
    document.getElementById('size-breakdown').innerHTML = `
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
    `;
    
    // Update wheel specifications
    document.getElementById('rim-diameter').textContent = `${data.rimDiameter}"`;
    document.getElementById('rim-width').textContent = data.rimWidth;
    document.getElementById('bolt-pattern').textContent = data.boltPattern;
    document.getElementById('offset').textContent = data.offset;
    
    // Update tire specifications
    document.getElementById('load-index').textContent = data.loadIndex;
    document.getElementById('speed-rating').textContent = data.speedRating;
    document.getElementById('pressure-front').textContent = data.pressureFront;
    document.getElementById('pressure-rear').textContent = data.pressureRear;
    
    // Update advanced specifications
    const advancedSection = document.getElementById('advanced-specs') || createAdvancedSpecsSection();
    advancedSection.innerHTML = `
        <div class="fitment-item">
            <span class="label">Overall Diameter</span>
            <span class="value">${data.overallDiameter}mm</span>
        </div>
        <div class="fitment-item">
            <span class="label">Revolutions per Mile</span>
            <span class="value">${data.revolutionsPerMile}</span>
        </div>
        <div class="fitment-item">
            <span class="label">Section Height</span>
            <span class="value">${data.sectionHeight}mm</span>
        </div>
    `;
    
    // Update alternate sizes
    const alternateSizesList = document.getElementById('alternate-sizes');
    alternateSizesList.innerHTML = '';
    
    if (data.alternateSizes && data.alternateSizes.length > 0) {
        data.alternateSizes.forEach(size => {
            const li = document.createElement('li');
            li.textContent = size;
            alternateSizesList.appendChild(li);
        });
        document.getElementById('alternate-container').style.display = 'block';
    } else {
        document.getElementById('alternate-container').style.display = 'none';
    }
}

function createAdvancedSpecsSection() {
    const section = document.createElement('div');
    section.id = 'advanced-specs';
    section.className = 'fitment-section';
    section.innerHTML = `
        <h3><span class="icon">📊</span> Advanced Specifications</h3>
    `;
    
    const fitmentGrid = document.querySelector('.fitment-grid');
    if (fitmentGrid) {
        fitmentGrid.appendChild(section);
    }
    
    return section;
}

// Helper functions
function populateDropdown(selectElement, items, placeholder) {
    selectElement.innerHTML = `<option value="">${placeholder}</option>`;
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

function resetMakes() {
    makeSelect.innerHTML = '<option value="">Select Make</option>';
    makeSelect.disabled = true;
    resetModels();
}

function resetModels() {
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    modelSelect.disabled = true;
    hideResults();
}

function showLoading(show) {
    const loader = document.getElementById('loading-overlay') || createLoadingOverlay();
    loader.style.display = show ? 'flex' : 'none';
}

function createLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner"></div>
        <style>
            #loading-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.7);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

function showResults() {
    resultsCard.classList.add('show');
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function hideResults() {
    resultsCard.classList.remove('show');
}

// Reset all selections
function resetSelections() {
    yearSelect.value = '';
    makeSelect.value = '';
    makeSelect.disabled = true;
    makeSelect.innerHTML = '<option value="">Select Make</option>';
    modelSelect.value = '';
    modelSelect.disabled = true;
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    hideResults();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
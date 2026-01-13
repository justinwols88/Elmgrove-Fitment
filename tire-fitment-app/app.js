// Tire Fitment Calculator App - Netlify CSP Compliant Version
(function() {
    'use strict';
    
    console.log("App.js loading...");
    
    // Wheel-Size.com API Configuration
    const WHEEL_SIZE_API_KEY = 'aacf06f99737a3a99963870c871a5eaf';
    const WHEEL_SIZE_BASE_URL = 'https://api.wheel-size.com/v2';
    
    // Store slug mappings
    let makeSlugMap = {};
    let modelSlugMap = {};
    
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM loaded, initializing app...");
        initializeApp();
    });
    
    // Initialize the app
    function initializeApp() {
        console.log("initializeApp() called");
        
        // Setup all event listeners using event delegation
        setupEventDelegation();
        
        // Populate year dropdown
        populateYearDropdown();
        
        console.log("App initialized");
    }
    
    // Setup event delegation for all elements
    function setupEventDelegation() {
        console.log("Setting up event delegation");
        
        // Use a single change listener for all selects
        document.addEventListener('change', function(event) {
            const target = event.target;
            
            if (target.id === 'year') {
                console.log("Year changed to:", target.value);
                handleYearChange();
            } else if (target.id === 'make') {
                console.log("Make changed to:", target.value);
                handleMakeChange();
            } else if (target.id === 'model') {
                console.log("Model changed to:", target.value);
                updateSteps(3);
            }
        });
        
        // Use a single click listener for all buttons
        document.addEventListener('click', function(event) {
            const target = event.target;
            const button = target.closest('button');
            
            if (!button) return;
            
            if (button.id === 'find-button') {
                console.log("Find button clicked");
                handleSearch();
            } else if (button.id === 'reset-button') {
                console.log("Reset button clicked");
                resetForm();
            } else if (button.id === 'print-button') {
                window.print();
            } else if (button.classList.contains('info-message-close')) {
                const infoMessage = button.closest('.info-message');
                if (infoMessage) {
                    infoMessage.remove();
                }
            }
        });
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
    function populateYearDropdown() {
        const yearSelect = document.getElementById('year');
        if (!yearSelect) {
            console.error("Year select not found!");
            return;
        }
        
        yearSelect.innerHTML = '<option value="">Select Year</option>';
        
        const currentYear = new Date().getFullYear();
        for (let year = currentYear + 1; year >= 1980; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
        
        console.log("Year dropdown populated");
    }
    
    // Handle year change
    async function handleYearChange() {
        const yearSelect = document.getElementById('year');
        const makeSelect = document.getElementById('make');
        const modelSelect = document.getElementById('model');
        
        if (!yearSelect || !makeSelect || !modelSelect) {
            console.error("Missing select elements");
            return;
        }
        
        const year = yearSelect.value;
        
        if (!year) {
            makeSelect.disabled = true;
            makeSelect.innerHTML = '<option value="">Select Make</option>';
            modelSelect.disabled = true;
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            updateSteps(1);
            return;
        }
        
        showLoading(true);
        
        makeSelect.disabled = false;
        makeSelect.innerHTML = '<option value="">Loading makes...</option>';
        
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        modelSlugMap = {};
        updateSteps(2);
        
        try {
            const url = buildWheelSizeAPIUrl('/makes/', { year: year });
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                
                if (data && data.data && data.data.length > 0) {
                    makeSelect.innerHTML = '<option value="">Select Make</option>';
                    makeSlugMap = {};
                    
                    const sortedMakes = data.data.sort((a, b) => {
                        const nameA = a.name || '';
                        const nameB = b.name || '';
                        return nameA.localeCompare(nameB);
                    });
                    
                    sortedMakes.forEach(make => {
                        const displayName = make.name || make.slug;
                        const slug = make.slug;
                        
                        makeSlugMap[displayName] = slug;
                        
                        const option = document.createElement('option');
                        option.value = displayName;
                        option.textContent = displayName;
                        option.dataset.slug = slug;
                        makeSelect.appendChild(option);
                    });
                } else {
                    makeSelect.innerHTML = '<option value="">No makes found</option>';
                }
            } else {
                makeSelect.innerHTML = '<option value="">API Error</option>';
            }
        } catch (error) {
            console.error("Error:", error);
            makeSelect.innerHTML = '<option value="">Network Error</option>';
        } finally {
            showLoading(false);
        }
    }
    
    // Handle make change
    async function handleMakeChange() {
        const yearSelect = document.getElementById('year');
        const makeSelect = document.getElementById('make');
        const modelSelect = document.getElementById('model');
        
        if (!yearSelect || !makeSelect || !modelSelect) return;
        
        const year = yearSelect.value;
        const makeDisplayName = makeSelect.value;
        const selectedOption = makeSelect.options[makeSelect.selectedIndex];
        const makeSlug = selectedOption?.dataset.slug || makeSlugMap[makeDisplayName] || makeDisplayName.toLowerCase();
        
        if (!makeDisplayName) {
            modelSelect.disabled = true;
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            return;
        }
        
        showLoading(true);
        modelSelect.disabled = false;
        modelSelect.innerHTML = '<option value="">Loading models...</option>';
        updateSteps(3);
        
        try {
            const url = buildWheelSizeAPIUrl('/models/', {
                make: makeSlug,
                year: year
            });
            
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                
                modelSelect.innerHTML = '<option value="">Select Model</option>';
                modelSlugMap = {};
                
                if (data && data.data && data.data.length > 0) {
                    const sortedModels = data.data.sort((a, b) => {
                        const nameA = a.name || '';
                        const nameB = b.name || '';
                        return nameA.localeCompare(nameB);
                    });
                    
                    sortedModels.forEach(model => {
                        const displayName = model.name || model.slug;
                        const slug = model.slug;
                        
                        modelSlugMap[displayName] = slug;
                        
                        const option = document.createElement('option');
                        option.value = displayName;
                        option.textContent = displayName;
                        option.dataset.slug = slug;
                        modelSelect.appendChild(option);
                    });
                } else {
                    modelSelect.innerHTML = '<option value="">No models found</option>';
                }
            } else {
                modelSelect.innerHTML = '<option value="">API Error</option>';
            }
        } catch (error) {
            console.error("Error:", error);
            modelSelect.innerHTML = '<option value="">Network Error</option>';
        } finally {
            showLoading(false);
        }
    }
    
    // Handle search
    async function handleSearch() {
        const yearSelect = document.getElementById('year');
        const makeSelect = document.getElementById('make');
        const modelSelect = document.getElementById('model');
        
        if (!yearSelect || !makeSelect || !modelSelect) return;
        
        const year = yearSelect.value;
        const makeDisplayName = makeSelect.value;
        const modelDisplayName = modelSelect.value;
        
        const makeSlug = makeSelect.options[makeSelect.selectedIndex]?.dataset.slug || 
                        makeSlugMap[makeDisplayName] || 
                        makeDisplayName.toLowerCase();
        
        const modelSlug = modelSelect.options[modelSelect.selectedIndex]?.dataset.slug || 
                         modelSlugMap[modelDisplayName] || 
                         modelDisplayName.toLowerCase();
        
        if (!year || !makeDisplayName || !modelDisplayName) {
            showInfoMessage('Please select year, make, and model');
            return;
        }
        
        showLoading(true);
        updateSteps(4);
        
        try {
            const tireData = await fetchTireData(year, makeSlug, modelSlug, makeDisplayName, modelDisplayName);
            
            if (tireData) {
                updateVehicleDisplay(year, makeDisplayName, modelDisplayName, tireData);
                showResults();
            } else {
                showInfoMessage('No tire data found. Try a different combination.');
            }
        } catch (error) {
            console.error("Search error:", error);
            showInfoMessage('Error searching. Please try again.');
        } finally {
            showLoading(false);
        }
    }
    
    // Fetch tire data
    async function fetchTireData(year, makeSlug, modelSlug, makeDisplayName, modelDisplayName) {
        const endpoints = [
            {
                url: buildWheelSizeAPIUrl('/search/by_model/', {
                    make: makeSlug,
                    model: modelSlug,
                    year: year
                }),
                processor: (data) => data && data.length > 0 ? data[0] : null
            },
            {
                url: buildWheelSizeAPIUrl('/vehicles/', {
                    make: makeSlug,
                    model: modelSlug,
                    year: year,
                    limit: 1
                }),
                processor: (data) => data && data.length > 0 ? data[0] : null
            }
        ];
        
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint.url);
                if (response.ok) {
                    const data = await response.json();
                    const vehicle = endpoint.processor(data);
                    
                    if (vehicle && vehicle.tires && vehicle.tires.length > 0 && vehicle.wheels && vehicle.wheels.length > 0) {
                        return vehicle;
                    }
                }
            } catch (error) {
                continue;
            }
        }
        
        return getEstimatedTireData(makeDisplayName, modelDisplayName);
    }
    
    // Get estimated tire data
    function getEstimatedTireData(make, model) {
        const modelLower = model.toLowerCase();
        let vehicleType = 'sedan';
        
        if (modelLower.includes('f-150') || modelLower.includes('silverado') || modelLower.includes('tacoma')) {
            vehicleType = 'truck';
        } else if (modelLower.includes('cr-v') || modelLower.includes('rav4') || modelLower.includes('explorer')) {
            vehicleType = 'suv';
        } else if (modelLower.includes('corvette') || modelLower.includes('mustang') || modelLower.includes('camaro')) {
            vehicleType = 'sports';
        } else if (modelLower.includes('corolla') || modelLower.includes('civic') || modelLower.includes('elantra')) {
            vehicleType = 'compact';
        }
        
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
            isEstimated: true
        };
    }
    
    // Update vehicle display
    function updateVehicleDisplay(year, make, model, vehicle) {
        const tire = vehicle.tires && vehicle.tires.length > 0 ? vehicle.tires[0] : null;
        const wheel = vehicle.wheels && vehicle.wheels.length > 0 ? vehicle.wheels[0] : null;
        
        if (!tire || !wheel) {
            showInfoMessage('Could not retrieve tire specifications.');
            return;
        }
        
        const tireSize = `${tire.width}/${tire.aspect_ratio}R${tire.rim_diameter}`;
        
        let boltPattern = "5x114.3";
        if (wheel.bolt_pattern) {
            boltPattern = `${wheel.bolt_pattern.holes}x${wheel.bolt_pattern.diameter}`;
        }
        
        let offset = "+40mm";
        if (wheel.offset !== undefined && wheel.offset !== null) {
            offset = wheel.offset >= 0 ? `+${wheel.offset}mm` : `${wheel.offset}mm`;
        }
        
        document.getElementById('vehicle-title').textContent = `${year} ${make} ${model}`;
        document.getElementById('vehicle-subtitle').textContent = vehicle.isEstimated ? 
            'Estimated Tire Specifications' : 'OEM Tire Specifications';
        
        document.getElementById('primary-size').textContent = tireSize;
        document.getElementById('rim-diameter').textContent = `${tire.rim_diameter}"`;
        document.getElementById('rim-width').textContent = wheel.rim_width ? `${wheel.rim_width}"` : "8.0\"";
        document.getElementById('bolt-pattern').textContent = boltPattern;
        document.getElementById('offset').textContent = offset;
        
        document.getElementById('load-index').textContent = "94";
        document.getElementById('speed-rating').textContent = "V (149 mph)";
        document.getElementById('pressure-front').textContent = "35 PSI";
        document.getElementById('pressure-rear').textContent = "35 PSI";
        document.getElementById('overall-diameter').textContent = "668mm";
        document.getElementById('revs-per-mile').textContent = "763";
        
        updateSizeBreakdown(tireSize);
        
        if (vehicle.isEstimated) {
            showInfoMessage('Using estimated tire specifications. For exact OEM specs, consult your vehicle manual.');
        }
    }
    
    // Update size breakdown
    function updateSizeBreakdown(tireSize) {
        const sizeBreakdown = document.getElementById('size-breakdown');
        if (!sizeBreakdown || !tireSize) return;
        
        const match = tireSize.match(/(\d+)\/(\d+)R(\d+)/);
        if (match) {
            const width = match[1];
            const aspectRatio = match[2];
            const rimDiameter = match[3];
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
    }
    
    // Reset form
    function resetForm() {
        const yearSelect = document.getElementById('year');
        const makeSelect = document.getElementById('make');
        const modelSelect = document.getElementById('model');
        
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
        
        makeSlugMap = {};
        modelSlugMap = {};
        
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
        
        updateSteps(1);
    }
    
    // Update steps
    function updateSteps(stepNumber) {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Show results
    function showResults() {
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
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
        const existingMessage = document.getElementById('info-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
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
        
        setTimeout(() => {
            if (infoElement && infoElement.parentElement) {
                infoElement.remove();
            }
        }, 8000);
    }
    
    // Make functions available globally if needed
    window.initializeApp = initializeApp;
    window.handleYearChange = handleYearChange;
    window.handleMakeChange = handleMakeChange;
    window.handleSearch = handleSearch;
    
    console.log("App.js loaded successfully");
})();
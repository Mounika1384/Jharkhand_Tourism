// Global variables
let map;
let markers = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Initialize enhanced features
    if (typeof initEnhancedScrolling === 'function') initEnhancedScrolling();
    if (typeof initEnhancedScrollSpy === 'function') initEnhancedScrollSpy();

    // Populate destinations
    populateDestinations();

    // Populate culture items
    populateCultureItems();

    // Initialize map
    initMap();

    // Initialize quiz
    initQuiz();

    // Initialize booking wizard
    initBookingForm();

    // Set minimum date for travel date input
    const travelDateInput = document.getElementById('travelDate');
    if (travelDateInput) {
        travelDateInput.min = new Date().toISOString().split('T')[0];
    }

    // Old booking form submission (keep for compatibility)
    const oldBookingForm = document.getElementById('bookingForm');
    if (oldBookingForm) {
        oldBookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showModal('bookingModal');
            this.reset();
        });
    }

    // Tourist registration form submission
    const touristForm = document.getElementById('touristForm');
    if (touristForm) {
        touristForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Registering...';
            submitBtn.disabled = true;

            const touristData = {
                name: document.getElementById('touristName').value,
                email: document.getElementById('touristEmail').value,
                phone: document.getElementById('touristPhone').value,
                emergencyContact: document.getElementById('emergencyContact').value
            };

            try {
                const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                    ? 'http://localhost:3000' 
                    : 'https://jharkhand-tourism-backend-h5sq.onrender.com'; 

                const response = await fetch(`${baseUrl}/api/tourists`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(touristData)
                });

                const data = await response.json();

                if (data.success) {
                    alert(`Tourist registration submitted successfully! Digital ID: ${data.digitalId}`);
                    closeModal('touristRegistrationModal');
                    this.reset();
                } else {
                    throw new Error(data.error || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again later.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Populate destinations grid
function populateDestinations() {
    const destinationsGrid = document.querySelector('.destinations-grid');
    destinations.forEach(destination => {
        const featuresHTML = destination.features.map(feature =>
            `<span class="feature">${feature}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'destination-card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${destination.image}" alt="${destination.name}">
                <div class="card-badge">${destination.badge}</div>
            </div>
            <div class="card-content">
                <h3>${destination.name}</h3>
                <p>${destination.description}</p>
                <div class="card-features">
                    ${featuresHTML}
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary view-on-map" data-lat="${destination.lat}" data-lng="${destination.lng}" data-name="${destination.name}">
                        <i class="fas fa-map-marker-alt"></i> View on Map
                    </button>
                    <button class="btn btn-secondary view-details" data-id="${destination.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        `;
        destinationsGrid.appendChild(card);
    });

    // Add event listeners for the new buttons
    document.querySelectorAll('.view-on-map').forEach(button => {
        button.addEventListener('click', function () {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            const name = this.getAttribute('data-name');
            showDestinationOnMap(lat, lng, name);
        });
    });

    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            showDestinationDetails(id);
        });
    });
}

// Show destination details modal
function showDestinationDetails(id) {
    const destination = destinations.find(d => d.id === id);

    // Create modal content
    const modalContent = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close-modal" onclick="closeModal('destinationDetailsModal')">&times;</span>
            <div class="destination-details">
                <div class="detail-header">
                    <h2>${destination.name}</h2>
                    <span class="badge">${destination.badge}</span>
                </div>
                
                <div class="detail-image">
                    <img src="${destination.image}" alt="${destination.name}">
                </div>
                
                <div class="detail-info">
                    <div class="info-section">
                        <h3><i class="fas fa-info-circle"></i> Basic Information</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <strong>Best Time to Visit:</strong>
                                <span>${destination.details.bestTime}</span>
                            </div>
                            <div class="info-item">
                                <strong>Entry Fee:</strong>
                                <span>${destination.details.entryFee}</span>
                            </div>
                            <div class="info-item">
                                <strong>Distance from Ranchi:</strong>
                                <span>${destination.details.distanceFromCity}</span>
                            </div>
                            <div class="info-item">
                                <strong>Transportation:</strong>
                                <span>${destination.details.transportation}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-hotel"></i> Nearby Stays</h3>
                        <div class="stays-grid">
                            ${destination.details.nearbyStays.map(stay => `
                                <div class="stay-card">
                                    <div class="stay-header">
                                        <h4>${stay.name}</h4>
                                        <span class="stay-type">${stay.type}</span>
                                    </div>
                                    <div class="stay-details">
                                        <div class="stay-price">₹${stay.price}</div>
                                        <div class="stay-rating">
                                            <i class="fas fa-star"></i> ${stay.rating}
                                        </div>
                                    </div>
                                    <div class="stay-facilities">
                                        ${stay.facilities.map(facility => `<span class="facility">${facility}</span>`).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-camera"></i> Main Attractions</h3>
                        <div class="attractions-list">
                            ${destination.details.attractions.map(attraction => `
                                <span class="attraction-item">
                                    <i class="fas fa-check-circle"></i> ${attraction}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h3><i class="fas fa-map-marked-alt"></i> Location Features</h3>
                        <div class="features-list">
                            ${destination.features.map(feature => `
                                <span class="feature-tag">${feature}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="detail-actions">
                    <button class="btn" onclick="bookDestination(${destination.id})">
                        <i class="fas fa-calendar-check"></i> Book This Destination
                    </button>
                    <button class="btn btn-secondary" onclick="showDestinationOnMap(${destination.lat}, ${destination.lng}, '${destination.name}')">
                        <i class="fas fa-map"></i> View on Map
                    </button>
                </div>

                <!-- Review Section -->
                <div id="destinationReviews">
                    ${getReviewFormHTML(destination.id)}
                </div>
            </div>
        </div>
    `;

    // Create or update modal
    let modal = document.getElementById('destinationDetailsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'destinationDetailsModal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    modal.innerHTML = modalContent;
    modal.style.display = 'flex';

    // Fetch reviews
    fetchReviews(destination.id);

    // Add CSS for the modal if not already added
    if (!document.querySelector('#destinationDetailsStyles')) {
        const styles = document.createElement('style');
        styles.id = 'destinationDetailsStyles';
        styles.textContent = `
            .destination-details {
                text-align: left;
            }
            
            .detail-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .detail-header h2 {
                margin: 0;
                color: var(--primary);
            }
            
            .detail-image {
                width: 100%;
                height: auto;
                max-height: 400px;
                overflow: hidden;
                border-radius: 8px;
                margin-bottom: 1.5rem;
            }
            
            .detail-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                max-height: 400px;
            }
            
            .info-section {
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: #f9f9f9;
                border-radius: 8px;
            }
            
            .info-section h3 {
                color: var(--primary-dark);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
            }
            
            .info-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid #eee;
            }
            
            .stays-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
            }
            
            .stay-card {
                background: white;
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid #ddd;
            }
            
            .stay-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .stay-type {
                background: var(--secondary);
                color: var(--dark);
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .stay-details {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            
            .stay-price {
                font-weight: bold;
                color: var(--primary);
            }
            
            .stay-rating {
                color: #ffc107;
            }
            
            .stay-facilities {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
            }
            
            .facility {
                background: #e3f2fd;
                color: #1976d2;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 0.7rem;
            }
            
            .attractions-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 0.5rem;
            }
            
            .attraction-item {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--primary);
            }
            
            .features-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .feature-tag {
                background: var(--primary);
                color: white;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 0.8rem;
            }
            
            .detail-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 2rem;
            }
            
            @media (max-width: 768px) {
                .detail-actions {
                    flex-direction: column;
                }
                
                .info-grid, .stays-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Book destination function
function bookDestination(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    
    const destSelect = document.getElementById('destination');
    if (destSelect) {
        destSelect.value = destinationId;
    }
    
    if (typeof selectedDestination !== 'undefined') {
        selectedDestination = destinationId;
    }
    
    closeModal('destinationDetailsModal');

    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

    // Show notification
    showMapNotification(`Ready to book ${destination.name}! Fill out the form below.`);
}

// Populate culture items
function populateCultureItems() {
    const cultureContainer = document.querySelector('.culture-container');
    cultureItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'culture-card';
        card.innerHTML = `
            <div class="culture-icon">
                <i class="${item.icon}"></i>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        cultureContainer.appendChild(card);
    });
}

// Populate destination select in booking form
function populateDestinationSelect() {
    const destinationSelect = document.getElementById('destination');
    destinations.forEach(destination => {
        const option = document.createElement('option');
        option.value = destination.id;
        option.textContent = destination.name;
        destinationSelect.appendChild(option);
    });
}

// Show map notification
function showMapNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
// Booking Wizard Functionality
let currentStep = 1;
let selectedDestination = null;
let travelersCount = 2;

function nextStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');

    currentStep = step;
    document.getElementById(`step${currentStep}`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');

    if (step === 4) {
        updateSummary();
    }
}

function prevStep(step) {
    nextStep(step);
}

function changeTravelers(change) {
    travelersCount = Math.max(1, travelersCount + change);
    document.getElementById('travelersCount').textContent = travelersCount;
}

// Destination selection
document.querySelectorAll('.destination-option').forEach(option => {
    option.addEventListener('click', function () {
        document.querySelectorAll('.destination-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        selectedDestination = this.getAttribute('data-id');
    });
});

function updateSummary() {
    const destination = destinations.find(d => d.id == selectedDestination);
    const duration = document.getElementById('duration').value;
    const accommodation = document.querySelector('input[name="accommodation"]:checked').value;

    let summaryHTML = `
        <div class="summary-item">
            <strong>Destination:</strong> ${destination ? destination.name : 'Not selected'}
        </div>
        <div class="summary-item">
            <strong>Duration:</strong> ${duration} days
        </div>
        <div class="summary-item">
            <strong>Travelers:</strong> ${travelersCount} person(s)
        </div>
        <div class="summary-item">
            <strong>Accommodation:</strong> ${accommodation.charAt(0).toUpperCase() + accommodation.slice(1)}
        </div>
    `;

    document.getElementById('summaryContent').innerHTML = summaryHTML;

    // Update estimated costs (demo values)
    const baseCost = accommodation === 'luxury' ? 3000 : accommodation === 'midrange' ? 2000 : 1000;
    const totalAccommodation = baseCost * duration * travelersCount;
    const totalTransport = 1750 * travelersCount;
    const totalActivities = 1000 * travelersCount;
    const totalCost = totalAccommodation + totalTransport + totalActivities;

    document.getElementById('costAccommodation').textContent = `₹${totalAccommodation.toLocaleString()}`;
    document.getElementById('costTransport').textContent = `₹${totalTransport.toLocaleString()}`;
    document.getElementById('costActivities').textContent = `₹${totalActivities.toLocaleString()}`;
    document.getElementById('costTotal').textContent = `₹${totalCost.toLocaleString()}`;
}

function generateTravelPlan() {
    showModal('travelPlanModal');
}

// Demo functions for download/email
function downloadPDF() {
    alert('Demo: PDF download functionality would be implemented in a real application. For now, our travel expert will contact you with the detailed itinerary.');
    closeModal('travelPlanModal');
}

function sendEmail() {
    alert('Demo: Email sending functionality would be implemented in a real application. For now, our travel expert will contact you with the detailed itinerary.');
    closeModal('travelPlanModal');
}

function requestExpertCall() {
    alert('Demo: Travel expert will contact you within 24 hours. Thank you for your interest in exploring Jharkhand!');
    closeModal('travelPlanModal');
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your inquiry! Our travel expert will contact you within 24 hours with personalized recommendations.');
    this.reset();
});

    // Initialize date picker if it exists
    const travelDateElement = document.getElementById('travelDate');
    if (travelDateElement) {
        travelDateElement.min = new Date().toISOString().split('T')[0];
    }

// Enhanced smooth scrolling with visual feedback
function initEnhancedScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const header = document.querySelector('header');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.remove('active');

                // Add clicking feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                // Calculate scroll position
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                // Smooth scroll with callback
                smoothScrollTo(targetPosition, 800, function () {
                    // Add highlight effect to the target section
                    targetElement.style.boxShadow = '0 0 0 2px var(--primary)';
                    setTimeout(() => {
                        targetElement.style.boxShadow = 'none';
                    }, 1000);
                });

                // Update URL
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration, callback) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            if (callback) callback();
        }
    }

    // Easing function
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced scroll spy with progress indicator
function initEnhancedScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const headerHeight = document.querySelector('header').offsetHeight;

    // Create progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--primary);
        z-index: 1001;
        transition: width 0.3s ease;
        width: 0%;
    `;
    document.body.appendChild(progressIndicator);

    function updateScrollSpy() {
        let currentSection = '';
        let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        let scrollProgress = (window.scrollY / maxScroll) * 100;

        // Update progress bar
        progressIndicator.style.width = `${scrollProgress}%`;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');

            if (linkHref === `#${currentSection}`) {
                link.classList.add('active');

                // Add pulse animation to active link
                link.style.animation = 'pulseActive 2s infinite';
            } else {
                link.style.animation = 'none';
            }
        });
    }

    // Add pulse animation for active link
    const pulseAnimation = `
        @keyframes pulseActive {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .nav-links a.active {
            color: var(--primary);
            font-weight: 600;
            position: relative;
        }
        
        .nav-links a.active::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            animation: pulseActive 2s infinite;
        }
    `;

    if (!document.querySelector('#pulse-animation')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'pulse-animation';
        styleElement.textContent = pulseAnimation;
        document.head.appendChild(styleElement);
    }

    window.addEventListener('scroll', updateScrollSpy);
    window.addEventListener('resize', updateScrollSpy);
    updateScrollSpy();
}


// Enhanced scrolling initialized in main DOMContentLoaded
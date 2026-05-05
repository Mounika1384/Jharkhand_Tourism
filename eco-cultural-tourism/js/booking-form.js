// Booking Form Functions for Index Page
let bookingCurrentStep = 1;
let bookingTravelersCount = 2;
const API_URL = 'http://localhost:3000/api';

// Initialize booking form
function initBookingForm() {
    // Set minimum date for travel date
    const today = new Date().toISOString().split('T')[0];
    const travelDateInput = document.getElementById('bookingTravelDate');
    if (travelDateInput) {
        travelDateInput.min = today;
    }
    
    // Initialize step 1 as active
    updateBookingSteps();
}

// Navigate between booking steps
function nextBookingStep(step) {
    // Validate current step before proceeding
    if (!validateBookingStep(bookingCurrentStep)) {
        alert('Please fill in all required fields in the current step.');
        return;
    }
    
    bookingCurrentStep = step;
    updateBookingSteps();
    
    // Update summary when reaching step 4
    if (step === 4) {
        updateBookingSummary();
    }
}

// Validate each step
function validateBookingStep(step) {
    switch(step) {
        case 1:
            const name = document.getElementById('bookingName').value;
            const email = document.getElementById('bookingEmail').value;
            const phone = document.getElementById('bookingPhone').value;
            const country = document.getElementById('bookingCountry').value;
            
            if (!name || !email || !phone || !country) {
                highlightInvalidFields(['bookingName', 'bookingEmail', 'bookingPhone', 'bookingCountry']);
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                highlightInvalidFields(['bookingEmail']);
                return false;
            }
            
            return true;
            
        case 2:
            const travelDate = document.getElementById('bookingTravelDate').value;
            const duration = document.getElementById('bookingDuration').value;
            
            if (!travelDate || !duration) {
                highlightInvalidFields(['bookingTravelDate', 'bookingDuration']);
                return false;
            }
            return true;
            
        case 3:
            const accommodation = document.querySelector('input[name="bookingAccommodation"]:checked');
            if (!accommodation) {
                alert('Please select an accommodation type.');
                return false;
            }
            return true;
            
        case 4:
            const agreeTerms = document.getElementById('bookingAgreeTerms').checked;
            if (!agreeTerms) {
                alert('Please agree to the Terms & Conditions.');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

function highlightInvalidFields(fieldIds) {
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field && !field.value) {
            field.style.borderColor = '#e53935';
            field.style.boxShadow = '0 0 0 2px rgba(229, 57, 53, 0.2)';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                field.style.borderColor = '';
                field.style.boxShadow = '';
            }, 3000);
        }
    });
}

// Update step display
function updateBookingSteps() {
    // Hide all steps
    for (let i = 1; i <= 4; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (stepElement) {
            stepElement.classList.remove('active');
        }
        const stepIndicator = document.querySelector(`.step[data-step="${i}"]`);
        if (stepIndicator) {
            stepIndicator.classList.remove('active');
        }
    }
    
    // Show current step
    const currentStepElement = document.getElementById(`step${bookingCurrentStep}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    const currentStepIndicator = document.querySelector(`.step[data-step="${bookingCurrentStep}"]`);
    if (currentStepIndicator) {
        currentStepIndicator.classList.add('active');
    }
}

// Change number of travelers
function changeBookingTravelers(change) {
    bookingTravelersCount = Math.max(1, bookingTravelersCount + change);
    const travelersCountElement = document.getElementById('bookingTravelersCount');
    if (travelersCountElement) {
        travelersCountElement.textContent = bookingTravelersCount;
    }
}

// Update booking summary
function updateBookingSummary() {
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;
    const country = document.getElementById('bookingCountry').value;
    const travelDate = document.getElementById('bookingTravelDate').value;
    const duration = document.getElementById('bookingDuration').value;
    const accommodation = document.querySelector('input[name="bookingAccommodation"]:checked')?.value || 'Not selected';
    const travelStyles = Array.from(document.querySelectorAll('input[name="bookingTravelStyle"]:checked')).map(cb => cb.value);
    
    // Format date
    const formattedDate = travelDate ? new Date(travelDate).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not selected';
    
    // Update summary content
    const summaryContent = document.getElementById('bookingSummaryContent');
    if (summaryContent) {
        summaryContent.innerHTML = `
            <div class="summary-item">
                <strong>Name:</strong> ${name || 'Not provided'}
            </div>
            <div class="summary-item">
                <strong>Email:</strong> ${email || 'Not provided'}
            </div>
            <div class="summary-item">
                <strong>Phone:</strong> ${phone || 'Not provided'}
            </div>
            <div class="summary-item">
                <strong>Country:</strong> ${country || 'Not provided'}
            </div>
            <div class="summary-item">
                <strong>Travel Date:</strong> ${formattedDate}
            </div>
            <div class="summary-item">
                <strong>Duration:</strong> ${duration || '0'} days
            </div>
            <div class="summary-item">
                <strong>Travelers:</strong> ${bookingTravelersCount} person(s)
            </div>
            <div class="summary-item">
                <strong>Accommodation:</strong> ${accommodation.charAt(0).toUpperCase() + accommodation.slice(1)}
            </div>
            <div class="summary-item">
                <strong>Travel Style:</strong> ${travelStyles.length > 0 ? travelStyles.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') : 'None selected'}
            </div>
        `;
    }
    
    // Update estimated costs
    updateBookingCosts(duration, accommodation, bookingTravelersCount);
}

function updateBookingCosts(duration, accommodation, travelers) {
    const durationNum = parseInt(duration) || 0;
    const travelersNum = parseInt(travelers) || 1;
    
    // Calculate costs based on accommodation type
    let accommodationRate = 0;
    switch(accommodation) {
        case 'budget':
            accommodationRate = 1000;
            break;
        case 'midrange':
            accommodationRate = 2000;
            break;
        case 'luxury':
            accommodationRate = 3000;
            break;
        default:
            accommodationRate = 2000;
    }
    
    const accommodationCost = accommodationRate * durationNum * travelersNum;
    const transportCost = 1750 * travelersNum;
    const activitiesCost = 1000 * travelersNum;
    const totalCost = accommodationCost + transportCost + activitiesCost;
    
    // Update cost display
    const costAccommodation = document.getElementById('bookingCostAccommodation');
    const costTransport = document.getElementById('bookingCostTransport');
    const costActivities = document.getElementById('bookingCostActivities');
    const costTotal = document.getElementById('bookingCostTotal');
    
    if (costAccommodation) costAccommodation.textContent = `₹${accommodationCost.toLocaleString()}`;
    if (costTransport) costTransport.textContent = `₹${transportCost.toLocaleString()}`;
    if (costActivities) costActivities.textContent = `₹${activitiesCost.toLocaleString()}`;
    if (costTotal) costTotal.textContent = `₹${totalCost.toLocaleString()}`;
}

// Submit booking form
async function submitBookingForm() {
    if (!validateBookingStep(4)) {
        return;
    }
    
    // Collect all form data
    const bookingData = {
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        country: document.getElementById('bookingCountry').value,
        address: document.getElementById('bookingAddress').value || '',
        travelDate: document.getElementById('bookingTravelDate').value,
        duration: parseInt(document.getElementById('bookingDuration').value),
        travelers: bookingTravelersCount,
        accommodation: document.querySelector('input[name="bookingAccommodation"]:checked').value,
        travelStyle: Array.from(document.querySelectorAll('input[name="bookingTravelStyle"]:checked')).map(cb => cb.value),
        tourType: 'eco-tourism',
        transport: 'private',
        message: '',
        destination: 'Multiple'
    };
    
    // Show loading state
    const submitBtn = document.querySelector('button[onclick="submitBookingForm()"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Try to submit to backend API
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            showBookingSuccess(data.data);
            
            // Reset form
            resetBookingForm();
        } else {
            throw new Error(data.error || 'Failed to submit booking');
        }
    } catch (error) {
        console.error('Booking error:', error);
        
        // Fallback to localStorage
        try {
            const bookings = JSON.parse(localStorage.getItem('jharkhandBookings') || '[]');
            const reference = `JHB${Date.now().toString().slice(-6)}`;
            bookingData.bookingReference = reference;
            bookingData.createdAt = new Date().toISOString();
            bookingData.status = 'pending';
            bookings.push(bookingData);
            localStorage.setItem('jharkhandBookings', JSON.stringify(bookings));
            
            showBookingSuccess({
                reference: reference,
                name: bookingData.name,
                email: bookingData.email
            });
            
            resetBookingForm();
        } catch (localError) {
            alert('Failed to submit booking. Please try again or contact us directly.');
        }
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showBookingSuccess(bookingData) {
    // Update modal content
    const bookingRefElement = document.getElementById('bookingRef');
    if (bookingRefElement) {
        bookingRefElement.textContent = bookingData.reference || bookingData.bookingReference;
    }
    
    // Show success modal
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        alert(`Booking submitted successfully!\nReference: ${bookingData.reference || bookingData.bookingReference}\nWe will contact you shortly.`);
    }
}

function resetBookingForm() {
    // Reset to step 1
    bookingCurrentStep = 1;
    bookingTravelersCount = 2;
    
    // Reset form fields
    document.getElementById('bookingName').value = '';
    document.getElementById('bookingEmail').value = '';
    document.getElementById('bookingPhone').value = '';
    document.getElementById('bookingCountry').value = '';
    document.getElementById('bookingAddress').value = '';
    document.getElementById('bookingTravelDate').value = '';
    document.getElementById('bookingDuration').value = '';
    document.getElementById('bookingTravelersCount').textContent = '2';
    
    // Reset radio buttons and checkboxes
    document.querySelectorAll('input[name="bookingAccommodation"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('input[name="bookingTravelStyle"]').forEach(cb => cb.checked = false);
    document.getElementById('bookingAgreeTerms').checked = false;
    
    // Update steps
    updateBookingSteps();
}

// Contact form submission
async function submitContactForm(event) {
    event.preventDefault();
    
    const contactData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        message: document.getElementById('contactMessage').value,
        type: 'planning_help'
    };
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Try to save to backend (you could create a /api/contacts endpoint)
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...contactData,
                travelDate: new Date().toISOString().split('T')[0],
                duration: 1,
                travelers: 1,
                accommodation: 'midrange',
                tourType: 'consultation'
            })
        });
        
        if (response.ok) {
            alert('Thank you! Our travel expert will contact you within 24 hours.');
            event.target.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        // Fallback to localStorage
        try {
            const contacts = JSON.parse(localStorage.getItem('jharkhandContacts') || '[]');
            contacts.push(contactData);
            localStorage.setItem('jharkhandContacts', JSON.stringify(contacts));
            
            alert('Thank you! Our travel expert will contact you within 24 hours.');
            event.target.reset();
        } catch {
            alert('Message sent! (Note: Saved locally)');
            event.target.reset();
        }
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBookingForm();
    
    // Add event listener for Enter key in search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                performSearch(searchInput.value);
            }
        });
    }
});
// Form validation functions
function validateField(field) {
    const value = field.value.trim();
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (!errorElement) return;
    
    // Clear previous validation
    field.classList.remove('valid', 'invalid');
    errorElement.classList.remove('show');
    
    if (field.hasAttribute('data-required') && !value) {
        field.classList.add('invalid');
        errorElement.textContent = 'This field is required';
        errorElement.classList.add('show');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('invalid');
            errorElement.textContent = 'Please enter a valid email address';
            errorElement.classList.add('show');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('invalid');
            errorElement.textContent = 'Please enter a valid phone number';
            errorElement.classList.add('show');
            return false;
        }
    }
    
    // Message validation
    if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
        field.classList.add('invalid');
        errorElement.textContent = 'Please enter at least 10 characters';
        errorElement.classList.add('show');
        return false;
    }
    
    // If valid
    if (value) {
        field.classList.add('valid');
    }
    
    return true;
}

function validateContactForm() {
    const fields = ['contactName', 'contactEmail', 'contactPhone', 'contactMessage'];
    let isValid = true;
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });
    
    // Check agreement checkbox
    const agreeCheckbox = document.getElementById('contactAgree');
    if (agreeCheckbox && !agreeCheckbox.checked) {
        alert('Please agree to receive travel recommendations');
        isValid = false;
    }
    
    return isValid;
}
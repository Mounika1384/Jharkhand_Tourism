// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

class JharkhandTourismAPI {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    // Generic fetch method
    async fetchAPI(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // Search destinations
    async searchDestinations(query) {
        return this.fetchAPI(`/search?q=${encodeURIComponent(query)}`);
    }

    // Get all destinations
    async getDestinations(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        return this.fetchAPI(`/destinations${queryParams ? '?' + queryParams : ''}`);
    }

    // Get single destination
    async getDestination(id) {
        return this.fetchAPI(`/destinations/${id}`);
    }

    // Submit booking
    async submitBooking(bookingData) {
        return this.fetchAPI('/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData)
        });
    }

    // Register tourist
    async registerTourist(touristData) {
        return this.fetchAPI('/tourists', {
            method: 'POST',
            body: JSON.stringify(touristData)
        });
    }

    // Get incidents
    async getIncidents(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        return this.fetchAPI(`/incidents${queryParams ? '?' + queryParams : ''}`);
    }

    // Report incident
    async reportIncident(incidentData) {
        return this.fetchAPI('/incidents', {
            method: 'POST',
            body: JSON.stringify(incidentData)
        });
    }

    // Get booking by reference
    async getBookingByReference(reference) {
        return this.fetchAPI(`/bookings?reference=${reference}`);
    }

    // Get tourist by digital ID
    async getTouristByDigitalId(digitalId) {
        return this.fetchAPI(`/tourists/digital/${digitalId}`);
    }

    // Check API health
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Create global API instance
const tourismAPI = new JharkhandTourismAPI();

// Initialize API health check
document.addEventListener('DOMContentLoaded', async () => {
    const isHealthy = await tourismAPI.checkHealth();
    if (!isHealthy) {
        console.warn('⚠️ Backend API is not available. Using fallback data.');
    }
});
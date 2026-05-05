    // Initialize search UI if elements exist
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
    }

    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) performSearch(searchInput.value);
        });
    }
});

// SEARCH_API_URL for production/local
const SEARCH_API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://jharkhand-tourism-backend-h5sq.onrender.com/api';

async function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    try {
        const response = await fetch(`${SEARCH_API_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        const results = Array.isArray(data) ? data : (data.success ? data.data : []);
        
        if (results && results.length > 0) {
            displayResults(results);
        } else {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.style.display = 'block';
        }
    } catch (error) {
        console.error('Search error:', error);
        // Fallback to local search
        const localResults = (typeof destinations !== 'undefined' ? destinations : []).filter(dest => 
            dest.name.toLowerCase().includes(query.toLowerCase()) ||
            dest.description.toLowerCase().includes(query.toLowerCase()) ||
            dest.badge.toLowerCase().includes(query.toLowerCase())
        ) || [];
        
        if (localResults.length > 0) {
            displayResults(localResults);
        } else {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.style.display = 'block';
        }
    }
}

function displayResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = results.map(dest => `
        <div class="search-result-item" onclick="handleSearchResult(${dest.id})">
            <strong>${dest.name}</strong>
            <p style="margin: 5px 0; font-size: 0.9em; color: #666;">
                ${dest.description.substring(0, 80)}...
            </p>
            <span style="background: #2e7d32; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8em;">
                ${dest.badge}
            </span>
        </div>
    `).join('');
    
    searchResults.style.display = 'block';
}

// Global click handler to close results
document.addEventListener('click', function(e) {
    const searchResults = document.getElementById('searchResults');
    if (searchResults && !e.target.closest('.search-container')) {
        searchResults.style.display = 'none';
    }
});

function handleSearchResult(destinationId) {
    // Find destination using the global variable
    const dests = typeof destinations !== 'undefined' ? destinations : [];
    const destination = dests.find(d => d.id === destinationId);
    
    if (destination) {
        // Close results
        const searchResults = document.getElementById('searchResults');
        const searchInput = document.getElementById('searchInput');
        
        if (searchResults) searchResults.style.display = 'none';
        if (searchInput) searchInput.value = '';
        
        // Scroll to destination section
        const destSection = document.getElementById('destinations');
        if (destSection) {
            destSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Show on map
        if (typeof showDestinationOnMap === 'function') {
            setTimeout(() => {
                showDestinationOnMap(destination.lat, destination.lng, destination.name);
            }, 500);
        }
    }
}
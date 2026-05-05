document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    let debounceTimer;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
    
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    async function performSearch(query) {
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        try {
            // Try backend search first (using port 3000 as default)
            const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            // Handle both array response and {success: true, data: []} response
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
            // Use 'destinations' directly as it's in the global scope from data.js
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
    
    // Close results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
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
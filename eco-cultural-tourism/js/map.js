// Map functions
function initMap() {
    // Initialize map centered on Jharkhand
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded. Map cannot be initialized.');
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Unable to load map. Please check your internet connection.</div>';
        }
        return;
    }
    map = L.map('map').setView([23.3441, 85.3091], 8);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers for each destination with custom icons based on type
destinations.forEach(destination => {
    let iconColor = 'blue';
    
    // Set different colors based on destination type
    if (destination.badge === 'Wildlife') iconColor = 'green';
    else if (destination.badge === 'Waterfall') iconColor = 'lightblue';
    else if (destination.badge === 'Hill Station') iconColor = 'orange';
    else if (destination.badge === 'Pilgrimage') iconColor = 'purple';
    else if (destination.badge === 'City') iconColor = 'red';
    else if (destination.badge === 'Industrial') iconColor = 'gray';
    else if (destination.badge === 'Dam') iconColor = 'cadetblue';
    else if (destination.badge === 'Heritage') iconColor = 'darkred';
    else if (destination.badge === 'Nature') iconColor = 'blue'; // Add this line
    
    const marker = L.marker([destination.lat, destination.lng], {
            icon: L.divIcon({
                className: 'destination-marker',
                html: `<div style="background-color: ${iconColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        })
        .addTo(map)
        .bindPopup(`
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #2e7d32;">${destination.name}</h3>
                <img src="${destination.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
                <p style="margin: 0 0 10px 0; font-size: 14px;">${destination.description.substring(0, 100)}...</p>
                <div style="display: flex; gap: 5px; margin-bottom: 10px;">
                    ${destination.features.map(feature => 
                        `<span style="background: #e8f5e9; color: #2d5a27; padding: 2px 6px; border-radius: 10px; font-size: 12px;">${feature}</span>`
                    ).join('')}
                </div>
                <button onclick="showDestinationDetails(${destination.id})" 
                        style="background: #2e7d32; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; width: 100%;">
                    View Details
                </button>
            </div>
        `);
        
        markers.push(marker);
    });
    
    // Add legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        const categories = {
            'City': 'red',
            'Pilgrimage': 'purple',
            'Industrial': 'gray',
            'Wildlife': 'green',
            'Hill Station': 'orange',
            'Waterfall': 'lightblue',
            'Dam': 'cadetblue',
            'Heritage': 'darkred',
            'Nature': 'blue'
        };
        
        let legendHTML = '<h4 style="margin: 0 0 10px 0;">Destination Types</h4>';
        for (const category in categories) {
            legendHTML += `
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <div style="width: 15px; height: 15px; background-color: ${categories[category]}; border-radius: 50%; margin-right: 8px; border: 2px solid white;"></div>
                    <span style="font-size: 12px;">${category}</span>
                </div>
            `;
        }
        
        div.innerHTML = legendHTML;
        return div;
    };
    legend.addTo(map);
}

function showDestinationOnMap(lat, lng, name) {
    // Scroll to map section
    document.getElementById('map').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
    
    // Highlight the map section
    const mapElement = document.getElementById('map');
    mapElement.classList.add('map-highlight');
    
    // Center map on the destination
    map.setView([lat, lng], 12);
    
    // Open popup for the specific marker
    markers.forEach(marker => {
        const markerLatLng = marker.getLatLng();
        if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
            marker.openPopup();
        }
    });
    
    // Remove highlight after animation
    setTimeout(() => {
        mapElement.classList.remove('map-highlight');
    }, 2000);
    
    // Show notification
    showMapNotification(`Showing ${name} on the map`);
}
// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function showSOSModal() {
    showModal('sosModal');
}

function showTouristRegistration() {
    showModal('touristRegistrationModal');
}

function showGeoFencingDemo() {
    showModal('geoFencingModal');
    // Initialize demo map
    setTimeout(() => {
        const demoMap = L.map('demoMap').setView([23.6102, 85.2799], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(demoMap);
        
        // Add sample safe and restricted zones
        L.circle([23.6102, 85.2799], {color: 'green', fillColor: 'green', radius: 20000}).addTo(demoMap)
            .bindPopup('Safe Zone: Ranchi Area');
        L.circle([23.8759, 84.2005], {color: 'red', fillColor: 'red', radius: 5000}).addTo(demoMap)
            .bindPopup('Restricted Area: Betla National Park Core Zone');
    }, 100);
}

function simulateGeoFenceAlert() {
    alert('Alert: You are entering a restricted area. Please follow safety guidelines and avoid venturing into unauthorized zones.');
}

function showIncidentHistory() {
    showModal('incidentHistoryModal');
    const incidentList = document.getElementById('incidentList');
    incidentList.innerHTML = '';
    
    incidents.forEach(incident => {
        const incidentItem = document.createElement('div');
        incidentItem.style.padding = '1rem';
        incidentItem.style.borderBottom = '1px solid #eee';
        incidentItem.innerHTML = `
            <h4>${incident.location}</h4>
            <p><strong>Type:</strong> ${incident.type}</p>
            <p><strong>Date:</strong> ${incident.date}</p>
            <p><strong>Status:</strong> ${incident.status}</p>
        `;
        incidentList.appendChild(incidentItem);
    });
}
// Enhanced SOS functionality
function showSOSModal() {
    showModal('sosModal');
    
    // In real implementation, this would send actual emergency signals
    simulateEmergencyAlert();
}

function simulateEmergencyAlert() {
    // Simulate sending emergency data
    const emergencyData = {
        timestamp: new Date().toISOString(),
        type: 'tourist_emergency',
        priority: 'high',
        estimatedLocation: 'Jharkhand Tourism Area',
        // In real app, this would include GPS coordinates
        coordinates: {
            lat: 23.6102,
            lng: 85.2799
        }
    };
    
    console.log('Emergency alert simulated:', emergencyData);
    // In real implementation, this would send to server/authorities
}

// Enhanced SOS modal with more options
function createEnhancedSOSModal() {
    const sosModal = document.getElementById('sosModal');
    if (sosModal) {
        sosModal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <span class="close-modal" onclick="closeModal('sosModal')">&times;</span>
                <div class="sos-emergency">
                    <div class="sos-header">
                        <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #e53935; margin-bottom: 1rem;"></i>
                        <h2>Emergency Alert Activated!</h2>
                    </div>
                    
                    <div class="sos-status">
                        <div class="status-item">
                            <i class="fas fa-shield-alt"></i>
                            <div>
                                <strong>Police Notified</strong>
                                <span class="status-badge success">✓ Connected</span>
                            </div>
                        </div>
                        
                        <div class="status-item">
                            <i class="fas fa-ambulance"></i>
                            <div>
                                <strong>Medical Services</strong>
                                <span class="status-badge success">✓ Alerted</span>
                            </div>
                        </div>
                        
                        <div class="status-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Location Shared</strong>
                                <span class="status-badge success">✓ Transmitted</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="emergency-instructions">
                        <h4>What to Do Now:</h4>
                        <ul>
                            <li>✅ Stay calm and find a safe location</li>
                            <li>✅ Keep your phone accessible</li>
                            <li>✅ Wait for emergency response</li>
                            <li>✅ Follow instructions from authorities</li>
                        </ul>
                    </div>
                    
                    <div class="sos-actions">
                        <button class="btn btn-emergency" onclick="callEmergencyNumber()">
                            <i class="fas fa-phone"></i> Call Emergency: 112
                        </button>
                        <button class="btn" onclick="closeModal('sosModal')">
                            I'm Safe - Cancel Alert
                        </button>
                    </div>
                    
                    <div class="emergency-contacts">
                        <p><strong>Important Numbers:</strong></p>
                        <div class="contact-numbers">
                            <span>Police: 100</span>
                            <span>Ambulance: 108</span>
                            <span>Fire: 101</span>
                            <span>Tourist Helpline: 1363</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function callEmergencyNumber() {
    // In real app, this would initiate a phone call
    alert('Demo: Calling emergency number 112...\nIn a real app, this would connect to emergency services.');
    window.open('tel:112');
}

// Add this CSS to your style.css for enhanced SOS modal
const sosStyles = `
    .sos-emergency {
        text-align: center;
    }
    
    .sos-header {
        margin-bottom: 2rem;
    }
    
    .sos-status {
        display: grid;
        gap: 1rem;
        margin: 2rem 0;
    }
    
    .status-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #fff3e0;
        border-radius: 8px;
        text-align: left;
    }
    
    .status-item i {
        font-size: 1.5rem;
        color: #e53935;
    }
    
    .status-badge {
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .status-badge.success {
        background: #4caf50;
        color: white;
    }
    
    .emergency-instructions {
        background: #f5f5f5;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1.5rem 0;
        text-align: left;
    }
    
    .emergency-instructions ul {
        list-style: none;
        padding: 0;
    }
    
    .emergency-instructions li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .sos-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem 0;
    }
    
    .btn-emergency {
        background: #e53935;
        font-size: 1.1rem;
        padding: 15px;
    }
    
    .btn-emergency:hover {
        background: #c62828;
    }
    
    .emergency-contacts {
        background: #e3f2fd;
        padding: 1rem;
        border-radius: 8px;
    }
    
    .contact-numbers {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .contact-numbers span {
        padding: 0.5rem;
        background: white;
        border-radius: 4px;
        font-family: monospace;
    }
    
    @media (max-width: 768px) {
        .contact-numbers {
            grid-template-columns: 1fr;
        }
        
        .sos-actions {
            flex-direction: column;
        }
    }
`;

// Add the SOS styles to the document
if (!document.querySelector('#sos-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'sos-styles';
    styleElement.textContent = sosStyles;
    document.head.appendChild(styleElement);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
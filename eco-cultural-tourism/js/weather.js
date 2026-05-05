async function fetchWeather() {
    const locations = [
        { name: 'Ranchi', lat: 23.3441, lon: 85.3096 },
        { name: 'Deoghar', lat: 24.4826, lon: 86.6954 },
        { name: 'Jamshedpur', lat: 22.8046, lon: 86.2029 },
        { name: 'Betla', lat: 23.8759, lon: 84.2005 },
        { name: 'Netarhat', lat: 23.4833, lon: 84.2667 },
        { name: 'Parasnath', lat: 23.9667, lon: 86.1333 },
        { name: 'Ghatshila', lat: 22.5833, lon: 86.4833 },
        { name: 'Massanjore', lat: 24.2333, lon: 87.2500 },
        { name: 'Hazaribagh', lat: 23.9833, lon: 85.3500 },
        { name: 'Tagore Hill', lat: 23.3800, lon: 85.3300 },
        { name: 'Hundru Falls', lat: 23.4679, lon: 85.5981 },
        { name: 'Jonha Falls', lat: 23.6333, lon: 85.5667 },
        { name: 'Dassam Falls', lat: 22.9833, lon: 85.8333 }
    ];

    const weatherGrid = document.getElementById('weatherGrid');
    if (!weatherGrid) return;

    try {
        const weatherCards = await Promise.all(locations.map(async (loc) => {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true`);
            const data = await response.json();
            const weather = data.current_weather;
            
            return `
                <div class="weather-card glass-panel">
                    <div class="location">${loc.name}</div>
                    <div class="temp">${Math.round(weather.temperature)}°C</div>
                    <div class="condition">${getWeatherCondition(weather.weathercode)}</div>
                    <i class="${getWeatherIcon(weather.weathercode)}"></i>
                </div>
            `;
        }));

        weatherGrid.innerHTML = weatherCards.join('');
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherGrid.innerHTML = '<p>Unable to load weather data at this time.</p>';
    }
}

function getWeatherCondition(code) {
    const conditions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        95: 'Thunderstorm'
    };
    return conditions[code] || 'Unknown';
}

function getWeatherIcon(code) {
    if (code === 0) return 'fas fa-sun';
    if (code <= 3) return 'fas fa-cloud-sun';
    if (code <= 48) return 'fas fa-smog';
    if (code <= 55) return 'fas fa-cloud-rain';
    if (code <= 65) return 'fas fa-cloud-showers-heavy';
    if (code <= 75) return 'fas fa-snowflake';
    if (code >= 95) return 'fas fa-bolt';
    return 'fas fa-cloud';
}

document.addEventListener('DOMContentLoaded', fetchWeather);

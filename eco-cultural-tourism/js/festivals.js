const festivals = [
    { name: 'Sarhul', date: '2026-04-11', description: 'The tribal new year festival celebrating nature.' },
    { name: 'Karma', date: '2026-09-21', description: 'A harvest festival worshiping the Karam tree.' },
    { name: 'Sohrai', date: '2026-11-10', description: 'Festival of cattle and harvest paintings.' },
    { name: 'Makar Sankranti', date: '2026-01-14', description: 'Traditional kite flying and sun worship.' }
];

function initFestivals() {
    const grid = document.getElementById('festivalsGrid');
    if (!grid) return;

    grid.innerHTML = festivals.map(f => `
        <div class="festival-card glass-panel">
            <h4>${f.name}</h4>
            <p><strong>Date:</strong> ${new Date(f.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</p>
            <p>${f.description}</p>
        </div>
    `).join('');

    startCountdown();
}

function startCountdown() {
    // Target next Sarhul
    const targetDate = new Date('2027-04-11T00:00:00').getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', initFestivals);

let viewer;

const tourData = {
    ranchi: { panorama: "https://pannellum.org/images/cerro-toco-0.jpg", title: "Ranchi City 360°" },
    deoghar: { panorama: "https://pannellum.org/images/jure-et-loire.jpg", title: "Baidyanath Temple 360°" },
    jamshedpur: { panorama: "https://pannellum.org/images/alma-concordia.jpg", title: "Jamshedpur Steel City 360°" },
    betla: { panorama: "https://pannellum.org/images/buku-resort.jpg", title: "Betla National Park 360°" },
    netarhat: { panorama: "https://pannellum.org/images/milan.jpg", title: "Netarhat Sunrise 360°" },
    parasnath: { panorama: "https://pannellum.org/images/st-pancras.jpg", title: "Parasnath Hill 360°" },
    ghatshila: { panorama: "https://pannellum.org/images/cerro-toco-0.jpg", title: "Ghatshila Riverside 360°" },
    massanjore: { panorama: "https://pannellum.org/images/jure-et-loire.jpg", title: "Massanjore Dam 360°" },
    hazaribagh: { panorama: "https://pannellum.org/images/alma-concordia.jpg", title: "Hazaribagh Sanctuary 360°" },
    tagore: { panorama: "https://pannellum.org/images/buku-resort.jpg", title: "Tagore Hill 360°" },
    hundru: { panorama: "https://pannellum.org/images/milan.jpg", title: "Hundru Falls 360°" },
    jonha: { panorama: "https://pannellum.org/images/st-pancras.jpg", title: "Jonha Falls 360°" },
    dassam: { panorama: "https://pannellum.org/images/cerro-toco-0.jpg", title: "Dassam Falls 360°" }
};

// Different fallbacks to keep it interesting
const FALLBACKS = [
    "https://pannellum.org/images/cerro-toco-0.jpg",
    "https://pannellum.org/images/jure-et-loire.jpg",
    "https://pannellum.org/images/milan.jpg",
    "https://pannellum.org/images/st-pancras.jpg"
];

function initTourSidebar() {
    const sidebar = document.querySelector('.tour-sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = Object.keys(tourData).map((key, index) => `
        <div class="tour-option ${index === 0 ? 'active' : ''}" data-key="${key}" onclick="loadTour('${key}')">
            ${tourData[key].title.replace(' 360°', '')}
        </div>
    `).join('');

    loadTour(Object.keys(tourData)[0]);
}

function loadTour(key) {
    document.querySelectorAll('.tour-option').forEach(opt => opt.classList.remove('active'));
    const activeOpt = document.querySelector(`.tour-option[data-key="${key}"]`);
    if (activeOpt) activeOpt.classList.add('active');

    const config = tourData[key];

    if (viewer) {
        viewer.destroy();
    }

    viewer = pannellum.viewer('panorama-viewer', {
        "type": "equirectangular",
        "panorama": config.panorama,
        "autoLoad": true,
        "title": config.title,
        "author": "Jharkhand Tourism (Demo)",
        "autoRotate": -2
    });

    viewer.on('error', function(err) {
        console.warn("Pannellum error on " + key + ": ", err);
        // Use a random fallback from the list to keep it diverse
        const randomFallback = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
        
        viewer.destroy();
        viewer = pannellum.viewer('panorama-viewer', {
            "type": "equirectangular",
            "panorama": randomFallback,
            "autoLoad": true,
            "title": config.title,
            "author": "Jharkhand Tourism (Sample View)"
        });
    });
}

document.addEventListener('DOMContentLoaded', initTourSidebar);

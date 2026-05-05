const translations = {
    en: {
        search_placeholder: "Search destinations...",
        festival_title: "Cultural Festival Calendar",
        festival_subtitle: "Don't miss out on Jharkhand's vibrant celebrations",
        virtual_tour_title: "360° Virtual Tours",
        virtual_tour_subtitle: "Experience Jharkhand's beauty from your home",
        next_festival: "Next Major Festival: Sarhul",
        days: "Days",
        hours: "Hrs",
        minutes: "Min"
    },
    hi: {
        search_placeholder: "गंतव्य खोजें...",
        festival_title: "सांस्कृतिक उत्सव कैलेंडर",
        festival_subtitle: "झारखंड के जीवंत उत्सवों को देखने से न चूकें",
        virtual_tour_title: "360° वर्चुअल टूर",
        virtual_tour_subtitle: "अपने घर से झारखंड की सुंदरता का अनुभव करें",
        next_festival: "अगला प्रमुख त्योहार: सरहुल",
        days: "दिन",
        hours: "घंटे",
        minutes: "मिनट"
    },
    bn: {
        search_placeholder: "গন্তব্য খুঁজুন...",
        festival_title: "সাংস্কৃতিক উৎসব ক্যালেন্ডার",
        festival_subtitle: "ঝাড়খণ্ডের প্রাণবন্ত উৎসবগুলি মিস করবেন না",
        virtual_tour_title: "৩৬০° ভার্চুয়াল ট্যুর",
        virtual_tour_subtitle: "আপনার ঘর থেকে ঝাড়খণ্ডের সৌন্দর্য অনুভব করুন",
        next_festival: "পরবর্তী প্রধান উৎসব: সরহুল",
        days: "দিন",
        hours: "ঘন্টা",
        minutes: "মিনিট"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    applyTranslations(lang);
}

function applyTranslations(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    document.getElementById('langToggle').value = savedLang;
    applyTranslations(savedLang);
});

// Data for destinations with detailed information
const destinations = [
    {
        id: 1,
        name: "Ranchi - City of Waterfalls",
        description: "Known as the 'City of Waterfalls,' Ranchi is famous for its beautiful waterfalls such as Jonha Falls and Dassam Falls. The city also offers scenic views and cultural experiences.",
        image: "https://qph.fs.quoracdn.net/main-qimg-8aec0ffbd59d2eab4b42f5dac0e4b8d7-c",
        lat: 23.3441,
        lng: 85.3096,
        badge: "City",
        features: ["Waterfalls", "Cultural Hub", "Scenic Views"],
        details: {
            bestTime: "October to March",
            entryFee: "Free for city, individual attractions may charge",
            visitingHours: "24 hours for city",
            nearbyStays: [
                { name: "Radisson Blu Hotel", type: "Luxury", price: "₹5000-₹9000", rating: "4.5", facilities: ["Swimming Pool", "Spa", "Fine Dining"] },
                { name: "Yuvraj Palace Hotel", type: "Mid-range", price: "₹2500-₹4500", rating: "4.2", facilities: ["AC Rooms", "Restaurant", "Conference Hall"] },
                { name: "Hotel Greenwood", type: "Budget", price: "₹1200-₹2200", rating: "3.9", facilities: ["Comfortable Rooms", "Food Service", "Travel Desk"] }
            ],
            attractions: ["Tagore Hill", "Rock Garden", "Ranchi Lake", "Jagannath Temple", "Multiple Waterfalls"],
            distanceFromCity: "Capital City",
            transportation: "Well-connected by air, rail, and road"
        }
    },
    {
        id: 2,
        name: "Deoghar - Baidyanath Temple",
        description: "This city is renowned for the Baidyanath Temple, one of the twelve Jyotirlingas in India, attracting numerous pilgrims and tourists alike.",
        image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/09/Deoghar-Baidyanath-Temple.jpg",
        lat: 24.4869,
        lng: 86.7035,
        badge: "Pilgrimage",
        features: ["Religious", "Spiritual", "Cultural"],
        details: {
            bestTime: "October to March",
            entryFee: "Free for temple (special darshan charges may apply)",
            visitingHours: "4:00 AM - 9:00 PM",
            nearbyStays: [
                { name: "Shivganga Prasad", type: "Pilgrim Stay", price: "₹800-₹1500", rating: "4.0", facilities: ["Temple Proximity", "Vegetarian Food", "Prayer Hall"] },
                { name: "Hotel Yatrik", type: "Budget", price: "₹1000-₹2000", rating: "3.8", facilities: ["AC Rooms", "Restaurant", "Travel Assistance"] },
                { name: "Dharamshala", type: "Economy", price: "₹200-₹500", rating: "3.5", facilities: ["Basic Accommodation", "Community Kitchen", "Spiritual Atmosphere"] }
            ],
            attractions: ["Baidyanath Temple", "Naulakha Temple", "Satsang Ashram", "Triyuginarayan Temple"],
            distanceFromCity: "250 km from Ranchi",
            transportation: "Regular trains and buses from major cities"
        }
    },
    {
        id: 3,
        name: "Jamshedpur - Steel City",
        description: "The largest city in Jharkhand, Jamshedpur is known for its well-planned infrastructure and scenic landscapes, including the Dalma Hills.",
        image: "https://greencleanguide.com/wp-content/uploads/2021/09/Tata-Steel-Jamshedpur.jpg",
        lat: 22.8046,
        lng: 86.2029,
        badge: "Industrial",
        features: ["Planned City", "Industrial Hub", "Scenic"],
        details: {
            bestTime: "October to March",
            entryFee: "Free",
            visitingHours: "24 hours",
            nearbyStays: [
                { name: "The Sonnet", type: "Luxury", price: "₹4000-₹7000", rating: "4.4", facilities: ["Business Center", "Fitness Center", "Multi-cuisine Restaurant"] },
                { name: "Hotel Hill View", type: "Mid-range", price: "₹2000-₹3500", rating: "4.1", facilities: ["City View", "Comfortable Rooms", "Dining"] },
                { name: "Youth Hostel", type: "Budget", price: "₹500-₹1000", rating: "3.7", facilities: ["Dormitory", "Common Kitchen", "Travel Info"] }
            ],
            attractions: ["Jubilee Park", "Dalma Hills", "Tata Steel Zoological Park", "Dimna Lake"],
            distanceFromCity: "130 km from Ranchi",
            transportation: "Excellent connectivity by road and rail"
        }
    },
    {
        id: 4,
        name: "Betla National Park",
        description: "Located in the Palamu district, this national park is rich in flora and fauna, offering opportunities for wildlife enthusiasts.",
        image: "https://i.ytimg.com/vi/7LsHgff7CPI/maxresdefault.jpg",
        lat: 23.8759,
        lng: 84.2005,
        badge: "Wildlife",
        features: ["Tiger Reserve", "Forest Safari", "Bird Watching"],
        details: {
            bestTime: "October to March",
            entryFee: "₹50 per person",
            safariTimings: "6:00 AM - 10:00 AM & 3:00 PM - 6:00 PM",
            nearbyStays: [
                { name: "Betla Forest Rest House", type: "Government", price: "₹1500-₹2500", rating: "4.2", facilities: ["AC Rooms", "Restaurant", "Parking"] },
                { name: "Palamau Tiger Reserve Lodge", type: "Budget", price: "₹800-₹1200", rating: "3.8", facilities: ["Basic Rooms", "Food Service", "Guide Available"] },
                { name: "Wilderness Resort", type: "Luxury", price: "₹3500-₹6000", rating: "4.5", facilities: ["Swimming Pool", "Spa", "Wildlife Tours"] }
            ],
            attractions: ["Core Tiger Area", "Betla Fort", "Kechki River", "Waterfalls"],
            distanceFromCity: "140 km from Ranchi",
            transportation: "Buses and taxis available from Ranchi"
        }
    },
    {
        id: 5,
        name: "Netarhat - Queen of Chotanagpur",
        description: "Often referred to as the 'Queen of Chotanagpur,' Netarhat is a serene hill station known for its breathtaking sunrises and sunsets.",
        image: "https://i.ytimg.com/vi/hJA-gOkvEfo/hqdefault.jpg",
        lat: 23.4833,
        lng: 84.2667,
        badge: "Hill Station",
        features: ["Sunrise Point", "Nature Walks", "Relaxation"],
        details: {
            bestTime: "September to May",
            entryFee: "Free",
            visitingHours: "24 hours",
            nearbyStays: [
                { name: "Netarhat Hill Resort", type: "Luxury", price: "₹4000-₹7000", rating: "4.6", facilities: ["Mountain View", "Multi-cuisine Restaurant", "Spa"] },
                { name: "PWD Guest House", type: "Government", price: "₹1200-₹2000", rating: "4.1", facilities: ["Well-maintained", "Garden", "Food Service"] },
                { name: "Sunrise Point Homestay", type: "Homestay", price: "₹800-₹1500", rating: "4.4", facilities: ["Home-cooked Food", "Local Guides", "Cultural Experience"] }
            ],
            attractions: ["Sunrise Point", "Sunset Point", "Lower Ghaghri Falls", "Mughal Garden"],
            distanceFromCity: "156 km from Ranchi",
            transportation: "Buses from Ranchi and private vehicles"
        }
    },
    {
        id: 6,
        name: "Parasnath Hill - Jain Pilgrimage",
        description: "This is a significant pilgrimage site for Jains, as it is believed to be the place where many Tirthankaras attained enlightenment.",
        image: "https://i.ytimg.com/vi/QMVq_orTxd4/maxresdefault.jpg",
        lat: 23.9667,
        lng: 86.1333,
        badge: "Pilgrimage",
        features: ["Religious", "Trekking", "Spiritual"],
        details: {
            bestTime: "October to March",
            entryFee: "Free",
            visitingHours: "5:00 AM - 7:00 PM",
            nearbyStays: [
                { name: "Shikharji Dharamshala", type: "Pilgrim Stay", price: "₹300-₹800", rating: "4.0", facilities: ["Temple Proximity", "Vegetarian Food", "Prayer Facilities"] },
                { name: "Hill Top Resort", type: "Mid-range", price: "₹1800-₹3000", rating: "4.1", facilities: ["Mountain View", "Restaurant", "Trekking Guides"] },
                { name: "Guest Houses", type: "Budget", price: "₹600-₹1200", rating: "3.7", facilities: ["Basic Accommodation", "Food Available", "Spiritual Environment"] }
            ],
            attractions: ["Jain Temples", "Summit View", "Trekking Routes", "Meditation Points"],
            distanceFromCity: "168 km from Ranchi",
            transportation: "Buses and taxis from Giridih"
        }
    },
    {
        id: 7,
        name: "Ghatshila - Riverside Town",
        description: "A quaint town located on the banks of the Subarnarekha River, Ghatshila is known for its natural beauty and tranquility.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
        lat: 22.5833,
        lng: 86.4833,
        badge: "Nature",
        features: ["Riverside", "Tranquil", "Scenic"],
        details: {
            bestTime: "October to March",
            entryFee: "Free",
            visitingHours: "24 hours",
            nearbyStays: [
                { name: "Riverside Resort", type: "Mid-range", price: "₹2200-₹3800", rating: "4.3", facilities: ["River View", "Boating", "Restaurant"] },
                { name: "Tourist Bungalow", type: "Budget", price: "₹800-₹1500", rating: "3.9", facilities: ["Basic Comfort", "Food Service", "Local Tours"] },
                { name: "Nature Camps", type: "Adventure", price: "₹1200-₹2000", rating: "4.2", facilities: ["Tents", "Campfire", "Adventure Activities"] }
            ],
            attractions: ["Subarnarekha River", "Burudi Lake", "Dharagiri Falls", "Galudih Barrage"],
            distanceFromCity: "45 km from Jamshedpur",
            transportation: "Regular buses from Jamshedpur"
        }
    },
    {
        id: 8,
        name: "Massanjore Dam - Picnic Spot",
        description: "Situated near Dumka, this dam is a popular picnic spot and offers picturesque views of the surrounding landscape.",
        image: "https://1.bp.blogspot.com/-TW7R0xZhuXE/UrPpPw97tTI/AAAAAAAABGo/4uEENIkNW-8/s1600/Masanjore+Dam.jpg",
        lat: 24.2333,
        lng: 87.2500,
        badge: "Dam",
        features: ["Picnic", "Scenic", "Relaxation"],
        details: {
            bestTime: "October to March",
            entryFee: "Free",
            visitingHours: "6:00 AM - 6:00 PM",
            nearbyStays: [
                { name: "Dam View Resort", type: "Mid-range", price: "₹1800-₹3000", rating: "4.0", facilities: ["Dam View", "Restaurant", "Boating"] },
                { name: "Tourist Lodge", type: "Budget", price: "₹700-₹1300", rating: "3.8", facilities: ["Basic Accommodation", "Food Available", "Parking"] },
                { name: "Local Homestays", type: "Homestay", price: "₹500-₹1000", rating: "4.1", facilities: ["Local Experience", "Home Food", "Cultural Exchange"] }
            ],
            attractions: ["Dam Structure", "Reservoir", "Boating", "Gardens"],
            distanceFromCity: "55 km from Dumka",
            transportation: "Taxis and local transport from Dumka"
        }
    },
    {
        id: 9,
        name: "Hazaribagh Wildlife Sanctuary",
        description: "This sanctuary is home to a variety of wildlife and is a great place for nature walks and wildlife spotting.",
        image: "https://i.ytimg.com/vi/F8kDXMlPvHQ/maxresdefault.jpg",
        lat: 23.9833,
        lng: 85.3500,
        badge: "Wildlife",
        features: ["Nature Walks", "Wildlife", "Birding"],
        details: {
            bestTime: "October to March",
            entryFee: "₹40 per person",
            visitingHours: "6:00 AM - 5:00 PM",
            nearbyStays: [
                { name: "Forest Rest House", type: "Government", price: "₹1200-₹2000", rating: "4.0", facilities: ["Forest Setting", "Basic Comfort", "Guide Service"] },
                { name: "Wildlife Resort", type: "Mid-range", price: "₹2000-₹3500", rating: "4.2", facilities: ["Nature View", "Restaurant", "Wildlife Tours"] },
                { name: "Budget Hotels", type: "Budget", price: "₹600-₹1200", rating: "3.6", facilities: ["Basic Rooms", "Food Available", "Travel Assistance"] }
            ],
            attractions: ["Wildlife Spotting", "Nature Trails", "Bird Watching", "Photography"],
            distanceFromCity: "95 km from Ranchi",
            transportation: "Buses and taxis from Hazaribagh town"
        }
    },
    {
        id: 10,
        name: "Tagore Hill - Ranchi",
        description: "Named after the famous poet Rabindranath Tagore, this hill offers panoramic views of Ranchi and is a great spot for picnics.",
        image: "https://indiano.travel/wp-content/uploads/2022/04/Website-Feature-Image-Size-2.jpg",
        lat: 23.3800,
        lng: 85.3300,
        badge: "Heritage",
        features: ["Historical", "Viewpoint", "Picnic"],
        details: {
            bestTime: "Throughout the year",
            entryFee: "Free",
            visitingHours: "6:00 AM - 6:00 PM",
            nearbyStays: [
                { name: "City Center Hotels", type: "Various", price: "₹1500-₹5000", rating: "4.0+", facilities: ["City Access", "Multiple Options", "Various Amenities"] },
                { name: "Budget Accommodations", type: "Budget", price: "₹800-₹2000", rating: "3.5+", facilities: ["Basic Comfort", "Food Options", "Transport Access"] }
            ],
            attractions: ["Panoramic City Views", "Tagore Memorial", "Walking Trails", "Sunset Point"],
            distanceFromCity: "Within Ranchi city",
            transportation: "Local transport, auto-rickshaws, taxis"
        }
    },
    {
        id: 11,
        name: "Hundru Falls",
        description: "One of the most famous waterfalls in Jharkhand, offering breathtaking views especially during monsoon season.",
        image: "https://www.gosahin.com/go/p/e/t1/1532787847_Hundru-Falls4.jpg",
        lat: 23.4679,
        lng: 85.5981,
        badge: "Waterfall",
        features: ["Picnic Spot", "Adventure", "Photography"],
        details: {
            bestTime: "July to October",
            entryFee: "₹20 per person",
            visitingHours: "6:00 AM - 6:00 PM",
            nearbyStays: [
                { name: "Hundru Falls View Resort", type: "Mid-range", price: "₹2000-₹3500", rating: "4.0", facilities: ["River View", "Restaurant", "Adventure Activities"] },
                { name: "Tourist Bungalow", type: "Budget", price: "₹600-₹1000", rating: "3.5", facilities: ["Basic Accommodation", "Food Available", "Parking"] },
                { name: "Nature Camp", type: "Adventure", price: "₹1500-₹2500", rating: "4.3", facilities: ["Tents", "Bonfire", "Trekking Guides"] }
            ],
            attractions: ["Waterfall Viewpoints", "Swimming Areas", "Rock Climbing", "Picnic Spots"],
            distanceFromCity: "45 km from Ranchi",
            transportation: "Local buses and shared taxis available"
        }
    },
    {
        id: 12,
        name: "Jonha Falls (Gautamdhara)",
        description: "Also known as Gautamdhara, this scenic waterfall is surrounded by lush green forests, creating a serene atmosphere.",
        image: "https://tse3.mm.bing.net/th/id/OIP.8o_mLHgp51CM258vZPoqHQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        lat: 23.6333,
        lng: 85.5667,
        badge: "Nature",
        features: ["Religious Site", "Trekking", "Natural Pool"],
        details: {
            bestTime: "June to December",
            entryFee: "₹30 per person",
            visitingHours: "7:00 AM - 5:00 PM",
            nearbyStays: [
                { name: "Gautamdhara Resort", type: "Mid-range", price: "₹1800-₹3000", rating: "4.2", facilities: ["Waterfall View", "Swimming Pool", "Restaurant"] },
                { name: "Jonha Forest Lodge", type: "Budget", price: "₹700-₹1200", rating: "3.9", facilities: ["Forest Setting", "Basic Amenities", "Trekking Guides"] },
                { name: "Kanchan Residency", type: "Business", price: "₹2500-₹4000", rating: "4.0", facilities: ["AC Rooms", "Conference Hall", "Travel Desk"] }
            ],
            attractions: ["Waterfall", "Gautam Buddha Temple", "Trekking Trails", "Natural Pools"],
            distanceFromCity: "40 km from Ranchi",
            transportation: "Regular buses and taxis from Ranchi"
        }
    },
    {
        id: 13,
        name: "Dassam Falls",
        description: "A magnificent waterfall on the Subarnarekha River, known for its natural beauty and the thunderous sound of falling water.",
        image: "https://media.gettyimages.com/id/1347863618/photo/the-dassam-falls-is-a-waterfall-located-near-ranchi-district-in-the-indian-state-of-jharkhand.jpg?b=1&s=170667a&w=0&k=20&c=h6RG58NItp6ExLJxcY2Q_lPcSZ8BFKUQTSQPkQP-h8E=",
        lat: 22.9833,
        lng: 85.8333,
        badge: "Waterfall",
        features: ["River Source", "Adventure", "Geological Interest"],
        details: {
            bestTime: "July to November",
            entryFee: "₹25 per person",
            visitingHours: "6:00 AM - 5:00 PM",
            nearbyStays: [
                { name: "Dassam Falls Resort", type: "Mid-range", price: "₹2200-₹3800", rating: "4.2", facilities: ["Waterfall Proximity", "Restaurant", "Adventure Zone"] },
                { name: "Tourist Hostel", type: "Budget", price: "₹500-₹900", rating: "3.6", facilities: ["Dormitory", "Basic Food", "Local Guides"] },
                { name: "River Side Cottages", type: "Luxury", price: "₹4500-₹8000", rating: "4.5", facilities: ["Private Cottages", "River View", "Luxury Amenities"] }
            ],
            attractions: ["Main Waterfall", "Subarnarekha River", "Rock Formations", "Swimming Areas"],
            distanceFromCity: "40 km from Ranchi",
            transportation: "Buses and shared jeeps available"
        }
    }
];

// Data for culture
const cultureItems = [
    {   
        
        title: "Tribal Festivals",
        description: "Experience vibrant tribal festivals like Sarhul, Karma, and Sohrai that celebrate nature and harvest.",
        icon:"fas fa-music"
    },
    {
        title: "Handicrafts",
        description: "Discover exquisite tribal handicrafts including bamboo products, wood carvings, and traditional jewelry.",
        icon: "fas fa-palette"
    },
    {
        title: "Traditional Dance",
        description: "Witness captivating tribal dance forms like Chhau, Jhumair, and Paika that tell stories of their heritage.",
        icon: "fas fa-theater-masks"
    },
    {
        title: "Cuisine",
        description: "Savor authentic tribal cuisine with dishes like Rugra, Bamboo Shoot Curry, and Handia (rice beer).",
        icon: "fas fa-utensils"
    }
];

// Quiz questions
const quizQuestions = [
    {
        question: "What is the capital city of Jharkhand?",
        options: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
        correct: 0
    },
    {
        question: "Which festival is known as the 'flower festival' of Jharkhand?",
        options: ["Sohrai", "Karma", "Sarhul", "Tusu"],
        correct: 2
    },
    {
        question: "Which national park in Jharkhand is famous for tiger conservation?",
        options: ["Hazaribagh National Park", "Betla National Park", "Palamau Tiger Reserve", "Dalma Wildlife Sanctuary"],
        correct: 1
    },
    {
        question: "What is the traditional rice beer of Jharkhand called?",
        options: ["Chhang", "Handia", "Feni", "Toddy"],
        correct: 1
    },
    {
        question: "Which waterfall in Jharkhand is also known as Gautamdhara?",
        options: ["Hundru Falls", "Dassam Falls", "Jonha Falls", "Lodh Falls"],
        correct: 2
    }
];

// Incident history data
const incidents = [
    { location: "Betla National Park", type: "Wild Animal Sighting", date: "2023-05-15", status: "Resolved" },
    { location: "Hundru Falls", type: "Slippery Pathway", date: "2023-06-22", status: "Warning Sign Posted" },
    { location: "Netarhat", type: "Weather Alert", date: "2023-07-10", status: "Monitoring" },
    { location: "Patratu Valley", type: "Road Maintenance", date: "2023-08-05", status: "Completed" }
];
const destinations = [
    {
        id: 1,
        name: "Ranchi - City of Waterfalls",
        description: "Known as the 'City of Waterfalls,' Ranchi is famous for its beautiful waterfalls such as Jonha Falls and Dassam Falls. The city also offers scenic views and cultural experiences.",
        image: "https://qph.fs.quoracdn.net/main-qimg-8aec0ffbd59d2eab4b42f5dac0e4b8d7-c",
        lat: 23.3441,
        lng: 85.3096,
        badge: "City",
        features: ["Waterfalls", "Cultural Hub", "Scenic Views"]
    },
    {
        id: 2,
        name: "Deoghar - Baidyanath Temple",
        description: "This city is renowned for the Baidyanath Temple, one of the twelve Jyotirlingas in India, attracting numerous pilgrims and tourists alike.",
        image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/09/Deoghar-Baidyanath-Temple.jpg",
        lat: 24.4869,
        lng: 86.7035,
        badge: "Pilgrimage",
        features: ["Religious", "Spiritual", "Cultural"]
    },
    {
        id: 3,
        name: "Jamshedpur - Steel City",
        description: "The largest city in Jharkhand, Jamshedpur is known for its well-planned infrastructure and scenic landscapes, including the Dalma Hills.",
        image: "https://greencleanguide.com/wp-content/uploads/2021/09/Tata-Steel-Jamshedpur.jpg",
        lat: 22.8046,
        lng: 86.2029,
        badge: "Industrial",
        features: ["Planned City", "Industrial Hub", "Scenic"]
    },
    {
        id: 4,
        name: "Betla National Park",
        description: "Located in the Palamu district, this national park is rich in flora and fauna, offering opportunities for wildlife enthusiasts.",
        image: "https://i.ytimg.com/vi/7LsHgff7CPI/maxresdefault.jpg",
        lat: 23.8759,
        lng: 84.2005,
        badge: "Wildlife",
        features: ["Tiger Reserve", "Forest Safari", "Bird Watching"]
    },
    {
        id: 5,
        name: "Netarhat - Queen of Chotanagpur",
        description: "Often referred to as the 'Queen of Chotanagpur,' Netarhat is a serene hill station known for its breathtaking sunrises and sunsets.",
        image: "https://i.ytimg.com/vi/hJA-gOkvEfo/hqdefault.jpg",
        lat: 23.4833,
        lng: 84.2667,
        badge: "Hill Station",
        features: ["Sunrise Point", "Nature Walks", "Relaxation"]
    },
    {
        id: 6,
        name: "Parasnath Hill - Jain Pilgrimage",
        description: "This is a significant pilgrimage site for Jains, as it is believed to be the place where many Tirthankaras attained enlightenment.",
        image: "https://i.ytimg.com/vi/QMVq_orTxd4/maxresdefault.jpg",
        lat: 23.9667,
        lng: 86.1333,
        badge: "Pilgrimage",
        features: ["Religious", "Trekking", "Spiritual"]
    },
    {
        id: 7,
        name: "Ghatshila - Riverside Town",
        description: "A quaint town located on the banks of the Subarnarekha River, Ghatshila is known for its natural beauty and tranquility.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
        lat: 22.5833,
        lng: 86.4833,
        badge: "Nature",
        features: ["Riverside", "Tranquil", "Scenic"]
    },
    {
        id: 8,
        name: "Massanjore Dam - Picnic Spot",
        description: "Situated near Dumka, this dam is a popular picnic spot and offers picturesque views of the surrounding landscape.",
        image: "https://1.bp.blogspot.com/-TW7R0xZhuXE/UrPpPw97tTI/AAAAAAAABGo/4uEENIkNW-8/s1600/Masanjore+Dam.jpg",
        lat: 24.2333,
        lng: 87.2500,
        badge: "Dam",
        features: ["Picnic", "Scenic", "Relaxation"]
    },
    {
        id: 9,
        name: "Hazaribagh Wildlife Sanctuary",
        description: "This sanctuary is home to a variety of wildlife and is a great place for nature walks and wildlife spotting.",
        image: "https://i.ytimg.com/vi/F8kDXMlPvHQ/maxresdefault.jpg",
        lat: 23.9833,
        lng: 85.3500,
        badge: "Wildlife",
        features: ["Nature Walks", "Wildlife", "Birding"]
    },
    {
        id: 10,
        name: "Tagore Hill - Ranchi",
        description: "Named after the famous poet Rabindranath Tagore, this hill offers panoramic views of Ranchi and is a great spot for picnics.",
        image: "https://indiano.travel/wp-content/uploads/2022/04/Website-Feature-Image-Size-2.jpg",
        lat: 23.3800,
        lng: 85.3300,
        badge: "Heritage",
        features: ["Historical", "Viewpoint", "Picnic"]
    },
    {
        id: 11,
        name: "Hundru Falls",
        description: "One of the most famous waterfalls in Jharkhand, offering breathtaking views especially during monsoon season.",
        image: "https://www.gosahin.com/go/p/e/t1/1532787847_Hundru-Falls4.jpg",
        lat: 23.4679,
        lng: 85.5981,
        badge: "Waterfall",
        features: ["Picnic Spot", "Adventure", "Photography"]
    },
    {
        id: 12,
        name: "Jonha Falls (Gautamdhara)",
        description: "Also known as Gautamdhara, this scenic waterfall is surrounded by lush green forests, creating a serene atmosphere.",
        image: "https://tse3.mm.bing.net/th/id/OIP.8o_mLHgp51CM258vZPoqHQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        lat: 23.6333,
        lng: 85.5667,
        badge: "Nature",
        features: ["Religious Site", "Trekking", "Natural Pool"]
    },
    {
        id: 13,
        name: "Dassam Falls",
        description: "A magnificent waterfall on the Subarnarekha River, known for its natural beauty and the thunderous sound of falling water.",
        image: "https://media.gettyimages.com/id/1347863618/photo/the-dassam-falls-is-a-waterfall-located-near-ranchi-district-in-the-indian-state-of-jharkhand.jpg?b=1&s=170667a&w=0&k=20&c=h6RG58NItp6ExLJxcY2Q_lPcSZ8BFKUQTSQPkQP-h8E=",
        lat: 22.9833,
        lng: 85.8333,
        badge: "Waterfall",
        features: ["River Source", "Adventure", "Geological Interest"]
    }
];

module.exports = destinations;

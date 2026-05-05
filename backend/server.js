const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ['https://mounika1384.github.io', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jharkhand_tourism', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Schemas
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    country: String,
    address: String,
    travelDate: Date,
    duration: Number,
    travelers: Number,
    tourType: String,
    accommodation: String,
    travelStyle: [String],
    transport: String,
    message: String,
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const touristSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    emergencyContact: String,
    nationality: String,
    passportNumber: String,
    arrivalDate: Date,
    departureDate: Date,
    destinations: [String],
    digitalId: String,
    createdAt: { type: Date, default: Date.now }
});

const incidentSchema = new mongoose.Schema({
    location: String,
    type: String,
    description: String,
    severity: String,
    date: Date,
    status: String,
    coordinates: {
        lat: Number,
        lng: Number
    }
});

// Create Models
const Booking = mongoose.model('Booking', bookingSchema);
const Tourist = mongoose.model('Tourist', touristSchema);
const Incident = mongoose.model('Incident', incidentSchema);

const reviewSchema = new mongoose.Schema({
    destinationId: String,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Routes

// Booking Routes
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ 
            success: true, 
            message: 'Booking submitted successfully',
            bookingId: booking._id,
            reference: `JH${Date.now().toString().slice(-6)}`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Tourist Registration Routes
app.post('/api/tourists', async (req, res) => {
    try {
        const tourist = new Tourist(req.body);
        await tourist.save();
        res.status(201).json({ 
            success: true, 
            message: 'Tourist registered successfully',
            touristId: tourist._id,
            digitalId: `JHT${Date.now().toString().slice(-8)}`
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/tourists/:id', async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id);
        if (!tourist) {
            return res.status(404).json({ success: false, error: 'Tourist not found' });
        }
        res.json(tourist);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Incident Routes
app.get('/api/incidents', async (req, res) => {
    try {
        const incidents = await Incident.find().sort({ date: -1 });
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Review Routes
app.post('/api/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/reviews/:destinationId', async (req, res) => {
    try {
        const reviews = await Review.find({ destinationId: req.params.destinationId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const destinations = require('./data/destinations');

// Chat Route using OpenRouter
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, error: 'Message is required' });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:3000", // Optional, for OpenRouter rankings
                "X-Title": "Jharkhand Tourism Assistant", // Optional
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-001", // Using a cost-effective and fast model
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a helpful and knowledgeable travel assistant for Jharkhand Tourism. Provide accurate information about destinations, culture, and travel tips in Jharkhand. Use a friendly and professional tone. If you don't know something specific about Jharkhand, try to be helpful but mention that users should check the official tourism portal for the most up-to-date details. Keep responses concise and engaging."
                    },
                    { "role": "user", "content": message }
                ]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            console.error('OpenRouter API Error:', data.error);
            return res.status(500).json({ success: false, error: 'AI Assistant is temporarily unavailable' });
        }

        const reply = data.choices[0].message.content;
        res.json({ success: true, reply });
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

// Search Route
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json({ success: true, data: [] });
        }
        
        const results = destinations.filter(dest => {
            const searchFields = [
                dest.name,
                dest.description,
                ...(dest.features || []),
                dest.badge
            ].join(' ').toLowerCase();
            
            return searchFields.includes(query.toLowerCase());
        });
        
        res.json({ success: true, data: results });
    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
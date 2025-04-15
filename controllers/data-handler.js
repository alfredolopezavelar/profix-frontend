const express = require('express');
const router = express.Router();
const { Category, User, Review, Appointment } = require('../models/Model');

// Create provider
router.post('/provider', async (req, res) => {
    try {
        const { account_id, name, email, profile_picture, category, location } = req.body;
        const user = new User({ account_id, name, email, profile_picture, role: 'provider', location });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create user account
router.post('/users', async (req, res) => {
    try {
        const { account_id, name, email, profile_picture, location } = req.body;
        const user = new User({ account_id, name, email, profile_picture, role: 'user', location });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get categories for homepage
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find({}, 'name image description');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get top-rated providers (with promotion)
router.get('/featured_providers', async (req, res) => {
    try {
        const reviews = await Review.aggregate([
            {
                $group: {
                    _id: "$provider_id",
                    average: { $avg: "$rating" }
                }
            },
            { $sort: { average: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "provider"
                }
            },
            { $unwind: "$provider" },
            {
                $project: {
                    provider_id: "$_id",
                    name: "$provider.name",
                    rating: "$average",
                    profile_picture: "$provider.profile_picture",
                    category: "$provider.category",
                    promoted: true
                }
            }
        ]);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add review
router.post('/review', async (req, res) => {
    try {
        const { provider_id, user_id, rating, title, comment } = req.body;
        const newReview = new Review({ provider_id, user_id, rating, title, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Schedule appointment
router.post('/appointment', async (req, res) => {
    try {
        const { provider_id, user_id, date } = req.body;
        const appointment = new Appointment({ provider_id, user_id, date });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get provider's appointments
router.get('/appointments/provider/:id', async (req, res) => {
    try {
        const appointments = await Appointment.find({ provider_id: req.params.id });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's appointments
router.get('/appointments/user/:id', async (req, res) => {
    try {
        const appointments = await Appointment.find({ user_id: req.params.id });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

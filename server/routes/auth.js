const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

// --- REGISTER A NEW USER ---
// Endpoint: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, sport, location, profilePictureUrl } = req.body;

        // Validation
        if (!email || !password || !name || !role || !sport || !location) {
            return res.status(400).json({ message: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            sport,
            location,
            profilePictureUrl,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully!", userId: savedUser._id });

    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

// --- LOGIN A USER ---
// Endpoint: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter email and password." });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials. User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials. Password incorrect." });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // Don't send the hashed password back to the client
        const { password: userPassword, ...userData } = user._doc;

        res.json({
            token,
            user: userData,
        });
        
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

module.exports = router;
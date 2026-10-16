
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware');;

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check that all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required'
            });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user in MongoDB
        const user = await User.create({
            name,
            email,
            passwordHash
        });

        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        // Handle duplicate email
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'An account with this email already exists'
            });
        }

        console.error(error);

        res.status(500).json({
            message: 'Something went wrong during registration'
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check whether both fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // Find the user by email
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        // Check whether the user exists
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Compare the entered password with the stored hash
        const isMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
     const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
    
);
res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});
        // Login successful
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
   
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Something went wrong during login'
        });
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });

    res.status(200).json({
        message: 'Logged out successfully'
    });
});

router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({
        loggedIn: true,
        user: req.user
    });
});


module.exports = router;

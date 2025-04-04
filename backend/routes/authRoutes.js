const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(cookieParser()); // Enable cookie parsing middleware

// Login Endpoint
router.post("/login", (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    // Set the username in a cookie (expires in 1 day)
    res.cookie("username", username, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    return res.status(200).json({ message: "Login successful", username });
});

// Logout Endpoint
router.post("/logout", (req, res) => {
    res.clearCookie("username"); // Remove cookie from browser
    return res.status(200).json({ message: "Logout successful" });
});

// Check Login Status
router.get("/check-auth", (req, res) => {
    if (req.cookies.username) {
        return res.status(200).json({ loggedIn: true, username: req.cookies.username });
    } else {
        return res.status(401).json({ loggedIn: false, message: "Not logged in" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Use a secure secret in env
const SECRET_KEY = process.env.JWT_SECRET || "your_fallback_secret_here";

router.use(cookieParser()); // Middleware to read cookies

// ✅ Login Endpoint
router.post("/login", (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    // 🛠 Since you're not using a real DB here, we simulate a user object
    const user = {
        id: "fake_user_id", // Simulate user ID
        username: username
    };

    // ✅ Create JWT
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: "1d"
    });

    // ✅ Set cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
    });

    // ✅ Send response
    return res.status(200).json({ message: "Login successful", token, username: user.username });
});



// ✅ Logout Endpoint
router.post("/logout", (req, res) => {
    res.clearCookie("token"); // Should clear the 'token' cookie, not 'username'
    return res.status(200).json({ message: "Logout successful" });
});
router.get("/check-auth", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ loggedIn: false, message: "Not logged in" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return res.status(200).json({ loggedIn: true, username: decoded.username });
    } catch (err) {
        return res.status(401).json({ loggedIn: false, message: "Invalid or expired token" });
    }
});


module.exports = router;

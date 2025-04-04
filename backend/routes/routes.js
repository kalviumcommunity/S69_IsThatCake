const express = require("express");
const router = express.Router();
const Item = require("../model/items");
const User = require("../model/user");
const bcrypt=require("bcrypt");
// ✅ Fix: Ensure "created_by" is required when adding an item
router.post("/items", async (req, res) => {
    const { name, created_by } = req.body;

    if (!created_by) {
        return res.status(400).json({ message: "created_by is required" });
    }

    try {
        const newItem = new Item({ name, created_by });
        await newItem.save();
        res.status(201).json({ message: "Item created successfully", item: newItem });
    } catch (error) {
        res.status(500).json({ message: "Error creating item", error });
    }
});

// ✅ Fetch all items
router.get("/items", async (req, res) => {
    try {
        const items = await Item.find().populate("created_by", "name"); // ✅ Show creator's name
        res.status(200).json({ message: "Items retrieved successfully", items });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving items", error });
    }
});

// ✅ Fetch a specific item by ID
router.get("/items/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate("created_by", "name");
        if (!item) {
            return res.status(404).json({ message: `Item with ID ${req.params.id} not found` });
        }
        res.status(200).json({ message: `Item retrieved successfully`, item });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving item", error });
    }
});

// ✅ Fetch items by user
router.get("/items/user/:userId", async (req, res) => {
    try {
        const items = await Item.find({ created_by: req.params.userId }).populate("created_by", "name");
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
});

// ✅ Update an item
router.put("/items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: `Item with ID ${req.params.id} not found` });
        }
        res.status(200).json({ message: `Item updated successfully`, item: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error });
    }
});

// ✅ Delete an item
router.delete("/items/:id", async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: `Item with ID ${req.params.id} not found` });
        }
        res.status(200).json({ message: `Item deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
});

// ✅ Fetch users for dropdown
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "_id name");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});



// ✅ Fix: Add Signup Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "Signup successful", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Signup failed", error });
    }
});


module.exports = router;

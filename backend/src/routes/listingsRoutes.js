const express = require ("express");
const Listing = require("../models/listing");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings); // Send listings as JSON
    } catch (error) {
        console.error("Error fetching listings:", error); // Log the error
        res.status(500).json({ error: "Failed to fetch listings" });
    }
});




module.exports= router;
const express = require("express");
const Listing = require("../models/listing");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);
    } catch (error) {
        console.error("Error fetching listings:", error); // Log the error
        res.status(500).json({ error: "Failed to fetch listings" });
    }
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        const listingdata = await Listing.findById(id);
        if (!listingdata

        ) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listingdata);
    } catch (e) {
        console.log(` somthing went wrong ..${e}`)
    }

});




module.exports = router;
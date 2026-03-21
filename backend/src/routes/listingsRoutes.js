const express = require("express");
const Listing = require("../models/listing");
const { default: mongoose } = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const router = express.Router();

router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.json(allListings);

}));


router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID");
    }

    const listingdata = await Listing.findById(id);

    if (!listingdata) {
        throw new ExpressError(404, "Listing not found");
    }
    res.json(listingdata);
}));



router.post("/", wrapAsync(async (req, res) => {

    console.log("Request Body:", req.body);
    if (!req.body || !req.body.listing) {
        throw new ExpressError(400, "Send valid listing data");
    }

    const newlisting = new Listing(req.body.listing);

    const savedListing = await newlisting.save();
    res.status(201).json(savedListing);



}));
router.put("/:id", wrapAsync(async (req, res) => {

    const { id } = req.params;
    if (!req.body || !req.body.listing) {
        throw new ExpressError(400, "Send valid listing data");
    }


    const uplistings = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (!uplistings) {
        throw new ExpressError(404, "Listing not found");
    }
    res.status(200).json(uplistings);

}));


router.delete("/:id", wrapAsync(async (req, res) => {

    const { id } = req.params;
    let dlisting = await Listing.findByIdAndDelete(id);

    if (!dlisting) {
        throw new ExpressError(404, "Listing not found");
    }
    res.status(200).json({ message: "Listing deleted successfully", dlisting });

}));



module.exports = router;
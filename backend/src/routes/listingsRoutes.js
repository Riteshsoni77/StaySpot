const express = require("express");
const Listing = require("../models/listing");
const { default: mongoose } = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const router = express.Router();
const {listingSchema }= require("../../schema");
const isLoggedIn = require("../middleware/auth");



const validateListing  = (req, res, next) => {
    console.log("Validating request body:", req.body);
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg=error.details.map((el)=>el.message).join(",");
                console.error("Validation Error:", errmsg);
        throw new ExpressError(400, errmsg);
    } else {
          console.log("Validation passed");
        next();
    }

}




router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.json(allListings);

}));


router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid ID");
    }

    const listingdata = await Listing.findById(id) .populate("owner", "username name")   
        .populate({
            path: "reviews",
            populate: {
                path: "user",
                select: "username name"  
            }
        }); 
    if (!listingdata) {
        throw new ExpressError(404, "Listing not found");
    }
    res.json(listingdata);
}));



router.post("/add", 
     isLoggedIn,
   validateListing ,
    wrapAsync(async (req, res) => {

    console.log("Request Body:", req.body);
   
   
    const newlisting = new Listing(req.body.listing);
     newlisting.owner = req.user._id;

    const savedListing = await newlisting.save();
    res.status(201).json(savedListing);


}));
router.put("/:id", 
    validateListing ,
     wrapAsync(async (req, res) => {

    const { id } = req.params;
    


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
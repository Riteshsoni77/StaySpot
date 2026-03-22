const express = require("express");
const Listing = require("../models/listing");
const { default: mongoose } = require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const router = express.Router();
const {listingSchema, reviewSchema}= require("../../schema");
const Review = require("../models/review");


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
const validateRiview  = (req, res, next) => {
    console.log("Validating request body:", req.body);
    const { error } = reviewSchema.validate(req.body);
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

    const listingdata = await Listing.findById(id).populate("reviews");

    if (!listingdata) {
        throw new ExpressError(404, "Listing not found");
    }
    res.json(listingdata);
}));



router.post("/add", 
   validateListing ,
    wrapAsync(async (req, res) => {

    console.log("Request Body:", req.body);
   

    const newlisting = new Listing(req.body.listing);

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

router.post("/:id/reviews",
    validateRiview,
    wrapAsync(
    async(req, res)=>{
        let listing =await Listing.findById(req.params.id);

        let newReview= new Review(req.body.review);
        await newReview.save();

        listing.reviews.push(newReview._id);
        await listing.save();
        console.log("new review saved");

        res.json({
            message:" review added successfully",
            review:newReview
        });

}));


router.delete("/:id/reviews/:reviewId",
    wrapAsync(async (req, res)=>{
        let {id ,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: "Review  deleted successfully"});

    })
);





module.exports = router;
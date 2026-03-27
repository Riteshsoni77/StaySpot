const express = require("express");
const { default: mongoose } = require("mongoose");
const { reviewSchema } = require("../../schema");
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");

const router = express.Router({ mergeParams: true });



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



router.post("/",
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


router.delete("/:reviewId",
    wrapAsync(async (req, res)=>{
        let {id ,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: "Review  deleted successfully"});

    })
);


module.exports = router;
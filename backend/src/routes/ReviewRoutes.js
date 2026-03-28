const express = require("express");
const { default: mongoose } = require("mongoose");
const { reviewSchema } = require("../../schema");
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const isLoggedIn = require("../middleware/auth");

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
    isLoggedIn,
    validateRiview,
    wrapAsync(async (req, res) => {

        let listing = await Listing.findById(req.params.id);

        
        let newReview = new Review(req.body.review);

        newReview.user = req.user._id;

        await newReview.save();

        listing.reviews.push(newReview._id);
        await listing.save();

        res.json({
            message: "review added successfully",
            review: newReview
        });
}));




router.delete("/:reviewId",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const { id, reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (!review.user.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not allowed to delete this review" });
        }
        await Listing.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId }
        });
        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({ message: "Review deleted successfully" });
    })
);


module.exports = router;
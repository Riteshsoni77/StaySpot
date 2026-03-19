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



router.post("/", async (req, res)=>{
    try{
          console.log("Request Body:", req.body);
  const newlisting= new Listing(req.body.listing);
 
  const savedListing= await newlisting.save();
    res.status(201).json(savedListing);
    }catch(e){
        console.log(` somthing went wrong${e}`);
         res.status(500).json({ error: "Failed to create listing" });
    }
 
 
})

router.delete("/:id", async(req, res)=>{
    try{

    
    const{id}=req.params;
   let dlisting= await Listing.findByIdAndDelete(id);
   console.log(dlisting);
    res.status(200).json({ message: "Listing deleted successfully", dlisting });

    }catch(e){
       console.log(`sonmthing went wrong${e}`);
       res.status(500).json({err:"faild to delete listing"});
    }
  
});






module.exports = router;
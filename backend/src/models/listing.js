const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
     title: {
        type:String,
        required:true,

     },
     description:String,
     image:{
        type:String,
        default: "/Users/riteshsoni/Desktop/StaySpot/assets/photo-1712089295178-8ea08acd2ba4.avif",
        set:(v)=> v===""? "/Users/riteshsoni/Desktop/StaySpot/assets/photo-1712089295178-8ea08acd2ba4.avif"
        :v,

     },
     price:Number,
     location:String,
     country:String,

})

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;


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
        default: "https://images.unsplash.com/photo-1712089295178-8ea08acd2ba4",
        set:(v)=> v===""? "https://images.unsplash.com/photo-1712089295178-8ea08acd2ba4"
        :v,
 
     },
     price:Number,
     location:String,
     country:String,

     reviews:[
      {
         type:Schema.Types.ObjectId,
         ref:"Review",
      }
     ]

})

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;


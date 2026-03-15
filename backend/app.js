const express = require("express");
const app=express();
const mongoose = require("mongoose"); 



app.get("/",(req,res)=>{
    res.send(" this is working ");

})

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect('mongodb+srv://Ritiksoni:Ritiksoni@cluster0.b5c7axh.mongodb.net/?appName=Cluster0');
    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)


}
 start().catch((err) => console.log(err));
app.listen(8000,()=>{
    console.log("app is listing on port 8000");
})


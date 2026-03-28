
const Listing =require ("../models/listing.js");
const initData = require ("./data.js")

const mongoose = require("mongoose");
const start = async () => {
    const connectionDb = await mongoose.connect('mongodb+srv://Ritiksoni:Ritiksoni@cluster0.b5c7axh.mongodb.net/?appName=Cluster0');
    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)


}
start().catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  console.log(initData.data);
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();

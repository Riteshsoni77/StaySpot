const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listingsRouts = require("./src/routes/listingsRoutes.js");
const ReviewRoutes= require("./src/routes/ReviewRoutes.js");
const userRoutes= require("./src/routes/userRoutes.js");

const cors = require("cors");
const ExpressError = require("./src/utils/ExpressError.js");
app.use(express.json());
app.use(cors());


app.use("/listings", listingsRouts);
app.use("/listings/:id/reviews",ReviewRoutes );
app.use("/user",userRoutes);


app.get("/", (req, res) => {
    res.send(" this is working ");

})


app.all('/{*any}', (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Somthing went Wrong" } = err;

    res.json( { err });
});

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect('mongodb+srv://Ritiksoni:Ritiksoni@cluster0.b5c7axh.mongodb.net/?appName=Cluster0');
    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)

}
start().catch((err) => console.log(err));




app.listen(8000, () => {
    console.log("app is listing on port 8000");
})




const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchemea = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        token: { type: String }
    }
)

const User = mongoose.model("User", userSchemea);

module.exports= { User };
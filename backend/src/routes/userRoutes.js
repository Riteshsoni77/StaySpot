const  express =require ("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const crypto = require("crypto");
const bcrypt= require("bcrypt");
const wrapAsync = require("../utils/wrapAsync");
const { userSchema } = require("../../schema");
const { User } = require("../models/user");
const ExpressError = require("../utils/ExpressError");



const validateUser  = (req, res, next) => {
    console.log("Validating request body:", req.body);
    const { error } = userSchema.validate(req.body);
    if (error) {
        let errmsg=error.details.map((el)=>el.message).join(",");
                console.error("Validation Error:", errmsg);
        throw new ExpressError(400, errmsg);
    } else {
          console.log("Validation passed");
        next();
    }

}


router.post("/login", 
    validateUser,
    wrapAsync( async (req, res) => {

    const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        let isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(200).json({ token: token })
        } else {
            return res.status(401).json({ message: "Invalid Username or password" })
        }
    
}));

router.post("/register",
    validateUser,
     wrapAsync(async(req, res)=>{
 const {name , username, password}= req.body;
 console.log(req.body);

   const existingUser=await User.findOne({username});
    console.log("User already exists:", username);
   if (existingUser){
     return res.status(409).json({message:"user already exists"})
   }  

   const hashedPassword = await bcrypt.hash(password,10);
    
   const newUser=new User({
    name:name,
    username: username,
    password: hashedPassword
   });

   await newUser.save();
   console.log("New user registered:", newUser);
   res.status(201).json({message:"user Registered"});


}));

module.exports = router;


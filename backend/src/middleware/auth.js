
const { User } = require("../models/user");

const isLoggedIn = async (req, res, next) => {
   try {
      const token = req.headers.authorization;

      if (!token) {
         return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findOne({ token });

      if (!user) {
         return res.status(401).json({ message: "Invalid token" });
      }

      req.user = user;   

      next();
   } catch (err) {
      return res.status(500).json({ message: "Server Error" });
   }
};

module.exports = isLoggedIn;
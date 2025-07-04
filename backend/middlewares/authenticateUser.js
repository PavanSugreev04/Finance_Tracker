import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticateUser = asyncHandler(async (req, res, next) => {
  // ✅ Log cookies early
  console.log("🔐 Incoming cookies:", req.cookies);

  const token = req.cookies.session; // expects a cookie named "session"

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findById(decoded.userId).select("-password");
      if (!user.verified) {
        return res.status(401).json({
          error: "Email is not verified. Please verify your email!",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        error:
          "Authentication failed. Please check your credentials and try again!",
      });
    }
  } else {
    res.status(401).json({
      error: "You must be authenticated to access this resource!",
    });
  }
});

export default authenticateUser;

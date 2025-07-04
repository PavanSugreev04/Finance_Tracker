import jwt from "jsonwebtoken";

const generateCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("session", token, {
    httpOnly: true,
    secure: true, // ✅ needed for HTTPS
    sameSite: "None", // ✅ needed for cross-site cookie from Vercel → Render
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateCookie;

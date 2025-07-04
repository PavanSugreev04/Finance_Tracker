import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

import authenticateUser from "./middlewares/authenticateUser.js";

// Load environment variables
dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Simplified CORS setup
const allowedOrigins = [
  "http://localhost:8080",
  "https://finance-tracker-navy-iota.vercel.app",
];
app.use((req, res, next) => {
  console.log("Cookies: ", req.cookies); // 🐞 Log cookie presence
  next();
});
app.use(cors({
  origin: [
    "http://localhost:8080", // Local frontend
    "https://finance-tracker-navy-iota.vercel.app", // Vercel frontend
  ],
  credentials: true, // ✅ allow cookies
}));


// ✅ Required middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/incomes", authenticateUser, incomeRoutes);
app.use("/api/v1/expenses", authenticateUser, expenseRoutes);


// ✅ Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}!`);
    });
  } catch (error) {
    console.log(`Error in starting the server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

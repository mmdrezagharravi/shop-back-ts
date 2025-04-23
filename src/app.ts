import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
// import orderRoutes from "./routes/orderRoutes";
import adminRoutes from "./routes/userRoute";
// import cartRoutes from './routes/cartRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Middleware ب
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
// app.use('/api/cart', cartRoutes);
export default app;

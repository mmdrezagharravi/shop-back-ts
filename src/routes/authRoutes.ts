import express from "express";
import {
  login,
  updatePassword,
  signup,
  updateProflile,
} from "../controllers/authController";
import { authenticate } from "../middlewares/auth";
import { getAllProducts } from "../controllers/productController";

const router = express.Router();


// sigin up
router.post("/signup", signup);

// login
router.post("/login", login);

// update pass
router.put("/updatePassword", authenticate, updatePassword);

// update profile
router.put("/updateProfile", authenticate, updateProflile);

export default router;

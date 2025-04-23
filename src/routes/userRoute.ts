// just for admin
import express from "express";
import {
  getAllUsers,
  deleteUser,
  createAccountAdmin,
} from "../controllers/userController";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

// rouetes for admin
router.get("/getalluser", isAdmin, getAllUsers);
router.delete("/deletUser/:id", isAdmin, deleteUser);
router.post("/creatUser", isAdmin, createAccountAdmin);

export default router;

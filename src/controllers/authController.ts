import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { error } from "console";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, role, password: hashed });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password, emali } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string
    );
    res.json({ token });
  } catch {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Update Password

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // find the user by id
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ error: "User not found !!!" });
      return;
    }
    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "old password is incorrect " });
      return;
    }

    // hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "password updated :)" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to update password !!!" });
  }
};

// update profile
export const updateProflile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, username, email } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    // Update the user's profile fields
    if (username) user.username = username;
    if (email) {
      // Check if the new email is already in use
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        res.status(400).json({ error: "Email already in use" });
        return;
      }
      user.email = email;
    }
    // Save the updated user
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

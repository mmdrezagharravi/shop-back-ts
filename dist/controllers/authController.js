"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProflile = exports.updatePassword = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const console_1 = require("console");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        const hashed = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ username, email, role, password: hashed });
        yield user.save();
        res.status(201).json({ message: "User created", user });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Signup failed" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, emali } = req.body;
        const user = yield User_1.default.findOne({ username });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    }
    catch (_a) {
        console.log(console_1.error);
        res.status(500).json({ error: "Login failed" });
    }
});
exports.login = login;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(401).json({ error: "User not found !!!" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "old password is incorrect " });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        yield user.save();
        res.json({ message: "password updated :)" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "failed to update password !!!" });
    }
});
exports.updatePassword = updatePassword;
const updateProflile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, username, email } = req.body;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (username)
            user.username = username;
        if (email) {
            const existingEmail = yield User_1.default.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== userId) {
                res.status(400).json({ error: "Email already in use" });
                return;
            }
            user.email = email;
        }
        yield user.save();
        res.json({ message: "Profile updated successfully", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});
exports.updateProflile = updateProflile;

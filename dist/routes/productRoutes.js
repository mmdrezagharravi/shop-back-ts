"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const isAdmin_1 = require("../middlewares/isAdmin");
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
router.get("/", productController_1.getAllProducts);
router.get("/:id", productController_1.getProductById);
router.post("/create", isAdmin_1.isAdmin, productController_1.createProduct);
router.put("/:id", auth_1.authenticate, productController_1.updateProduct);
router.delete("/:id", auth_1.authenticate, productController_1.deleteProduct);
exports.default = router;

import { Request, Response } from "express";
import Product from "../models/Product";

// Create
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Product creation failed" });
  }
};

// Read all
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Read one
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Update
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Product update failed" });
  }
};

// Delete
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Product deletion failed" });
  }
};
